import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { Payments } from 'src/app/Models/Payments/payments';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import { PaymentsService } from 'src/app/Service/api/payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editpayments',
  templateUrl: './editpayments.component.html',
  styleUrls: ['./editpayments.component.css']
})
export class EditpaymentsComponent {

  payments: Payments = {
    id: history.state.payments.id,
    pay_account: history.state.payments.pay_account,
    pay_value: history.state.payments.pay_value,
    pay_date: history.state.payments.pay_date,
    campaign_id: history.state.payments.campaign_id,
    focus_id: history.state.payments.focus_id,
    assi_id: history.state.payments.assi_id,
    cycle: history.state.payments.cycle,
    pays_file: ''
  }

  dataTableCampaign: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSourceCycles = new MatTableDataSource<Cycles>();
  displayedColumnsCycles: string[] = ['check', 'cycle_name', 'cycle_start_date', 'cycle_end_date'];

  dataSourceCampaigns = new MatTableDataSource<Campaigns>();
  displayedColumnsCampaigns: string[] = ['check', 'camp_name', 'user'];

  constructor(private paymentsService:PaymentsService, private campaignsService:CampaignsService, private router:Router) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(){
    this.campaignsService.getCampaigns(this.dataTableCampaign, this.dataTableCampaign.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSourceCampaigns.data = response.data.campaigns;
          this.dataTableCampaign.total = response.data.meta.pagination.total;
          this.dataTableCampaign.count = response.data.meta.pagination.count;
          this.dataTableCampaign.per_page = response.data.meta.pagination.per_page;
          this.dataTableCampaign.current_page = response.data.meta.pagination.current_page;
          this.dataTableCampaign.total_pages = response.data.meta.pagination.total_pages;
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

  searchCampaigns(){
    this.dataTableCampaign.current_page = 1;
    this.getCampaigns();
  }

  onSubmit(){
    this.payments.campaign_id = this.payments.campaign_id ?? 0;
    if(this.payments.campaign_id !== 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas guardar los datos del pago ingresado.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.paymentsService.updatePayments(this.payments.id, this.payments).subscribe(
            (success: any) => {
                this.indexPayments();
                this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion del pago exitosa.')
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion del pago cancelada.')
        }
      })
    }
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Verificar si el valor ingresado no cumple con el patrón y limpiarlo
    if (!/^[0-9]{30}$/.test(inputValue)) {
      input.value = inputValue.replace(/[^0-9]/g, '').substring(0, 30);
    }
  }

  assignCampaign(id:number, event: any){
    this.payments.campaign_id = event.checked ? id : 0;
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

  onPageChangeCampaign(event: any) {
    this.dataTableCampaign.current_page = event.pageIndex + 1;
    this.dataTableCampaign.perPage = event.pageSize;
    this.getCampaigns();
  }
}
