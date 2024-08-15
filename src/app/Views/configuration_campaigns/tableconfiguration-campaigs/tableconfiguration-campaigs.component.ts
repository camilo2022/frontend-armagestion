import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfigurationCampaigns } from 'src/app/Models/ConfigurationCampaign/configuration-campaigns';
import { ConfigurationCampaignsService } from 'src/app/Service/api/configuration-campaigns.service';

@Component({
  selector: 'app-tableconfiguration-campaigs',
  templateUrl: './tableconfiguration-campaigs.component.html',
  styleUrls: ['./tableconfiguration-campaigs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableconfigurationCampaigsComponent implements OnInit {

  dataTable: any = {
    search: '',
    perPage: 20,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }
  processingFile: Boolean = false;

  configurationCampaign:ConfigurationCampaigns = new ConfigurationCampaigns();
  isDialogShow: boolean = false;
  isDialogShowBloqueo: boolean = false;
  checkBoxValue: boolean = true;

  dataSource = new MatTableDataSource<ConfigurationCampaigns>();
  displayedColumns: string[] = ['id', 'user_interactions_min_count', 'user_interactions_max_count', 'effectiveness_percentage', 'payment_agreement_percentage', 'type_service_percentage', 'campaign', 'editar', /* 'eliminar', */ 'report'];
  expandDisplayedColumns = [...this.displayedColumns, 'expand'];
  expandedElement: ConfigurationCampaigns | null;

  constructor(private configurationCampaignsService:ConfigurationCampaignsService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getConfigurationCampaigns();
  }

  openDialog(configurationCampaign: ConfigurationCampaigns) {
    console.log(configurationCampaign);
    this.configurationCampaign = configurationCampaign;
    if(configurationCampaign.confirmation_block_movil === true || configurationCampaign.confirmation_block_fija === true){
      this.isDialogShowBloqueo = true;
      this.checkBoxValue = true;
    }
    else{
      this.isDialogShow = true;
      this.checkBoxValue = false;
    }
  }

  closeDialog() {
    this.isDialogShow = false;
    this.isDialogShowBloqueo = false;
    this.checkBoxValue = false;
  }

  getConfigurationCampaigns(){
    this.configurationCampaignsService.getConfigurationCampaigns(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {

          this.dataSource.data = response.data.configurations;
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

  searchConfigurationCampaigns(){
    this.dataTable.current_page = 1;
    this.getConfigurationCampaigns();
  }

  editConfigurationCampaigns(id:number, configurationCampaign: ConfigurationCampaigns){
    this.router.navigate([`ConfigurationCampaigns/Edit/${id}`], { state: { configurationCampaign } });
  }

  deleteConfigurationCampaigns(configurationCampaign: ConfigurationCampaigns){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar la configuracion de la campaña.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.configurationCampaignsService.deleteConfigurationCampaigns(configurationCampaign).subscribe(
          data => {
            this.getConfigurationCampaigns();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino la configuracion de la campaña.');
          },
          error => {
            this.getConfigurationCampaigns();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino la configuracion de la campaña.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion de la configuracion de la campaña cancelada.');
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

  onPageChange(event: any) {
    this.dataTable.current_page = event.pageIndex + 1;
    this.dataTable.perPage = event.pageSize;
    this.getConfigurationCampaigns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadConfigurationCampaigns(/* configurationCampaign: ConfigurationCampaigns */) {
    const data = {
      id: this.configurationCampaign.id,
      date: this.configurationCampaign.date,
      checkBoxValue: this.checkBoxValue // Agrega el estado del checkbox a los datos
    };
    this.processingFile = true;
    this.configurationCampaignsService.downloadConfigurationCampaigns(data).subscribe(
      blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'gestiones.csv';

        // Simula un clic en el enlace para iniciar la descarga
        anchor.click();
        this.processingFile = false;
        // Revoca el objeto URL después de la descarga
        window.URL.revokeObjectURL(blobUrl);
      },

      error => {
        this.processingFile = false;
        console.log(error);
      }

    )

  }
}
