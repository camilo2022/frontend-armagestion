import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolesAndPermissions } from 'src/app/Models/RolesAndPermissions/roles-and-permissions';
import { RolesAndPermissionsService } from 'src/app/Service/api/roles-and-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editroles',
  templateUrl: './editroles.component.html',
  styleUrls: ['./editroles.component.css']
})
export class EditrolesComponent {

  permissionss:{ name: string }[] = [ history.state.element.permissions.map((permission: { name: string }) => ({ name: permission.name }))][0];
  rolesAndPermissions: RolesAndPermissions = {
    id: history.state.element.id,
    roles: history.state.element.role,
    permissions: []
  };

  constructor(private rolesAndPermissionsService:RolesAndPermissionsService,  private router:Router) { }

  public ngOnInit(): void {

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
    // Mapear los valores de 'name' de 'permissionss' a 'rolesAndPermissions.permissions'
    this.rolesAndPermissions.permissions = this.permissionss.map(permission => permission.name);

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas editar los permisos del rol.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.rolesAndPermissionsService.updateRolesAndPermissions(this.rolesAndPermissions.id, this.rolesAndPermissions).subscribe(
          (success: any) => {
              this.indexRolesAndPermissions();
              this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del rol y los permisos exitosa.')
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
        this.alertSwal('warning', '¡Accion Cancelada!', 'Actualizacion del rol y los permisos cancelada.')
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
