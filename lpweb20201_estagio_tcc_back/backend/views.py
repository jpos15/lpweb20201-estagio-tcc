from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .serializers import *
from .models import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    ordering_fields = ['id', 'username', 'email']
    search_fields = ['username', 'email']
    permission_classes = [permissions.IsAdminUser]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]


class UsuarioLogadoDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioDetalhadoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.get(pk=self.request.user.pk)

    def list(self, request, *args, **kwargs):
        usuario = self.get_queryset()
        return Response(self.get_serializer(usuario).data)


class PerfilLogadoViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite obter e cadastrar um perfil para o usuário logado
    """
    serializer_class = PerfilSerializer

    def get_queryset(self):
        return Perfil.objects.filter(usuario=self.request.user)

    def list(self, request, *args, **kwargs):
        perfil = self.get_queryset()
        if perfil.exists():
            serializer = self.get_serializer(perfil.first())
            return Response(serializer.data)
        else:
            return Response(None, status=404)


class PerfilViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite recuperar e editar informações sobre perfis de usuários
    """
    serializer_class = PerfilSerializer
    queryset = Perfil.objects.all()
    filterset_fields = ['usuario', 'estado_uf', 'cidade']
    search_fields = ['usuario__username', 'usuario__email', 'nome', 'cpf', 'telefone', 'endereco', 'estado_uf',
                     'cidade', 'cep']
    permission_classes = [permissions.IsAdminUser]


class CursoViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre cursos
    """
    serializer_class = CursoSerializer
    queryset = Curso.objects.all().order_by('nome')


class AlunoViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre alunos
    """
    serializer_class = AlunoSerializer
    queryset = Aluno.objects.all().order_by('nome')


class MatriculaViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre matrículas de alunos em cursos
    """
    serializer_class = MatriculaSerializer
    filterset_fields = ['curso', 'aluno', 'ano', 'semestre']

    def get_queryset(self):
        # se o usuário é admin ou está em um dos grupos coordenação de curso e secretaria
        # então retorna todas as matrículas
        if self.request.user.is_superuser or self.request.user.groups.filter(name__in=['Coordenação de Curso',
                                                                                       'Secretaria']).exists():
            return Matricula.objects.all()
        # se o usuário é aluno, retorna apenas a sua própria matrícula
        return Matricula.objects.filter(aluno__usuario__usuario=self.request.user)


class FuncionarioViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre funcionários
    """
    serializer_class = FuncionarioSerializer
    queryset = Funcionario.objects.all().order_by('nome')


class ProfessorViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre professores (funcionários em cursos)
    """
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all().order_by('funcionario__nome')
    search_fields = ['funcionario__nome', 'funcionario__cgu', 'curso__nome']
    filterset_fields = ['curso', 'funcionario']


class OrientacaoViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre orientações de trabalhos de Estágio e TCC
    """
    serializer_class = OrientacaoSerializer
    filterset_fields = ['curso', 'aluno', 'professor']

    def get_queryset(self):
        # se o usuário é admin ou está no grupo coordenação de curso ou coordenação de estágio e tcc
        # então retorna todas as orientações
        if self.request.user.is_superuser or self.request.user.groups.filter(
                name__in=['Coordenação de Curso', 'Coordenação de Estágio e TCC']).exists():
            return Orientacao.objects.all()
        # se o usuário é funcionário, então retorna todas as suas orientações
        funcionario = FuncionarioUsuario.objects.filter(
            usuario=self.request.user)
        if funcionario.exists():
            return Orientacao.objects.filter(professor__funcionario=funcionario.first())
        # se o usuário é aluno, então retorna apenas as orientações dele
        return Orientacao.objects.filter(aluno__usuario__usuario=self.request.user)


class PropostaDeEstagioViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre propostas de Estágio
    """
    serializer_class = PropostaDeEstagioSerializer
    filterset_fields = ['orientacao']

    def get_queryset(self):
        # se o usuário é admin,
        #   ou está no grupo coordenação de curso ou Coordenação de Estágio e TCC
        # então retorna todas as propostas
        if self.request.user.is_superuser or self.request.user.groups.filter(
                name__in=['Coordenação de Curso', 'Coordenação de Estágio e TCC']).exists():
            return PropostaDeEstagio.objects.all()
        # se o usuário é professor, então retorna as propostas em que ele é membro da banca
        if self.request.user.groups.filter(name__in=['Professor']):
            # obtem o funcionario referente ao usuario
            funcionario = Funcionario.objects.filter(
                usuario__usuario=self.request.user)
            if funcionario.exists():
                if not PropostaDeEstagio.objects.filter(membros_da_banca__membro_interno__in=[funcionario.first()]):
                    return PropostaDeEstagio.objects.filter(orientacao__professor__funcionario__in=[funcionario.first()])
                return PropostaDeEstagio.objects.filter(membros_da_banca__membro_interno__in=[funcionario.first()])
            # obtem o colaborador externo referente ao usuario
            colaborador = ColaboradorExterno.objects.filter(
                usuario__usuario=self.request.user)
            if colaborador.exists():
                return PropostaDeEstagio.objects.filter(membros_da_banca__membro_externo__in=[colaborador.first()])
        # se o usuário é aluno, então retorna apenas as orientações dele
        return PropostaDeEstagio.objects.filter(orientacao__aluno__usuario__usuario=self.request.user)


class PropostaDeTCCViewSet(viewsets.ModelViewSet):
    """
    Endpoint que permite gerenciar informações sobre propostas de TCC
    """
    serializer_class = PropostaDeTCCSerializer
    filterset_fields = ['orientacao']

    def get_queryset(self):
        # se o usuário é admin,
        #   ou está no grupo coordenação de curso ou Coordenação de Estágio e TCC
        # então retorna todas as propostas
        if self.request.user.is_superuser or self.request.user.groups.filter(
                name__in=['Coordenação de Curso', 'Coordenação de Estágio e TCC']).exists():
            return PropostaDeTCC.objects.all()
        # se o usuário é professor, então retorna as propostas em que ele é orientador ou membro da banca
        if self.request.user.groups.filter(name__in=['Professor']):
            # obtem o funcionario referente ao usuario
            funcionario = Funcionario.objects.filter(
                usuario__usuario=self.request.user)
            if funcionario.exists():
                if not PropostaDeTCC.objects.filter(membros_da_banca__membro_interno__in=[funcionario.first()]):
                    return PropostaDeTCC.objects.filter(orientacao__professor__funcionario__in=[funcionario.first()])
                return PropostaDeTCC.objects.filter(membros_da_banca__membro_interno__in=[funcionario.first()])
            # obtem o colaborador externo referente ao usuario
            colaborador = ColaboradorExterno.objects.filter(
                usuario__usuario=self.request.user)
            if colaborador.exists():
                return PropostaDeEstagio.objects.filter(membros_da_banca__membro_externo__in=[colaborador.first()])
        # se o usuário é aluno, então retorna apenas as orientações dele
        return PropostaDeTCC.objects.filter(orientacao__aluno__usuario__usuario=self.request.user)


class AvaliacaoDePropostaViewSet(viewsets.ModelViewSet):
    serializer_class = AvaliacaoDePropostaSerializer
    queryset = AvaliacaoDeProposta.objects.all().order_by('id')
    filterset_fields = ['proposta', 'usuario', 'aprovada']


class ColaboradorExternoViewSet(viewsets.ModelViewSet):
    serializer_class = ColaboradorExternoSerializer
    queryset = ColaboradorExterno.objects.all().order_by('nome')
