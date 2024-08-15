import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from 'src/app/Models/User/users';
import { UsersService } from 'src/app/Service/api/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesAndPermissionsService } from 'src/app/Service/api/roles-and-permissions.service';
import { RolesAndPermissions } from 'src/app/Models/RolesAndPermissions/roles-and-permissions';

@Component({
  selector: 'app-assignusersrolesandpermissions',
  templateUrl: './assignusersrolesandpermissions.component.html',
  styleUrls: ['./assignusersrolesandpermissions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AssignusersrolesandpermissionsComponent {

  user: Users = {
    id:history.state.user.id,
    name:history.state.user.name,
    last_name:history.state.user.last_name,
    document_number:history.state.user.document_number,
    phone_number:history.state.user.phone_number,
    address:history.state.user.address,
    email:history.state.user.email,
    password:'',
    password_confirmation:'',
    role:'',
    permissions:[],
  };

  rolesAndPermissions: any = {
    search: '',
    perPage: 5,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSource = new MatTableDataSource<RolesAndPermissions>();
  displayedColumns: string[] = ['role'];
  expandDisplayedColumns = [...this.displayedColumns, 'expand'];
  expandedElement: RolesAndPermissions | null;

  constructor(private usersService:UsersService, private rolesAndPermissionsService:RolesAndPermissionsService, private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getRolesAndPermissions();
  }

  getRolesAndPermissions(){
    this.rolesAndPermissionsService.getRolesAndPermissions(this.rolesAndPermissions, this.rolesAndPermissions.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          // Asigna los datos al dataSource
          this.dataSource.data = response.data.roles;
          this.rolesAndPermissions.total = response.data.meta.pagination.total;
          this.rolesAndPermissions.count = response.data.meta.pagination.count;
          this.rolesAndPermissions.per_page = response.data.meta.pagination.per_page;
          this.rolesAndPermissions.current_page = response.data.meta.pagination.current_page;
          this.rolesAndPermissions.total_pages = response.data.meta.pagination.total_pages;
        }
      },
      error => {
        // Manejo de errores aquí
        let mensaje = 'Se encontraron errores:\n';
        if(error.error.errors){
          for (const campo in error.error.errors) {
            if (error.error.errors.hasOwnProperty(campo)) {
              const mensajes = error.error.errors[campo];
              mensaje += `${campo}:\n`;

              for (const mensajeError of mensajes) {
                mensaje += `- ${mensajeError}\n`;
              }
            }
          }
        }else{
          mensaje += error.error.message;
        }
        this.alertSwal('error', '¡Accion Fallida!', mensaje);
      }
    )
  }

  searchRolesAndPermissions(){
    this.rolesAndPermissions.current_page = 1;
    this.getRolesAndPermissions();
  }

  togglePermissionSelection(permissionName: string): void {
    const index = this.user.permissions.indexOf(permissionName);
    if (index === -1) {
      this.user.permissions.push(permissionName);
    } else {
      this.user.permissions.splice(index, 1);
    }
  }

  indexUser(){
    this.router.navigate([`Users`]);
  }

  cleanPermissions(): void {
    this.user.permissions.splice(0, this.user.permissions.length);
  }

  assignRoleAndPermissions(role:object){
    this.user.role = role;
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas asignar el rol y los permisos del usuario.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, asignar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.usersService.assignRoleAndPermissionsUsers(this.user).subscribe(
          data => {
            this.indexUser();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se asignaron el rol y permisos del usuario.');
          },
          error => {
            // Manejo de errores aquí
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  mensaje += `${campo}:\n`;

                  for (const mensajeError of mensajes) {
                    mensaje += `- ${mensajeError}\n`;
                  }
                }
              }
            }else{
              mensaje += error.error.message;
            }
            this.alertSwal('error', '¡Accion Fallida!', mensaje);
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Asignacion del rol y permisos del usuario cancelada.');
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
    this.rolesAndPermissions.current_page = event.pageIndex + 1;
    this.rolesAndPermissions.perPage = event.pageSize;
    this.getRolesAndPermissions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
