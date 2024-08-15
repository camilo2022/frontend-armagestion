import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { CyclesService } from 'src/app/Service/api/cycles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablecycles',
  templateUrl: './tablecycles.component.html',
  styleUrls: ['./tablecycles.component.css']
})
export class TablecyclesComponent implements OnInit{

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
  displayedColumns: string[] = ['id', 'cycle_name', 'cycle_start_date', 'cycle_end_date'/* , 'editar','eliminar' */];

  constructor(private cyclesService:CyclesService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(){
    this.cyclesService.getCycles(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          // Asigna los datos al dataSource
          this.dataSource.data = response.data.cycles;
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
        this.alertSwal('error', 'Ooops...', mensaje);
      }
    )
  }

  searchCycles(){
    this.dataTable.current_page = 1;
    this.getCycles();
  }

  editCycle(id:number, cycle: Cycles) {
    this.router.navigate([`Cycles/Edit/${id}`], { state: { cycle } });
  }

  deleteCycle(cycle: Cycles){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el ciclo.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.cyclesService.deleteCycles(cycle).subscribe(
          data => {
            this.getCycles();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino el ciclo.');
          },
          error => {
            this.getCycles();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino el ciclo.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion del ciclo cancelada.');
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
    this.getCycles();
  }
}
