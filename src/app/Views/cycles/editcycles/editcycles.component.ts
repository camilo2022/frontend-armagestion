import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcycles',
  templateUrl: './editcycles.component.html',
  styleUrls: ['./editcycles.component.css']
})
export class EditcyclesComponent {

  cycle: Cycles = {
    id: history.state.cycle.id,
    cycle_name: history.state.cycle.cycle_name,
    cycle_start_date: new Date(history.state.cycle.cycle_start_date),
    cycle_end_date: new Date(history.state.cycle.cycle_end_date)
  }
  constructor(private cyclesService:CyclesService,  private router:Router) { }

  public ngOnInit(): void {

  }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas editar el ciclo.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.cyclesService.updateCycles(this.cycle, this.cycle.id).subscribe(
          (success: any) => {
              this.indexCycles();
              this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del ciclo exitosa.');
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
        this.alertSwal('warning', '¡Accion Cancelada!', 'Actualizacion del ciclo cancelada.');
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

  indexCycles(){
    this.router.navigate(['Cycles']);
  }
}
