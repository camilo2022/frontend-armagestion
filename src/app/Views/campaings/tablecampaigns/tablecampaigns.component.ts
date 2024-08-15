import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablecampaigns',
  templateUrl: './tablecampaigns.component.html',
  styleUrls: ['./tablecampaigns.component.css']
})
export class TablecampaignsComponent implements OnInit {

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSource = new MatTableDataSource<Campaigns>();
  displayedColumns: string[] = ['id', 'camp_name', 'camp_description', 'user'];

  constructor(private campaignsService:CampaignsService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getCampaigns();
  }

  getCampaigns(){
    this.campaignsService.getCampaigns(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (!response.error) {

          console.log(response.data.campaigns);
          this.dataSource.data = response.data.campaigns;
          this.dataTable.total = response.data.meta.pagination.total;
          this.dataTable.count = response.data.meta.pagination.count;
          this.dataTable.per_page = response.data.meta.pagination.per_page;
          this.dataTable.current_page = response.data.meta.pagination.current_page;
          this.dataTable.total_pages = response.data.meta.pagination.total_pages;
        }
      },
      error => {
        let mensaje = 'Se encontraron errores:\n';

        for (const campo in error.error.errors) {
          if (error.error.errors.hasOwnProperty(campo)) {
            const mensajes = error.error.errors[campo];
            mensaje += `${campo}:\n`;

            for (const mensajeError of mensajes) {
              mensaje += `- ${mensajeError}\n`;
            }
          }
        }
        this.alertSwal('error', 'Ooops..', mensaje)
      }
    )
  }

  searchCampaigns(){
    this.dataTable.current_page = 1;
    this.getCampaigns();
  }

  deleteCampaign(campaign: Campaigns){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar la campaña.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.campaignsService.deleteCampaigns(campaign).subscribe(
          data => {
            this.getCampaigns();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino la campaña.');
          },
          error => {
            this.getCampaigns();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino la campaña.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion de la campaña cancelada.');
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

  alertSwalMin(icon: any, title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  onPageChange(event: any) {
    this.dataTable.current_page = event.pageIndex + 1;
    this.dataTable.perPage = event.pageSize;
    this.getCampaigns();
  }
}
