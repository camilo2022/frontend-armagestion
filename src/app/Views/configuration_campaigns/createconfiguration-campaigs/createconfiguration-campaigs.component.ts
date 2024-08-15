import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfigurationCampaigns } from 'src/app/Models/ConfigurationCampaign/configuration-campaigns';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { Focus } from 'src/app/Models/Focus/focus';
import { Users } from 'src/app/Models/User/users';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import { UsersService } from 'src/app/Service/api/users.service';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfigurationCampaignsService } from 'src/app/Service/api/configuration-campaigns.service';
import { FocusService } from 'src/app/Service/api/focus.service';
import { Assignments } from 'src/app/Models/Assignment/assignments';
import { AssignmentsService } from 'src/app/Service/api/assignments.service';
import { AnimationDriver } from '@angular/animations/browser';

@Component({
  selector: 'app-createconfiguration-campaigs',
  templateUrl: './createconfiguration-campaigs.component.html',
  styleUrls: ['./createconfiguration-campaigs.component.css']
})
export class CreateconfigurationCampaigsComponent {

  configurationCampaign: ConfigurationCampaigns = new ConfigurationCampaigns();

   assignment: boolean = false;
   usergetcoodin:any; 
   @ViewChild('mySelect') mySelect: ElementRef;
   valueData: string = '';

  dataTableUsers: any = {
    role: 'Gestor',
    alli_id: 0,
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataTableUsersCoordinador: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataTableCycles: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
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

  dataTableFocus: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataTableAssignment: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0,
    camp_id: null
  }


 

  dataSourceUsers = new MatTableDataSource<Users>();
  displayedColumnsUsers: string[] = ['check', 'id', 'name', 'email'];

  dataSourceCycles = new MatTableDataSource<Cycles>();
  displayedColumnsCycles: string[] = ['check', 'cycle_name', 'cycle_start_date', 'cycle_end_date'];

  dataSourceCampaigns = new MatTableDataSource<Campaigns>();
  displayedColumnsCampaigns: string[] = ['check', 'id', 'camp_name', 'camp_description'];

  dataSourceFocus = new MatTableDataSource<Focus>();
  displayedColumnsFocus: string[] = ['check', 'focus_name', 'focus_description'];

  dataSourceAssignments = new MatTableDataSource<Assignments>();
  displayedColumnsAssignments: string[] = ['check', 'id', 'assi_name'];

  dataSourceUsersCoordinador = new MatTableDataSource<ConfigurationCampaigns>();
  displayedColumnsUsersCoordinador: string[] = ['check','id','name','email']; 

  constructor(private configurationCampaignsService:ConfigurationCampaignsService, private campaignsService:CampaignsService, private focusService:FocusService, private usersService:UsersService, private cyclesService:CyclesService, private assignmentsService:AssignmentsService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.getCampaigns();
    this.getCycles();
    this.getFocus();
   this.getConfigurationUser(); 
   this.getAssignments();
  }

  getUsers(){
    this.usersService.getUsers(this.dataTableUsers, this.dataTableUsers.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
   
          this.dataSourceUsers.data = response.data.users;
          this.dataTableUsers.total = response.data.meta.pagination.total;
          this.dataTableUsers.count = response.data.meta.pagination.count;
          this.dataTableUsers.per_page = response.data.meta.pagination.per_page;
          this.dataTableUsers.current_page = response.data.meta.pagination.current_page;
          this.dataTableUsers.total_pages = response.data.meta.pagination.total_pages;
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

  getConfigurationUser(){
    this.configurationCampaignsService.getConfigurationCampaigns(this.dataTableUsersCoordinador, this.dataTableUsersCoordinador.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {

          this.dataSourceUsersCoordinador.data = response.data.configurations[0].usergetcoodin;
          this.dataTableUsersCoordinador.total = response.data.meta.pagination.total;
          this.dataTableUsersCoordinador.count = response.data.meta.pagination.count;
          this.dataTableUsersCoordinador.per_page = response.data.meta.pagination.per_page;
          this.dataTableUsersCoordinador.current_page = response.data.meta.pagination.current_page;
          this.dataTableUsersCoordinador.total_pages = response.data.meta.pagination.total_pages;

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

  assignUserCam(id: number, event: any) {
    this.configurationCampaign.userCoordinador_id = this.configurationCampaign.userCoordinador_id ?? [];
    if (event.checked) {
        this.configurationCampaign.userCoordinador_id.push(id);
    } else {
        const index = this.configurationCampaign.userCoordinador_id.indexOf(id);
        if (index !== -1) {
            this.configurationCampaign.userCoordinador_id.splice(index, 1);
        }
    }
  }

  searchUsers(){
    this.dataTableUsers.current_page = 1;
    this.getUsers();
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

  getCycles(){
    this.cyclesService.getCycles(this.dataTableCycles, this.dataTableCycles.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSourceCycles.data = response.data.cycles;
          this.dataTableCycles.total = response.data.meta.pagination.total;
          this.dataTableCycles.count = response.data.meta.pagination.count;
          this.dataTableCycles.per_page = response.data.meta.pagination.per_page;
          this.dataTableCycles.current_page = response.data.meta.pagination.current_page;
          this.dataTableCycles.total_pages = response.data.meta.pagination.total_pages;
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

  searchCycles(){
    this.dataTableCycles.current_page = 1;
    this.getCycles();
  }

  getAssignments(){
    this.assignmentsService.getAssignments(this.dataTableAssignment, this.dataTableAssignment.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSourceAssignments.data = response.data.assignments;
          this.dataTableAssignment.total = response.data.meta.pagination.total;
          this.dataTableAssignment.count = response.data.meta.pagination.count;
          this.dataTableAssignment.per_page = response.data.meta.pagination.per_page;
          this.dataTableAssignment.current_page = response.data.meta.pagination.current_page;
          this.dataTableAssignment.total_pages = response.data.meta.pagination.total_pages;
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

  searchAssignments(){
    this.dataTableAssignment.current_page = 1;
    this.getAssignments();
  }

  getFocus(){
    this.focusService.getFocus(this.dataTableFocus, this.dataTableFocus.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSourceFocus.data = response.data.focus;
          this.dataTableFocus.total = response.data.meta.pagination.total;
          this.dataTableFocus.count = response.data.meta.pagination.count;
          this.dataTableFocus.per_page = response.data.meta.pagination.per_page;
          this.dataTableFocus.current_page = response.data.meta.pagination.current_page;
          this.dataTableFocus.total_pages = response.data.meta.pagination.total_pages;
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

  searchFocus(){
    this.dataTableCycles.current_page = 1;
    this.getFocus();
  }

  onSubmit(){
    
    this.valueData = this.mySelect.nativeElement.value;
    const valueResult = parseInt(this.valueData);
    this.configurationCampaign.focus_ids = this.configurationCampaign.focus_ids ?? [];
    this.configurationCampaign.users_assigned = this.configurationCampaign.users_assigned ?? [];
    this.configurationCampaign.user_id = this.configurationCampaign.userCoordinador_id ?? [];
    this.configurationCampaign.campaign_id = this.configurationCampaign.campaign_id ?? 0;
    this.configurationCampaign.cycle_code = this.configurationCampaign.cycle_code ?? [];
  
    if(this.configurationCampaign.user_interactions_min_count < this.configurationCampaign.user_interactions_max_count && this.configurationCampaign.users_assigned.length > 0 && this.configurationCampaign.campaign_id !== 0 && this.configurationCampaign.cycle_code.length > 0 && valueResult){
      
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Confirmar si deseas guardar los datos de la configuración de la campaña ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
         
          const payload = {
            ...this.configurationCampaign,
            valueData: valueResult
          };

          console.log(payload);
          this.configurationCampaignsService.storeConfigurationCampaigns(payload).subscribe(
            (success: any) => {
                this.indexConfigurationCampaigns();
                this.alertSwal('success', '¡Acción Exitosa!', 'Creación de la configuración de la campaña exitosa, junto con los patrones horarios')
            },
            error => {
              
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
              this.alertSwal('error', '¡Acción Fallida!', mensaje);
            }
          )
        }else{
          this.alertSwal('warning', '¡Acción cancelada!', 'Creación de la configuración de la campaña cancelada.')
        }
      })
    }
  }

  /* onSubmit(){
    this.configurationCampaign.focus_ids = this.configurationCampaign.focus_ids ?? [];
    this.configurationCampaign.users_assigned = this.configurationCampaign.users_assigned ?? [];
    this.configurationCampaign.campaign_id = this.configurationCampaign.campaign_id ?? 0;
    this.configurationCampaign.cycle_code = this.configurationCampaign.cycle_code ?? [];

    if(this.configurationCampaign.user_interactions_min_count < this.configurationCampaign.user_interactions_max_count && this.configurationCampaign.users_assigned.length > 0 && this.configurationCampaign.campaign_id !== 0 && this.configurationCampaign.cycle_code.length > 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas guardar los datos de la configuracion de la campaña ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.configurationCampaignsService.storeConfigurationCampaigns(this.configurationCampaign).subscribe(
            (success: any) => {
                this.indexConfigurationCampaigns();
                this.alertSwal('success', '¡Accion Exitosa!', 'Creacion de la configuracion de la campaña exitosa.')
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Creacion de la configuracion de la campaña cancelada.')
        }
      })
    }
  } */

  assignUsers(id: number, event: any) {
    this.configurationCampaign.users_assigned = this.configurationCampaign.users_assigned ?? [];
    if (event.checked) {
        this.configurationCampaign.users_assigned.push(id);
    } else {
        const index = this.configurationCampaign.users_assigned.indexOf(id);
        if (index !== -1) {
            this.configurationCampaign.users_assigned.splice(index, 1);
        }
    }
  }

  assignCampaign(campaign:any, event: any){
    this.configurationCampaign.campaign_id = event.checked ? campaign.id : 0;
    this.assignment = event.checked ? true : false;

    this.dataTableUsers.alli_id = event.checked ? campaign.alli_id : 0;
    this.getUsers();
  }

  assignAssignment(id:number, event: any){
    this.configurationCampaign.assignment_id = this.configurationCampaign.assignment_id ?? [];
    if (event.checked) {
        this.configurationCampaign.assignment_id.push(id);
    } else {
        const index = this.configurationCampaign.assignment_id.indexOf(id);
        if (index !== -1) {
            this.configurationCampaign.assignment_id.splice(index, 1);
        }
    }
  }

  assignCycles(id: number, event: any) {
    this.configurationCampaign.cycle_code = this.configurationCampaign.cycle_code ?? [];
    if (event.checked) {
        this.configurationCampaign.cycle_code.push(id);
    } else {
        const index = this.configurationCampaign.cycle_code.indexOf(id);
        if (index !== -1) {
            this.configurationCampaign.cycle_code.splice(index, 1);
        }
    }
  }

  assignFocus(id:number, event: any){
    this.configurationCampaign.focus_ids = this.configurationCampaign.focus_ids ?? [];
    if (event.checked) {
        this.configurationCampaign.focus_ids.push(id);
    } else {
        const index = this.configurationCampaign.focus_ids.indexOf(id);
        if (index !== -1) {
            this.configurationCampaign.focus_ids.splice(index, 1);
        }
    }
  }

  indexConfigurationCampaigns(){
    this.router.navigate(['ConfigurationCampaigns']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  onPageChangeUser(event: any) {
    this.dataTableUsers.current_page = event.pageIndex + 1;
    this.dataTableUsers.perPage = event.pageSize;
    this.getUsers();
  }

  onPageChangeCampaign(event: any) {
    this.dataTableCampaign.current_page = event.pageIndex + 1;
    this.dataTableCampaign.perPage = event.pageSize;
    this.getCampaigns();
  }

  onPageChangeCycles(event: any) {
    this.dataTableCycles.current_page = event.pageIndex + 1;
    this.dataTableCycles.perPage = event.pageSize;
    this.getCycles();
  }

  onPageChangeFocus(event: any) {
    this.dataTableFocus.current_page = event.pageIndex + 1;
    this.dataTableFocus.perPage = event.pageSize;
    this.getFocus();
  }

  onPageChangeAssignment(event: any) {
    this.dataTableAssignment.current_page = event.pageIndex + 1;
    this.dataTableAssignment.perPage = event.pageSize;
    this.getAssignments();
  }
}
