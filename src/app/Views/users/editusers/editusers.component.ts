import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/User/users';
import { UsersService } from 'src/app/Service/api/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditusersComponent {

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
    role:history.state.user.roles,
    permissions:history.state.user.permissions,
    
  };
  passwordMismatch = false;

  constructor(private usersService:UsersService,  private router:Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas actualizar los datos del usuario ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.usersService.updateUsers(this.user.id, this.user).subscribe(
          (success: any) => {
              this.indexUsers();
              this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del usuario exitosa.')
          },
          error => {
            // Manejo de errores aquí
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `${mensajeError}`;
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
        this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion del usuario cancelada.')
      }
    })
  }

  indexUsers(){
    this.router.navigate(['Users']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Verificar si el valor ingresado no cumple con el patrón y limpiarlo
    if (!/^[0-9]{20}$/.test(inputValue)) {
      input.value = inputValue.replace(/[^0-9]/g, '').substring(0, 20);
    }
  }
}
