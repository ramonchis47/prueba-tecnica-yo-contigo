import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios: any = [];
  response: any = {};
  @ViewChild('abrirModal', { static: true }) miBoton!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/usuarios').subscribe((data) => {
      this.usuarios = data;
    });
  }

  borrar(id: number): void {

    this.http
      .delete(`http://localhost:3000/usuarios/${id}`)
      .subscribe(
        (response) => {
          // Maneja la respuesta del servidor
          this.response = response;
        },
        (error) => {
          this.response = error;
        }
      );

    this.miBoton.nativeElement.click();
  }

  actualizar(id:number) : void{
    this.router.navigate(['ingresar', id]);
  }

  ngOnInit() { }
}
