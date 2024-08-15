import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ApiService} from '../../Service/api/api.service';
import { LogoutI } from '../../Models/User/Logout.interface';

import { Router } from '@angular/router'
import { ResponseI } from 'src/app/Models/User/response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userLoginOn=false;
  userData?:ResponseI;
  LogoutForm = new FormGroup({
    user_id : new FormControl('', Validators.required)
  })
  roles: string[] = [];
  permissions: string[] = [];

  constructor( private api:ApiService, private router:Router){
    this.api.loadUserRolesAndPermissions(localStorage.getItem('id'), localStorage.getItem('token')).subscribe(
      data => {
        for (let i = 0; i < data.data.roles.length; i++) {
          this.roles.push(data.data.roles[i].name)
          for (let j = 0; j < data.data.roles[i].permissions.length; j++) {
            this.permissions.push(data.data.roles[i].permissions[j].name)
          }
        }
      }
    );
  }




  ngOnInit(): void{

     }

    /*  Logout(){
      let userLogout:LogoutI;
      userLogout={
        user_id:1
      };
        this.api.LogoutUser(userLogout).subscribe( res =>{
          console.log(res);
        })
     } */

    Logout(){
      this.api.Logout();
    }

}
