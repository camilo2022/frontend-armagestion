import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { Focus } from 'src/app/Models/Focus/focus';
import { Payments } from 'src/app/Models/Payments/payments';
import { AssignmentsService } from 'src/app/Service/api/assignments.service';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import { FocusService } from 'src/app/Service/api/focus.service';
import { PaymentsService } from 'src/app/Service/api/payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-masivepayments',
  templateUrl: './masivepayments.component.html',
  styleUrls: ['./masivepayments.component.css']
})
export class MasivepaymentsComponent {

  payments: FormData = new FormData();
  pay: Payments = new Payments();
  file: any = null;
  processingFile: Boolean = false;

  constructor(private paymentsService:PaymentsService, private router:Router) { }

  onSubmit(){
    this.pay.pays_file = this.pay.pays_file ?? null;
    if(this.pay.pays_file !== null){

      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas cargar el archivo de pagos ingresado.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value) {
          this.processingFile = true;
          this.paymentsService.uploadPayments(this.payments).subscribe(
            (success: any) => {
              this.processingFile = false;
              this.alertSwal('success', '¡Accion Exitosa!', 'Creacion de pagos exitosa.')
            },
            error => {
              this.processingFile = false;
              // Manejo de errores aquí
              let mensaje = 'Se encontraron errores:\n';
              if(error.error.error.errors){
                for (const campo in error.error.error.errors) {
                  if (error.error.error.errors.hasOwnProperty(campo)) {
                    const mensajes = error.error.error.errors[campo];
                    mensaje += `${campo}:\n`;

                    for (const mensajeError of mensajes) {
                      mensaje += `- ${mensajeError}\n`;
                    }
                   
                  }
                }
              }else{
                mensaje += error.error.message;
                console.log("entro aqui");
              }
              this.alertSwal('error', '¡Accion Fallida!', mensaje);
            }
          )
        }else{
          this.alertSwal('warning', '¡Accion cancelada!', 'Creacion de pagos cancelada.')
        }
      })
    }
  }

  GetFileOnLoad(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files: any = fileInput.files || [];
    const file = files[0];
    if (file) {
      let element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
      if (element) {
        element.value = file.name;
      }
      this.pay.pays_file = file;
      this.payments.append('pays_file', file, file.name);
    }
  }

  indexPayments(){
    this.router.navigate(['Payments']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
}
