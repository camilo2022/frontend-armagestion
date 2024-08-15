import { Component, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from '../Service/api/api.service';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})

@Injectable({ providedIn: 'root'})
export class SecurityComponent implements CanActivate{

constructor( private route: Router, private api: ApiService){

}

canActivate(route: ActivatedRouteSnapshot) {

  if(localStorage.getItem('token')){
    return true;
  }

  this.route.navigate(['/login']);
  return false;

}

}
