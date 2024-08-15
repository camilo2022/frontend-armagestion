import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RolesAndPermissionsService } from 'src/app/Service/api/roles-and-permissions.service';
import { Router } from '@angular/router';
import { RolesAndPermissions } from 'src/app/Models/RolesAndPermissions/roles-and-permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableroles',
  templateUrl: './tableroles.component.html',
  styleUrls: ['./tableroles.component.css']
})
export class TablerolesComponent implements OnInit{

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }
  dataSource = new MatTableDataSource<RolesAndPermissions>();
  displayedColumns: string[] = ['role', 'permissions', 'editar'/* ,'eliminar' */];

  constructor(private rolesAndPermissionsService:RolesAndPermissionsService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getRolesAndPermissions();
  }

  getRolesAndPermissions(){
    this.rolesAndPermissionsService.getRolesAndPermissions(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          // Asigna los datos al dataSource
          this.dataSource.data = response.data.roles;
          this.dataTable.total = response.data.meta.pagination.total;
          this.dataTable.count = response.data.meta.pagination.count;
          this.dataTable.per_page = response.data.meta.pagination.per_page;
          this.dataTable.current_page = response.data.meta.pagination.current_page;
          this.dataTable.total_pages = response.data.meta.pagination.total_pages;
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
        this.alertSwal('error', 'Ooops...', mensaje);
      }
    )
  }

  searchRolesAndPermissions(){
    this.dataTable.current_page = 1;
    this.getRolesAndPermissions();
  }

  editRolesAndPermissions(id:number, element: any) { // Asegúrate de definir el tipo correcto para element
    this.router.navigate([`Roles/Edit/${id}`], { state: { element } });
  }

  deleteRolesAndPermissions(role_id:number, permission_id:number[]){
    permission_id = permission_id.map((item: any) => item.id);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el rol y sus permisos asignados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.rolesAndPermissionsService.deleteRolesAndPermissions({role_id: [role_id], permission_id: permission_id}).subscribe(
          data => {
            console.log(data);
            this.getRolesAndPermissions();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino el rol y los permisos asignados.');
          },
          error => {
            console.log(error);
            this.getRolesAndPermissions();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino el rol ni los permisos asignados.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion de rol y permisos asignados cancelada.');
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
    this.getRolesAndPermissions();
  }
}
