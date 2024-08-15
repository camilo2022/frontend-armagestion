import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from 'src/app/Models/User/users';
import { UsersService } from 'src/app/Service/api/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableusers',
  templateUrl: './tableusers.component.html',
  styleUrls: ['./tableusers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableusersComponent implements OnInit{

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  user:Users = new Users();

  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['id', 'name', 'last_name', 'email', 'assign', 'remove', 'editar', 'eliminar'];
  expandDisplayedColumns = [...this.displayedColumns, 'expand'];
  expandedElement: Users | null;

  constructor(private usersService:UsersService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers(this.dataTable, this.dataTable.current_page).subscribe(
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

  searchUsers(){
    this.dataTable.current_page = 1;
    this.getUsers();
  }

  editUser(id:number, user: Users){
    this.router.navigate([`Users/Edit/${id}`], { state: { user } });
  }

  deleteUser(user: Users){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.usersService.deleteUsers(user).subscribe(
          data => {
            this.getUsers();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino el usuario.');
          },
          error => {
            this.getUsers();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino el usuario.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion del usuario cancelada.');
      }
    })
  }

  removeRoleAndPermissionsUsers(user: Users){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas remover el rol y los permisos del usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, remover',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.usersService.removeRoleAndPermissionsUsers(user).subscribe(
          data => {
            this.getUsers();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se removieron el rol y permisos del usuario.');
          },
          error => {
            this.getUsers();
            this.alertSwal('error', '¡Accion Fallida!', 'No se removieron el rol y permisos del usuario.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Remoción del rol y permisos del usuario cancelada.');
      }
    })
  }

  assignRoleAndPermissionsUsers(user: Users){
    this.router.navigate([`Users/AssignRoleAndPermissions`], { state: { user } });
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
    this.getUsers();
  }
}
