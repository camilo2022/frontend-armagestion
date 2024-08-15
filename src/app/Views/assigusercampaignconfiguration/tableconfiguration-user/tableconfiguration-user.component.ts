
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssigUserConfiguration } from 'src/app/Models/AssigUserCongfigurations/assiguserconfigurations';
import { AssiguserconfigurationService } from 'src/app/Service/api/assiguserconfiguration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableconfiguration-user',
  templateUrl: './tableconfiguration-user.component.html',
  styleUrls: ['./tableconfiguration-user.component.css']
})
export class TableconfigurationUserComponent implements OnInit {

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

 /*  processingFile: Boolean = false; */

  AssigUserConfiguratio:AssigUserConfiguration = new AssigUserConfiguration();
  isDialogShow: boolean = false;

  dataSource = new MatTableDataSource<AssigUserConfiguration>();
  displayedColumns: string[] = ['id' , 'user_interactions_min_count', 'user_interactions_max_count', 'effectiveness_percentage' , 'payment_agreement_percentage', 'user_id', 'name'];


  effectiveness_percentage: DoubleRange;
  payment_agreement_percentage: DoubleRange;
  user_id:number;
  constructor(private AssiguserconfigurationService:AssiguserconfigurationService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.getassigUserConfigurationCampaigns();

  }
  
   getassigUserConfigurationCampaigns(){
    this.AssiguserconfigurationService.getAssigUserConfiguration(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {

        if (response.error === false) {

          console.log(response.data.configuration);
          this.dataSource.data = response.data.configuration;
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
    this.getassigUserConfigurationCampaigns();
  }

}
