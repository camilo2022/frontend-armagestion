import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { SecurityComponent } from './security/security.component';
import { CreaterolesComponent } from './Views/roles/createroles/createroles.component';
import { TablerolesComponent } from './Views/roles/tableroles/tableroles.component';
import { EditrolesComponent } from './Views/roles/editroles/editroles.component';
import { TablecampaignsComponent } from './Views/campaings/tablecampaigns/tablecampaigns.component';
import { TablecyclesComponent } from './Views/cycles/tablecycles/tablecycles.component';
import { CreatecyclesComponent } from './Views/cycles/createcycles/createcycles.component';
import { EditcyclesComponent } from './Views/cycles/editcycles/editcycles.component';
import { TableusersComponent } from './Views/users/tableusers/tableusers.component';
import { CreatecampaignsComponent } from './Views/campaings/createcampaigns/createcampaigns.component';
import { EditcampaignsComponent } from './Views/campaings/editcampaigns/editcampaigns.component';
import { TableusersinactivesComponent } from './Views/users/tableusersinactives/tableusersinactives.component';
import { CreateusersComponent } from './Views/users/createusers/createusers.component';
import { EditusersComponent } from './Views/users/editusers/editusers.component';
import { AssignusersrolesandpermissionsComponent } from './Views/users/assignusersrolesandpermissions/assignusersrolesandpermissions.component';
import { TableconfigurationCampaigsComponent } from './Views/configuration_campaigns/tableconfiguration-campaigs/tableconfiguration-campaigs.component';
import { CreateconfigurationCampaigsComponent } from './Views/configuration_campaigns/createconfiguration-campaigs/createconfiguration-campaigs.component';
import { EditconfigurationCampaigsComponent } from './Views/configuration_campaigns/editconfiguration-campaigs/editconfiguration-campaigs.component';
import { TablefocusComponent } from './Views/focus/tablefocus/tablefocus.component';
import { CreatefocusComponent } from './Views/focus/createfocus/createfocus.component';
import { EditfocusComponent } from './Views/focus/editfocus/editfocus.component';
import { MasivepaymentsComponent } from './Views/payments/masivepayments/masivepayments.component';
import { TablepaymentsComponent } from './Views/payments/tablepayments/tablepayments.component';
import { CreatepaymentsComponent } from './Views/payments/createpayments/createpayments.component';
import { EditpaymentsComponent } from './Views/payments/editpayments/editpayments.component';
import { CreateconfigurationUserComponent} from './Views/assigusercampaignconfiguration/createconfiguration-user/createconfiguration-user.component';
import { EditconfigurationUserComponent} from './Views/assigusercampaignconfiguration/editconfiguration-user/editconfiguration-user.component';
import { TableconfigurationUserComponent} from './Views/assigusercampaignconfiguration/tableconfiguration-user/tableconfiguration-user.component';

const routes: Routes = [

  {path:'', redirectTo:'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent },
  {path:'dashboard', component: DashboardComponent, canActivate:[SecurityComponent]},

  {path:'Roles', component: TablerolesComponent, canActivate:[SecurityComponent]},
  {path:'Roles/Create', component: CreaterolesComponent, canActivate:[SecurityComponent]},
  {path:'Roles/Edit/:id', component: EditrolesComponent, canActivate:[SecurityComponent]},

  {path:'Campaigns', component: TablecampaignsComponent, canActivate:[SecurityComponent]},
  {path:'Campaigns/Create', component: CreatecampaignsComponent, canActivate:[SecurityComponent]},
  {path:'Campaigns/Edit/:id', component: EditcampaignsComponent, canActivate:[SecurityComponent]},

  {path:'Cycles', component: TablecyclesComponent, canActivate:[SecurityComponent]},
  {path:'Cycles/Create', component: CreatecyclesComponent, canActivate:[SecurityComponent]},
  {path:'Cycles/Edit/:id', component: EditcyclesComponent, canActivate:[SecurityComponent]},

  {path:'Focus', component: TablefocusComponent, canActivate:[SecurityComponent]},
  {path:'Focus/Create', component: CreatefocusComponent, canActivate:[SecurityComponent]},
  {path:'Focus/Edit/:id', component: EditfocusComponent, canActivate:[SecurityComponent]},

  {path:'Users', component: TableusersComponent, canActivate:[SecurityComponent]},
  {path:'Users/Inactives', component: TableusersinactivesComponent, canActivate:[SecurityComponent]},
  {path:'Users/Create', component: CreateusersComponent, canActivate:[SecurityComponent]},
  {path:'Users/Edit/:id', component: EditusersComponent, canActivate:[SecurityComponent]},
  {path:'Users/AssignRoleAndPermissions', component: AssignusersrolesandpermissionsComponent, canActivate:[SecurityComponent]},

  {path:'ConfigurationCampaigns', component: TableconfigurationCampaigsComponent, canActivate:[SecurityComponent]},
  {path:'ConfigurationCampaigns/Create', component: CreateconfigurationCampaigsComponent, canActivate:[SecurityComponent]},
  {path:'ConfigurationCampaigns/Edit/:id', component: EditconfigurationCampaigsComponent, canActivate:[SecurityComponent]},

  {path:'Payments', component: TablepaymentsComponent, canActivate:[SecurityComponent]},
  {path:'Payments/Create', component: CreatepaymentsComponent, canActivate:[SecurityComponent]},
  {path:'Payments/Edit/:id', component: EditpaymentsComponent, canActivate:[SecurityComponent]},
  {path:'Payments/Masive', component: MasivepaymentsComponent, canActivate:[SecurityComponent]},

  {path:'AssigUserCampaign', component: TableconfigurationUserComponent, canActivate:[SecurityComponent]},
  {path:'AssigUserCampaign/Create', component: CreateconfigurationUserComponent, canActivate:[SecurityComponent]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }

 export const RoutingComponents = [LoginComponent,DashboardComponent]
