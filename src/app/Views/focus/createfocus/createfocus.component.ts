import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Focus } from 'src/app/Models/Focus/focus';
import { FocusService } from 'src/app/Service/api/focus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createfocus',
  templateUrl: './createfocus.component.html',
  styleUrls: ['./createfocus.component.css']
})
export class CreatefocusComponent {

  focus: Focus = new Focus();

  constructor(private focusService:FocusService, private router:Router) { }

  ngOnInit(): void { }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas guardar los datos del foco ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.focusService.storeFocus(this.focus).subscribe(
          (success: any) => {
              this.indexFocus();
              this.alertSwal('success', '¡Accion Exitosa!', 'Creacion del foco exitosa.')
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
        this.alertSwal('warning', '¡Accion cancelada!', 'Creacion del foco cancelada.')
      }
    })
  }

  indexFocus(){
    this.router.navigate(['Focus']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
}

