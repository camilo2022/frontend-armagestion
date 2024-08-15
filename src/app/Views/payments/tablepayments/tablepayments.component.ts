import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Payments } from 'src/app/Models/Payments/payments';
import { PaymentsService } from 'src/app/Service/api/payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablepayments',
  templateUrl: './tablepayments.component.html',
  styleUrls: ['./tablepayments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TablepaymentsComponent implements OnInit {

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  user:Payments = new Payments();

  dataSource = new MatTableDataSource<Payments>();
  displayedColumns: string[] = ['id', 'account', 'value', 'date', 'campaign', 'cycle', 'editar', 'eliminar'];
  expandDisplayedColumns = [...this.displayedColumns, 'expand'];
  expandedElement: Payments | null;

  constructor(private paymentsService:PaymentsService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(){
    this.paymentsService.getPayments(this.dataTable, this.dataTable.current_page).subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSource.data = response.data.payments;
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

  searchPayments(){
    this.dataTable.current_page = 1;
    this.getPayments();
  }

  editPayments(id:number, payments: Payments){
    this.router.navigate([`Payments/Edit/${id}`], { state: { payments } });
  }

  deletePayments(payments: Payments){
    console.log(payments)
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el pago.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.paymentsService.deletePayments(payments).subscribe(
          data => {
            this.getPayments();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino el pago.');
          },
          error => {
            this.getPayments();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino el pago.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion del pago cancelada.');
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
    this.getPayments();
  }
}
