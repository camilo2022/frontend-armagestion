import { Component, ViewChild, OnInit } from '@angular/core';
import { AssigUserConfiguration } from 'src/app/Models/AssigUserCongfigurations/assiguserconfigurations';
import { AssiguserconfigurationService } from 'src/app/Service/api/assiguserconfiguration.service';
import { Users } from 'src/app/Models/User/users';
import { UsersService } from 'src/app/Service/api/users.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { CyclesService } from 'src/app/Service/api/cycles.service';

@Component({
  selector: 'app-createconfiguration-user',
  templateUrl: './createconfiguration-user.component.html',
  styleUrls: ['./createconfiguration-user.component.css']
})
export class CreateconfigurationUserComponent {

  AssigUserConfiguratio: AssigUserConfiguration = new AssigUserConfiguration();

  datosSelect: Object;
  usergetcoodin: any[];

  dataTable: any = {
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

  dataSource = new MatTableDataSource<AssigUserConfiguration>();
  displayedColumns: string[] = ['check','id', 'name', 'email'];

  dataSourceCycles = new MatTableDataSource<Cycles>();
  displayedColumnsCycles: string[] = ['check','cycle_name', 'cycle_start_date', 'cycle_end_date'];

selectedIds: Set<number> = new Set <number>();

    toggleSelection(id: number): void{
      if(this.selectedIds.has(id)){
    this.selectedIds.delete(id);
      }else{
    this.selectedIds.add(id);
      }
    }

  constructor(private AssiguserconfigurationService:AssiguserconfigurationService, private usersService:UsersService, private router:Router,private cyclesService:CyclesService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
 
   /*  this.dataSource.paginator = this.paginator;
    this.getassigUser(); */
  /*   this.getCycles(); */
 

  }

  getassigUser(){
    this.AssiguserconfigurationService.getAssigUserConfiguration(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          
          this.dataSource.data = response.data.configuration[0].usergetcoodin;
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
        /* this.alertSwal('error', 'Ooops..', mensaje) */
      }
    )
  }

 /*  assignUserCam(id: any, event: any) {
    this.AssigUserConfiguratio.user_id= this.AssigUserConfiguratio.user_id;
    if (event.checked) {
        this.AssigUserConfiguratio.usergetcoodin.push(id);
    } else {
        const index = this.AssigUserConfiguratio.usergetcoodin.indexOf(id);
        if (index !== -1) {
            this.AssigUserConfiguratio.usergetcoodin.splice(index, 1);
        }
    }
  } */

  /* getCycles(){
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
      
      }
    )
  } */



}
