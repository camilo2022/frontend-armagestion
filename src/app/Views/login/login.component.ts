import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../Service/api/api.service';
import { Router } from '@angular/router'
import { Login } from 'src/app/Models/User/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  login: Login = new Login();
  errorEmail: boolean = false;
  errorPassword: boolean = false;

  constructor( private api:ApiService, private router:Router){}

  ngOnInit(): void {
     this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {

    this.api.LoginUser(this.login).subscribe(
      (response: any) => {
        if(response.user){
          localStorage.setItem("token", response.token);
          localStorage.setItem("id", response.user.id.toString());
          this.router.navigateByUrl('dashboard');
        }else{
          if(response.message){
            this.errorEmail = true;
            this.errorPassword = false;
          }else if(!response.success){
            this.errorEmail = false;
            this.errorPassword = true;
          }
        }
      },
      error => {
        if(error.error){
          if(error.error.errors.password){
            this.errorEmail = false;
            this.errorPassword = true;
          }
        }
      }
    )
  }
}
