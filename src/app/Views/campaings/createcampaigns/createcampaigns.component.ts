import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { Users } from 'src/app/Models/User/users';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import { UsersService } from 'src/app/Service/api/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createcampaigns',
  templateUrl: './createcampaigns.component.html',
  styleUrls: ['./createcampaigns.component.css']
})
export class CreatecampaignsComponent {

  campaign: Campaigns = new Campaigns();

  dataTable: any = {
    role: ['Administrador', 'Coordinador'],
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['check', 'name', 'last_name', 'email'];

  constructor(private campaignsService:CampaignsService, private usersService:UsersService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSource.data = response.data.users;
          this.dataTable.total = response.data.meta.pagination.total;
          this.dataTable.count = response.data.meta.pagination.count;
          this.dataTable.per_page = response.data.meta.pagination.per_page;
          this.dataTable.current_page = response.data.meta.pagination.current_page;
          this.dataTable.total_pages = response.data.meta.pagination.total_pages;
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

  searchUsers(){
    this.dataTable.current_page = 1;
    this.getUsers();
  }

  onSubmit(){
    this.campaign.user_id = this.campaign.user_id ?? 0;
    if(this.campaign.user_id !== 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas guardar los datos de la campaña ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.campaignsService.storeCampaigns(this.campaign).subscribe(
            (success: any) => {
                this.indexCampaigns();
                this.alertSwal('success', '¡Accion Exitosa!', 'Creacion de la campaña exitosa.')
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Creacion de la campaña cancelada.')
        }
      })
    }
  }

  assignManager(id:number, event: any){
    this.campaign.user_id = event.checked ? id : 0;
  }

  indexCampaigns(){
    this.router.navigate(['Campaigns']);
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
    this.getUsers();
  }
}
