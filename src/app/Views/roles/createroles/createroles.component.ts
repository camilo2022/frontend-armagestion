import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesAndPermissionsService } from 'src/app/Service/api/roles-and-permissions.service';
import { RolesAndPermissions } from 'src/app/Models/RolesAndPermissions/roles-and-permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createroles',
  templateUrl: './createroles.component.html',
  styleUrls: ['./createroles.component.css']
})
export class CreaterolesComponent {

  permissionss:{ name: string }[] = [{  name: '' }];
  rolesAndPermissions: RolesAndPermissions = {
    id: 0,
    roles: '',
    permissions: []
  };

  constructor(private rolesAndPermissionsService:RolesAndPermissionsService,  private router:Router) { }

  ngOnInit(): void {

  }

  addPermission() {
    this.permissionss.push({
      name: ''
    });
  }

  removePermission(index: number) {
    if (index >= 0 && index < this.permissionss.length) {
      this.permissionss.splice(index, 1);
    }
  }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas guardar el rol y los permisos ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.rolesAndPermissionsService.storeRolesAndPermissions(this.rolesAndPermissions).subscribe(
          (success: any) => {
              this.indexRolesAndPermissions();
              this.alertSwal('success', '¡Accion Exitosa!', 'Creacion del rol y permisos exitosa.');
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
        this.alertSwal('warning', '¡Accion Cancelada!', 'Creacion del rol y los permisos cancelada.');
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

  indexRolesAndPermissions(){
    this.router.navigate(['Roles']);
  }
}
