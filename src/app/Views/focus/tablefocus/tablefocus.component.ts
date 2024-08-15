import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Focus } from 'src/app/Models/Focus/focus';
import { FocusService } from 'src/app/Service/api/focus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablefocus',
  templateUrl: './tablefocus.component.html',
  styleUrls: ['./tablefocus.component.css']
})
export class TablefocusComponent implements OnInit {

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  dataSource = new MatTableDataSource<Focus>();
  displayedColumns: string[] = ['id', 'focus_name', 'focus_description'/* , 'editar', 'eliminar' */];

  constructor(private focusService:FocusService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getFocus();
  }

  getFocus(){
    this.focusService.getFocus(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSource.data = response.data.focus;
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

  searchFocus(){
    this.dataTable.current_page = 1;
    this.getFocus();
  }

  editFocus(id:number, focus: Focus) {
    this.router.navigate([`Focus/Edit/${id}`], { state: { focus } });
  }

  deleteFocus(focus: Focus){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el foco.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.focusService.deleteFocus(focus).subscribe(
          data => {
            this.getFocus();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino el foco.');
          },
          error => {
            this.getFocus();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino el foco.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion del foco cancelada.');
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
    this.getFocus();
  }
}
