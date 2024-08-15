import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assignments } from 'src/app/Models/Assignment/assignments';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { ConfigurationCampaigns } from 'src/app/Models/ConfigurationCampaign/configuration-campaigns';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { Focus } from 'src/app/Models/Focus/focus';
import { Users } from 'src/app/Models/User/users';
import { AssignmentsService } from 'src/app/Service/api/assignments.service';
import { CampaignsService } from 'src/app/Service/api/campaigns.service';
import { ConfigurationCampaignsService } from 'src/app/Service/api/configuration-campaigns.service';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import { FocusService } from 'src/app/Service/api/focus.service';
import { UsersService } from 'src/app/Service/api/users.service';
import { PatternsTime } from 'src/app/Models/TimePatterns/Timepattern';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editconfiguration-campaigs',
  templateUrl: './editconfiguration-campaigs.component.html',
  styleUrls: ['./editconfiguration-campaigs.component.css']
})
export class EditconfigurationCampaigsComponent {

  isDialogShow: boolean = false;
  checkBoxValue: boolean = true;
  selectedItem: any;

  selectElement(element: any) {
    const allConfigurations = this.configurationCampaign.id;
    this.selectedItem = allConfigurations;
  }


  configurationCampaign: ConfigurationCampaigns = {
    id: history.state.configurationCampaign.id,
    cycle_code: history.state.configurationCampaign.cycle_code,
    user_interactions_min_count: history.state.configurationCampaign.user_interactions_min_count,
    user_interactions_max_count: history.state.configurationCampaign.user_interactions_max_count,
    effectiveness_percentage: history.state.configurationCampaign.effectiveness_percentage,
    payment_agreement_percentage: history.state.configurationCampaign.payment_agreement_percentage,
    payment_agreement_true_percentage: history.state.configurationCampaign.payment_agreement_true_percentage,
    type_service_percentage: history.state.configurationCampaign.type_service_percentage,
    campaign_id: history.state.configurationCampaign.campaign ? history.state.configurationCampaign.campaign.id : 0 ,
    focus_ids: history.state.configurationCampaign.focus.map((foal: Focus) => foal.id),
    assignment_id: history.state.configurationCampaign.assignments.map((assignment: Assignments) => assignment.id),
    users_assigned: history.state.configurationCampaign.users.map((user: Users) => user.id),
    date: new Date(),user_id: history.state.configurationCampaign.user_id,
    usergetcoodin: history.state.configurationCampaign.usergetcoodin.map((user: Users) => user.id),
    userCoordinador_id: history.state.configurationCampaign.userCoordinador_id.map((user: Users) => user.id),
    confirmation_block_fija: history.state.configurationCampaign.confirmation_block_fija,
    confirmation_block_movil: history.state.configurationCampaign.confirmaction_block_movil,
    timePatterns:history.state.configurationCampaign.timePatterns,
    timePatterns_1: history.state.configurationCampaign.timePatterns_1,
    timePatterns_2: history.state.configurationCampaign.timePatterns_2,
    timePatterns_3: history.state.configurationCampaign.timePatterns_3,
  };

  users_assigned: number[] = history.state.configurationCampaign.users.map((user: Users) => user.id)
  assignment: boolean = this.configurationCampaign.assignment_id.length > 0;
  unsigned: boolean = false;

  dataTableUsers: any = {
    configuration_id: this.configurationCampaign.id,
    campaign_id: history.state.configurationCampaign.campaign ? history.state.configurationCampaign.campaign.id : 0,
    role: 'Gestor',
    alli_id: history.state.configurationCampaign.campaign ? history.state.configurationCampaign.campaign.alli_id : 0,
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
    camp_id: this.configurationCampaign.campaign_id
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

  dataTablePatternTime: any = {
    search: '',
    perPage: 100,
    total: 0,
    count: 0,
    current_page: 1,
    total_pages: 0
  }

  dataTablePatternTime2: any = {
    search: '',
    perPage: 100,
    total: 0,
    count: 0,
    current_page: 1,
    total_pages: 0
  }

  dataTablePatternTime3: any = {
    search: '',
    perPage: 100,
    total: 0,
    count: 0,
    current_page: 1,
    total_pages: 0
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
  displayedColumnsUsersCoordinador: string[] = ['check', 'id', 'name', 'email'];

  dataSourcePatternTime = new MatTableDataSource<ConfigurationCampaigns>();
  displayedColumnsPatternTime:   string[] = ['id_function','id_configurations','objects_08_in_13','objects_08_in_14','objects_8_in_10','objects_11_in_13','objects_12_in_13','objects_13_in_17','objects_15_in_16','objects_15_in_18','objects_16_in_17','objects_16_in_17_50'];

  dataSourcePatternTime2 = new MatTableDataSource<ConfigurationCampaigns>();
  displayedColumnsPatternTime_2: string[] = ['id_function','id_configurations','objects_08_in_13','objects_08_in_14','objects_8_in_10','objects_11_in_13','objects_12_in_13','objects_13_in_17','objects_15_in_16','objects_15_in_18','objects_16_in_17','objects_16_in_17_50'];

  dataSourcePatternTime3 = new MatTableDataSource<ConfigurationCampaigns>();
  displayedColumnsPatternTime_3: string[] = ['id_function','id_configurations','objects_08_in_13','objects_08_in_14','objects_8_in_10','objects_11_in_13','objects_12_in_13','objects_13_in_17','objects_15_in_16','objects_15_in_18','objects_16_in_17','objects_16_in_17_50'];

  constructor(private configurationCampaignsService:ConfigurationCampaignsService, private campaignsService:CampaignsService, private focusService:FocusService, private usersService:UsersService, private cyclesService:CyclesService, private assignmentsService:AssignmentsService, private router:Router) {

    this.configurationCampaign.timePatterns = this.configurationCampaign.timePatterns || {} as PatternsTime;
  }

  ngOnInit(): void {

    this.selectElement(this.selectedItem);
    this.getAssignments();
    this.getUsers();
    this.getCampaigns();
    this.getCycles();
    this.getFocus();
    this.getConfigurationUser();
    this.getConfigurationTimePattern();
    this.getConfigurationTimePattern_2();
    this.getConfigurationTimePattern_3();

  }


  openDialog(field: string, item: any) {
    this.selectedItem = {
      field: field,
      id_function: item.id_function,
      id_configurations: item.id_configurations,
      ...JSON.parse(item[field])
    };
    this.isDialogShow = true;
  }


  closeDialog() {
    this.isDialogShow = false;
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

  getConfigurationTimePattern(){
    this.configurationCampaignsService.getConfigurationCampaigns(this.dataTablePatternTime, this.dataTablePatternTime.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {

          const allConfigurations = this.configurationCampaign.id;
          console.log(allConfigurations);
          const timePatterns_1 = response.data.configurations;

          console.log(timePatterns_1);

          for (let i = 0; i < timePatterns_1.length; i++) {
            if(timePatterns_1[i].id === allConfigurations){
              console.log(timePatterns_1[i].id);
              this.dataSourcePatternTime.data = timePatterns_1[i].timePatterns_1;
              this.dataTablePatternTime.total = response.data.meta.pagination.total;
              this.dataTablePatternTime.count = response.data.meta.pagination.count;
              this.dataTablePatternTime.per_page = response.data.meta.pagination.per_page;
              this.dataTablePatternTime.current_page = response.data.meta.pagination.current_page;
              this.dataTablePatternTime.total_pages = response.data.meta.pagination.total_pages;

            }

          }
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

  getConfigurationTimePattern_2() {
    this.configurationCampaignsService.getConfigurationCampaigns(this.dataTablePatternTime2, this.dataTablePatternTime2.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          const allConfigurations2 = this.configurationCampaign.id;
          const timePatterns_2 = response.data.configurations;

          for (let i = 0; i < timePatterns_2.length; i++) {
            if(timePatterns_2[i].id === allConfigurations2){

              this.dataSourcePatternTime2.data = timePatterns_2[i].timePatterns_2;
              this.dataTablePatternTime.total = response.data.meta.pagination.total;
              this.dataTablePatternTime.count = response.data.meta.pagination.count;
              this.dataTablePatternTime.current_page = response.data.meta.pagination.current_page;
              this.dataTablePatternTime.total_pages = response.data.meta.pagination.total_pages;

            }

          }

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
        this.alertSwal('error', 'Ooops..', mensaje);
      }
    );
  }

  getConfigurationTimePattern_3() {
    this.configurationCampaignsService.getConfigurationCampaigns(this.dataTablePatternTime3, this.dataTablePatternTime3.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {

          const allConfigurations3 = this.configurationCampaign.id;
          const timePatterns_3 = response.data.configurations;

          for (let i = 0; i < timePatterns_3.length; i++) {
            if(timePatterns_3[i].id === allConfigurations3){

              this. dataSourcePatternTime3.data = timePatterns_3[i].timePatterns_3;
              this.dataTablePatternTime.total = response.data.meta.pagination.total;
              this.dataTablePatternTime.count = response.data.meta.pagination.count;
              this.dataTablePatternTime.current_page = response.data.meta.pagination.current_page;
              this.dataTablePatternTime.total_pages = response.data.meta.pagination.total_pages;

            }

          }

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
        this.alertSwal('error', 'Ooops..', mensaje);
      }
    );
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
    this.configurationCampaign.focus_ids = this.configurationCampaign.focus_ids ?? [];
    this.configurationCampaign.users_assigned = this.configurationCampaign.users_assigned ?? [];
    this.configurationCampaign.user_id = this.configurationCampaign.userCoordinador_id?? [];
    this.configurationCampaign.campaign_id = this.configurationCampaign.campaign_id ?? 0;
    this.configurationCampaign.cycle_code = this.configurationCampaign.cycle_code ?? [];

    if(this.configurationCampaign.user_interactions_min_count < this.configurationCampaign.user_interactions_max_count && this.configurationCampaign.users_assigned.length > 0 && this.configurationCampaign.campaign_id !== 0 && this.configurationCampaign.cycle_code.length > 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas actualizar los datos de la configuracion de la campaña ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.configurationCampaignsService.updateConfigurationCampaigns(this.configurationCampaign.id, this.configurationCampaign).subscribe(
            (success: any) => {
                this.indexConfigurationCampaigns();
                this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion de la configuracion de la campaña exitosa.')
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion de la configuracion de la campaña cancelada.')
        }
      })
    }
  }

  onSubmitPatternTime() {
    const { id_function, id_configurations, field, ...data } = this.selectedItem;
    const updatedValue = JSON.stringify(data);

    // Mostrar SweetAlert de confirmación antes de enviar la actualización
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar el patrón de tiempo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Llamar a la función de actualización si se confirma
            this.updatePatternTime(id_function, id_configurations, field, updatedValue);

            this.alertSwal('success', '¡Acción Exitosa!', 'Se actualizo exitosamente el patron de horario.');

            /* this.closeDialog(); */
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.alertSwal('warning', '¡Acción Cancelada!', 'Actualización del patron horario cancelado.');
        }
    });
}

  updatePatternTime(id_function: number, id_configurations: number, field: string, value: string): void {
    // Parsea el valor JSON en un objeto JavaScript
    const data = JSON.parse(value);

         const convertToType = (value: any, type: string) => {
           if (type === 'number') {
               return Number(value);
           } else if (type === 'string') {
               return String(value);
           } else {
               return value;
           }
       };
    // Crea un nuevo objeto con las claves y valores esperados
     const valueObject = {
       no_efectiva_1: data.no_efectiva_1 !== null ? convertToType(data.no_efectiva_1, 'number') : null,
       no_efectiva_2: data.no_efectiva_2 !== null ? convertToType(data.no_efectiva_2, 'number') : null,
       efectiva: data.efectiva !== null ? convertToType(data.efectiva, 'number') : null,
       promesa: data.promesa !== null ? convertToType(data.promesa, 'number') : null,
     };

    const payload = {
      function_id: id_function,
      configuration_id: id_configurations,
      horaPattern: field,
      value: JSON.stringify(valueObject) // Serializa el objeto como una cadena JSON
    };

    this.configurationCampaignsService.updatePatternTime(id_configurations, payload, field).subscribe(response => {
      console.log('Update successful', response);
      location.reload();
    }, error => {
      console.error('Update failed', error);
    });
  }



  reloadPatternTime(id_configuration: number | { id_configurations: number }): void {
    let idConfigurations: number;

    if (typeof id_configuration === 'number') {
      // Si es un número, simplemente asignamos ese valor
      idConfigurations = id_configuration;
    } else if (typeof id_configuration === 'object' && 'id_configurations' in id_configuration) {
      // Si es un objeto y tiene la propiedad id_configurations, extraemos ese valor
      idConfigurations = id_configuration.id_configurations;
    } else {
      // Manejo de error: el valor proporcionado no es válido
      console.error('Valor no válido para id_configuration:', id_configuration);
      return;
    }

    console.log('Valor de id_configurations:', idConfigurations);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirmar si deseas reiniciar los patrones de horarios.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Reiniciar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.configurationCampaignsService.reloadPatternTime(idConfigurations).subscribe(
          (success: any) => {
            this.alertSwal('success', '¡Acción Exitosa!', 'Se reinició el patrón de horario de forma exitosa.');
            location.reload();
          },
          (error) => {
            let errorMessage = 'Se encontraron errores:\n';
            if (error.error.errors) {
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  errorMessage += `${campo}:\n`;

                  for (const mensajeError of mensajes) {
                    errorMessage += `- ${mensajeError}\n`;
                  }
                }
              }
            } else {
              errorMessage += error.error.message;
            }
            this.alertSwal('error', '¡Acción Fallida!', errorMessage);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.alertSwal('warning', '¡Acción Cancelada!', 'Actualización del patrón horario cancelada.');
      }
    });
  }

  assignedUsers(event: any) {
    this.configurationCampaign.users_assigned = event.checked ? [] : this.users_assigned;
    this.unsigned = event.checked ? true : false;
  }

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
    this.configurationCampaign.campaign_id = event.checked ? campaign.id : 0;
    this.dataTableUsers.alli_id = event.checked ? campaign.alli_id : 0;
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

  isInvalid(field: string): boolean {
    if (field === 'no_efectiva_1') {
      return this.selectedItem.no_efectiva_1 === null || this.selectedItem.no_efectiva_1 === '';
    }

    if (field === 'no_efectiva_2') {
      return this.selectedItem.no_efectiva_2 === null || this.selectedItem.no_efectiva_2 === '';
    }

    if (field === 'efectiva') {
      return this.selectedItem.efectiva === null || this.selectedItem.efectiva === '';
    }

    if (field === 'promesa') {
      return this.selectedItem.promesa === null || this.selectedItem.promesa === '';
    }
    return false;
  }

  isComparisonInvalid(): boolean {
    const value1 = parseFloat(this.selectedItem.no_efectiva_1);
    const value2 = parseFloat(this.selectedItem.no_efectiva_2);
    const valueData = value1 > value2;
    return valueData;
  }

}
