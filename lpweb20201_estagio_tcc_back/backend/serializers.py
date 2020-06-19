from django.contrib.auth.models import User, Group, Permission
from django.db import transaction
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class UsuarioDetalhadoSerializer(serializers.ModelSerializer):
    class GroupSerializer(serializers.ModelSerializer):
        permissions = PermissionSerializer(many=True)

        class Meta:
            model = Group
            fields = ['id', 'name', 'permissions']

    groups = GroupSerializer(many=True)
    user_permissions = PermissionSerializer(many=True)

    class Meta:
        model = User
        fields = ['email', 'groups', 'id', 'is_superuser', 'last_login', 'date_joined', 'user_permissions', 'username']


class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'usuario', 'nome', 'sexo', 'cpf', 'telefone', 'endereco',
                  'estado_uf', 'cidade', 'cep']
        read_only_fields = ['cadastrado_em', 'atualizado_em']


class CursoSerializer(serializers.ModelSerializer):
    class ProfessorSerializer(serializers.ModelSerializer):
        class FuncionarioSerializer(serializers.ModelSerializer):
            class Meta:
                model = Funcionario
                fields = ['id', 'nome', 'cgu']

        funcionario = FuncionarioSerializer(read_only=True)

        class Meta:
            model = Professor
            fields = ['id', 'funcionario', 'funcao']

    professores = ProfessorSerializer(many=True, read_only=True)

    class Meta:
        model = Curso
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'nome', 'slug', 'professores']
        read_only_fields = ['slug', 'cadastrado_em', 'atualizado_em', 'id']


class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'nome', 'cgu']
        read_only_fields = ['cadastrado_em', 'atualizado_em', 'id']


class MatriculaSerializer(serializers.ModelSerializer):
    class CursoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Curso
            fields = ['id', 'nome', 'slug']
            read_only_fields = ['slug']

    class AlunoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Aluno
            fields = ['id', 'nome', 'cgu']

    aluno_id = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), required=True, write_only=True)
    curso_id = serializers.PrimaryKeyRelatedField(queryset=Curso.objects.all(), required=True, write_only=True)
    aluno = AlunoSerializer(read_only=True)
    curso = CursoSerializer(read_only=True)

    class Meta:
        model = Matricula
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'curso', 'aluno', 'curso_id', 'aluno_id', 'ano', 'semestre']

    def create(self, validated_data):
        validated_data['aluno'] = validated_data.pop('aluno_id')
        validated_data['curso'] = validated_data.pop('curso_id')
        return super().create(validated_data)


class FuncionarioSerializer(serializers.ModelSerializer):
    class ProfessorSerializer(serializers.ModelSerializer):
        class CursoSerializer(serializers.ModelSerializer):
            class Meta:
                model = Curso
                fields = ['id', 'nome', 'slug']
                read_only_fields = ['slug']

        curso = CursoSerializer(read_only=True)

        class Meta:
            model = Professor
            fields = ['id', 'curso', 'funcao']

    cursos = ProfessorSerializer(many=True, read_only=True)

    class Meta:
        model = Funcionario
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'nome', 'cgu', 'cursos']


class ProfessorSerializer(serializers.ModelSerializer):
    class CursoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Curso
            fields = ['id', 'nome', 'slug']
            read_only_fields = ['slug']

    class FuncionarioSerializer(serializers.ModelSerializer):
        class Meta:
            model = Funcionario
            fields = ['id', 'nome', 'cgu']

    funcionario_id = serializers.PrimaryKeyRelatedField(queryset=Funcionario.objects.all(), required=True,
                                                        write_only=True)
    curso_id = serializers.PrimaryKeyRelatedField(queryset=Curso.objects.all(), required=True, write_only=True)
    curso = CursoSerializer(read_only=True)
    funcionario = FuncionarioSerializer(read_only=True)

    class Meta:
        model = Professor
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'curso_id', 'funcionario_id', 'curso', 'funcionario',
                  'funcao']

    def create(self, validated_data):
        validated_data['curso'] = validated_data.pop('curso_id')
        validated_data['funcionario'] = validated_data.pop('funcionario_id')
        return super().create(validated_data)


class OrientacaoSerializer(serializers.ModelSerializer):
    class ProfessorSerializer(serializers.ModelSerializer):
        class FuncionarioSerializer(serializers.ModelSerializer):
            class Meta:
                model = Funcionario
                fields = ['id', 'nome', 'cgu']

        funcionario = FuncionarioSerializer(read_only=True)

        class Meta:
            model = Professor
            fields = ['id', 'funcionario', 'funcao']

    class CursoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Curso
            fields = ['id', 'nome', 'slug']
            read_only_fields = ['slug']

    class AlunoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Aluno
            fields = ['id', 'nome', 'cgu']

    curso = CursoSerializer(read_only=True)
    aluno = AlunoSerializer(read_only=True)
    professor = ProfessorSerializer(read_only=True)

    curso_id = serializers.PrimaryKeyRelatedField(queryset=Curso.objects.all(), required=True, write_only=True)
    aluno_id = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), required=True, write_only=True)
    professor_id = serializers.PrimaryKeyRelatedField(queryset=Professor.objects.all(), required=True, write_only=True)

    class Meta:
        model = Orientacao
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'curso', 'curso_id', 'aluno', 'aluno_id', 'professor',
                  'professor_id', 'tipo', 'ano', 'semestre']

    def create(self, validated_data):
        validated_data['curso'] = validated_data.pop('curso_id')
        validated_data['professor'] = validated_data.pop('professor_id')
        validated_data['aluno'] = validated_data.pop('aluno_id')
        return super().create(validated_data)


class PropostaDeEstagioSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ['id', 'username']

    class MembroDeBancaSerializer(serializers.ModelSerializer):
        class FuncionarioSerializer(serializers.ModelSerializer):
            class Meta:
                model = Funcionario
                fields = ['id', 'nome', 'cgu']

        class ColaboradorExternoSerializer(serializers.ModelSerializer):
            class Meta:
                model = ColaboradorExterno
                fields = ['id', 'nome', 'cpf', 'email', 'instituicao']

        membro_interno = FuncionarioSerializer(read_only=True)
        membro_interno_id = serializers.PrimaryKeyRelatedField(queryset=Funcionario.objects.all(), write_only=True,
                                                               required=False)
        membro_externo = ColaboradorExternoSerializer(read_only=True)
        membro_externo_id = serializers.PrimaryKeyRelatedField(queryset=ColaboradorExterno.objects.all(),
                                                               write_only=True, required=False)

        class Meta:
            model = MembroDeBancaDeProposta
            fields = ['id', 'cadastrado_em', 'atualizado_em', 'membro_interno', 'membro_interno_id',
                      'membro_externo', 'membro_externo_id']

    class AvaliacaoDePropostaSerializer(serializers.ModelSerializer):
        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = ['id', 'username']

        usuario = UserSerializer(read_only=True)

        class Meta:
            model = AvaliacaoDeProposta
            fields = ['id', 'cadastrado_em', 'atualizado_em', 'usuario', 'comentario', 'aprovada',
                      'publicada']

    orientacao_id = serializers.PrimaryKeyRelatedField(queryset=Orientacao.objects.all(), write_only=True,
                                                       required=True)
    orientacao = OrientacaoSerializer(read_only=True)
    membros_da_banca = MembroDeBancaSerializer(many=True)
    avaliacoes = AvaliacaoDePropostaSerializer(read_only=True, many=True)
    aprovada_por = UserSerializer(read_only=True)
    aprovada_por_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, required=False)

    class Meta:
        model = PropostaDeEstagio
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'orientacao', 'orientacao_id', 'titulo', 'conceitos',
                  'resultados_esperados', 'aprovada', 'aprovada_em', 'aprovada_por', 'aprovada_por_id',
                  'membros_da_banca', 'avaliacoes']

    def create(self, validated_data):
        # no POST, membros_da_banca contém um array com IDs de funcionários (para definição
        # de um membro interno) ou as informações do membro externo
        with transaction.atomic():
            membros_data = validated_data.pop('membros_da_banca')
            validated_data['orientacao'] = validated_data.pop('orientacao_id')
            aprovada = validated_data.pop('aprovada', None)
            if aprovada:
                from datetime import datetime
                validated_data['aprovada_em'] = datetime.today()
                validated_data['aprovada_por'] = validated_data.pop('aprovada_por_id')
            proposta = PropostaDeEstagio.objects.create(**validated_data)
            for membro_data in membros_data:
                if 'membro_interno_id' in membro_data:
                    proposta.membros_da_banca.create(membro_interno=membro_data.get('membro_interno_id'))
                else:
                    proposta.membros_da_banca.create(membro_externo=membro_data.get('membro_externo_id'))
            return proposta

    def update(self, instance, validated_data):
        with transaction.atomic():
            # remove todos os registros de membro da banca
            instance.membros_da_banca.all().delete()
            membros_data = validated_data.pop('membros_da_banca')
            instance.orientacao = validated_data.pop('orientacao_id', instance.orientacao)
            instance.titulo = validated_data.pop('titulo', instance.titulo)
            instance.conceitos = validated_data.pop('conceitos', instance.titulo)
            instance.resultados_esperados = validated_data.pop('resultados_esperados', instance.resultados_esperados)
            instance.aprovada = validated_data.pop('aprovada', instance.aprovada)
            if instance.aprovada:
                from datetime import datetime
                instance.aprovada_em = datetime.today()
                instance.aprovada_por = validated_data.pop('aprovada_por_id', instance.aprovada_por)
            for membro_data in membros_data:
                for membro_data in membros_data:
                    if 'membro_interno_id' in membro_data:
                        instance.membros_da_banca.create(membro_interno=membro_data.get('membro_interno_id'))
                    else:
                        instance.membros_da_banca.create(membro_externo=membro_data.get('membro_externo_id'))
            instance.save()
            return instance


class PropostaDeTCCSerializer(PropostaDeEstagioSerializer):
    class Meta:
        model = PropostaDeTCC
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'orientacao', 'orientacao_id', 'titulo', 'conceitos',
                  'resultados_esperados', 'aprovada', 'aprovada_em', 'aprovada_por', 'objetivo', 'tecnologias',
                  'metodologia', 'membros_da_banca']

    def create(self, validated_data):
        # no POST, membros_da_banca contém um array com IDs de funcionários (para definição
        # de um membro interno) ou as informações do membro externo
        with transaction.atomic():
            membros_data = validated_data.pop('membros_da_banca')
            validated_data['orientacao'] = validated_data.pop('orientacao_id')
            proposta = PropostaDeTCC.objects.create(**validated_data)
            aprovada = validated_data.pop('aprovada', None)
            if aprovada:
                from datetime import datetime
                validated_data['aprovada_em'] = datetime.today()
                validated_data['aprovada_por'] = validated_data.pop('aprovada_por_id')
            for membro_data in membros_data:
                if 'membro_interno_id' in membro_data:
                    proposta.membros_da_banca.create(membro_interno=membro_data.get('membro_interno_id'))
                else:
                    proposta.membros_da_banca.create(membro_externo=membro_data.get('membro_externo_id'))
            return proposta

    def update(self, instance, validated_data):
        with transaction.atomic():
            # remove todos os registros de membro da banca
            instance.membros_da_banca.all().delete()
            membros_data = validated_data.pop('membros_da_banca')
            instance.orientacao = validated_data.pop('orientacao_id', instance.orientacao)
            instance.titulo = validated_data.pop('titulo', instance.titulo)
            instance.conceitos = validated_data.pop('conceitos', instance.titulo)
            instance.resultados_esperados = validated_data.pop('resultados_esperados', instance.resultados_esperados)
            instance.objetivo = validated_data.pop('objetivo', instance.objetivo)
            instance.tecnologias = validated_data.pop('tecnologias', instance.tecnologias)
            instance.metodologia = validated_data.pop('metodologia', instance.metodologia)
            instance.aprovada = validated_data.pop('aprovada', instance.aprovada)
            if instance.aprovada:
                from datetime import datetime
                instance.aprovada_em = datetime.today()
                instance.aprovada_por = validated_data.pop('aprovada_por_id', instance.aprovada_por)
            for membro_data in membros_data:
                for membro_data in membros_data:
                    if 'membro_interno_id' in membro_data:
                        instance.membros_da_banca.create(membro_interno=membro_data.get('membro_interno_id'))
                    else:
                        instance.membros_da_banca.create(membro_externo=membro_data.get('membro_externo_id'))
            instance.save()
            return instance


class AvaliacaoDePropostaSerializer(serializers.ModelSerializer):
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, required=True)
    avaliador = serializers.SerializerMethodField('get_avaliador')

    def get_avaliador(self, instance):
        avaliador_dados = {'usuario_id': instance.usuario.id, 'usuario_username': instance.usuario.username}
        avaliador = instance.avaliador
        if avaliador:
            avaliador_dados['nome'] = avaliador.nome
            if instance.usuario_eh_funcionario:
                avaliador_dados['tipo'] = 'interno'
                avaliador_dados['cgu'] = avaliador.cgu
            else:
                avaliador_dados['tipo'] = 'externo'
                avaliador_dados['email'] = avaliador.email
                avaliador_dados['instituicao'] = avaliador.instituicao
        return avaliador_dados

    class Meta:
        model = AvaliacaoDeProposta
        fields = ['id', 'cadastrado_em', 'atualizado_em', 'usuario', 'usuario_id', 'comentario', 'aprovada',
                  'publicada', 'proposta', 'avaliador']

    def create(self, validated_data):
        validated_data['usuario'] = validated_data.pop('usuario_id')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.usuario = validated_data.pop('usuario_id')
        return super().update(instance, validated_data)


class ColaboradorExternoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColaboradorExterno
        fields = '__all__'
