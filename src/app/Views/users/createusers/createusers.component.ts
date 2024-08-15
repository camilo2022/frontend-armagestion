import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { DataTable } from 'src/app/Models/DataTable/data-table';
import { Users } from 'src/app/Models/User/users';
import { ConfigurationCampaignsService } from 'src/app/Service/api/configuration-campaigns.service';
import { UsersService } from 'src/app/Service/api/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createusers',
  templateUrl: './createusers.component.html',
  styleUrls: ['./createusers.component.css']
})
export class CreateusersComponent implements OnInit{

  user: Users = new Users();
  passwordMismatch = false;

  dataSource = new MatTableDataSource<Campaigns>();
  displayedColumns: string[] = ['select', 'campaigns','focus'];

  constructor(private usersService:UsersService,  private router:Router, private configurationCampaignsService:ConfigurationCampaignsService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { }

  checkPasswordConfirmation() {
    this.passwordMismatch = this.user.password !== this.user.password_confirmation;
  }

  onSubmit(){
    if(!this.passwordMismatch){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas guardar los datos del usuario ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.usersService.storeUsers(this.user).subscribe(
            (success: any) => {
                this.indexUsers();
                this.alertSwal('success', '¡Accion Exitosa!', 'Creacion del usuario exitosa.');
            },
            error => {
              // Manejo de errores aquí
              let mensaje = 'Se encontraron errores:\n';
              if(error.error.errors){
                for (const campo in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(campo)) {
                    const mensajes = error.error.errors[campo];
                    for (const mensajeError of mensajes) {
                      mensaje += `${mensajeError}`;
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Creacion del usuario cancelada.');
        }
      })
    }
  }

  indexUsers(){
    this.router.navigate(['Users']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Verificar si el valor ingresado no cumple con el patrón y limpiarlo
    if (!/^[0-9]{20}$/.test(inputValue)) {
      input.value = inputValue.replace(/[^0-9]/g, '').substring(0, 20);
    }
  }
}
