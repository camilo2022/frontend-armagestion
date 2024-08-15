import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from 'src/app/Models/User/users';
import { UsersService } from 'src/app/Service/api/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableusersinactives',
  templateUrl: './tableusersinactives.component.html',
  styleUrls: ['./tableusersinactives.component.css']
})
export class TableusersinactivesComponent implements OnInit{

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['id', 'name', 'last_name', 'document_number', 'phone_number', 'address', 'email', 'restore'];

  constructor(private usersService:UsersService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsersInactives();
  }

  getUsersInactives(){
    this.usersService.getUsersInactives(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSource.data = response.data.users;
          this.dataTable.total = response.data.meta.pagination.total;
          this.dataTable.count = response.data.meta.pagination.count;
          this.dataTable.per_page = response.data.meta.pagination.per_page;
          this.dataTable.current_page = response.data.meta.pagination.current_page;
          this.dataTable.total_pages = response.data.meta.pagination.total_pages;
        }
      },
      error => {
        let mensaje = 'Se encontraron errores:\n';

        for (const campo in error.error.errors) {
          if (error.error.errors.hasOwnProperty(campo)) {
            const mensajes = error.error.errors[campo];
            mensaje += `${campo}:\n`;

            for (const mensajeError of mensajes) {
              mensaje += `- ${mensajeError}\n`;
            }
          }
        }
        this.alertSwal('error', 'Ooops..', mensaje)
      }
    )
  }

  searchUsersInactives(){
    this.dataTable.current_page = 1;
    this.getUsersInactives();
  }

  restoreUser(user: Users){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas restaurar el usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, restaurar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.usersService.restoreUsers(user).subscribe(
          data => {
            this.getUsersInactives();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se restauro el usuario.');
          },
          error => {
            this.getUsersInactives();
            this.alertSwal('error', '¡Accion Fallida!', 'No se restauro el usuario.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Restauracion del usuario cancelada.');
      }
    })
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  onPageChange(event: any) {
    this.dataTable.current_page = event.pageIndex + 1;
    this.dataTable.perPage = event.pageSize;
    this.getUsersInactives();
  }
}
