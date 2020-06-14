import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user: any;
  constructor(private auth$: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth$.user();
    if (this.user) {
      
    } else {
      this.router.navigate(['/login']);
    }
  }

}
