import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Focus } from 'src/app/Models/Focus/focus';
import { FocusService } from 'src/app/Service/api/focus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editfocus',
  templateUrl: './editfocus.component.html',
  styleUrls: ['./editfocus.component.css']
})
export class EditfocusComponent {

  focus: Focus = {
    id: history.state.focus.id,
    focus_name: history.state.focus.focus_name,
    focus_description: history.state.focus.focus_description
  }

  constructor(private focusService:FocusService, private router:Router) { }

  public ngOnInit(): void { }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas actualizar los datos del foco ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.focusService.updateFocus(this.focus, this.focus.id).subscribe(
          (success: any) => {
              this.indexFocus();
              this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del foco exitosa.')
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
        this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion del foco cancelada.')
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
