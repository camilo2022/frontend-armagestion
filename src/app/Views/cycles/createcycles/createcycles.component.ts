import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createcycles',
  templateUrl: './createcycles.component.html',
  styleUrls: ['./createcycles.component.css'],
})
export class CreatecyclesComponent {

  cycle: Cycles = new Cycles();

  constructor(private cyclesService:CyclesService,  private router:Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas guardar los datos del ciclo ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.cyclesService.storeCycles(this.cycle).subscribe(
          (success: any) => {
              this.indexCycles();
              this.alertSwal('success', '¡Accion Exitosa!', 'Creacion del ciclo exitosa.')
          },
          error => {
            // Manejo de errores aquí
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `- ${mensajeError}`;
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
        this.alertSwal('warning', '¡Accion cancelada!', 'Creacion del ciclo cancelada.')
      }
    })
  }

  indexCycles(){
    this.router.navigate(['Cycles']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

}
