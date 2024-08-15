import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Template/header/header.component';
import { FooterComponent } from './Template/footer/footer.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SecurityComponent } from './security/security.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TablerolesComponent } from './Views/roles/tableroles/tableroles.component';
import { TableusersComponent } from './Views/users/tableusers/tableusers.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CreaterolesComponent } from './Views/roles/createroles/createroles.component';
import { EditrolesComponent } from './Views/roles/editroles/editroles.component';
import { TablecampaignsComponent } from './Views/campaings/tablecampaigns/tablecampaigns.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TablecyclesComponent } from './Views/cycles/tablecycles/tablecycles.component';
import { CreatecyclesComponent } from './Views/cycles/createcycles/createcycles.component';
import { EditcyclesComponent } from './Views/cycles/editcycles/editcycles.component';
import { CreatecampaignsComponent } from './Views/campaings/createcampaigns/createcampaigns.component';
import { EditcampaignsComponent } from './Views/campaings/editcampaigns/editcampaigns.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { TableusersinactivesComponent } from './Views/users/tableusersinactives/tableusersinactives.component';
import { CreateusersComponent } from './Views/users/createusers/createusers.component';
import { EditusersComponent } from './Views/users/editusers/editusers.component';
import { AssignusersrolesandpermissionsComponent } from './Views/users/assignusersrolesandpermissions/assignusersrolesandpermissions.component';
import { EditconfigurationCampaigsComponent } from './Views/configuration_campaigns/editconfiguration-campaigs/editconfiguration-campaigs.component';
import { CreateconfigurationCampaigsComponent } from './Views/configuration_campaigns/createconfiguration-campaigs/createconfiguration-campaigs.component';
import { TableconfigurationCampaigsComponent } from './Views/configuration_campaigns/tableconfiguration-campaigs/tableconfiguration-campaigs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TablefocusComponent } from './Views/focus/tablefocus/tablefocus.component';
import { CreatefocusComponent } from './Views/focus/createfocus/createfocus.component';
import { EditfocusComponent } from './Views/focus/editfocus/editfocus.component';
import { TablepaymentsComponent } from './Views/payments/tablepayments/tablepayments.component';
import { CreatepaymentsComponent } from './Views/payments/createpayments/createpayments.component';
import { EditpaymentsComponent } from './Views/payments/editpayments/editpayments.component';
import { MasivepaymentsComponent } from './Views/payments/masivepayments/masivepayments.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CreateconfigurationUserComponent} from './Views/assigusercampaignconfiguration/createconfiguration-user/createconfiguration-user.component';
import { EditconfigurationUserComponent} from './Views/assigusercampaignconfiguration/editconfiguration-user/editconfiguration-user.component';
import { TableconfigurationUserComponent} from './Views/assigusercampaignconfiguration/tableconfiguration-user/tableconfiguration-user.component';
import { ModalPatternComponent } from './Views/configuration_campaigns/editconfiguration-campaigs/modal-pattern/modal-pattern.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RoutingComponents,
    SecurityComponent,
    TablerolesComponent,
    TableusersComponent,
    CreaterolesComponent,
    EditrolesComponent,
    TablecampaignsComponent,
    TablecampaignsComponent,
    TablecyclesComponent,
    CreatecyclesComponent,
    EditcyclesComponent,
    CreatecampaignsComponent,
    EditcampaignsComponent,
    TableusersinactivesComponent,
    CreateusersComponent,
    EditusersComponent,
    AssignusersrolesandpermissionsComponent,
    EditconfigurationCampaigsComponent,
    CreateconfigurationCampaigsComponent,
    TableconfigurationCampaigsComponent,
    TablefocusComponent,
    CreatefocusComponent,
    EditfocusComponent,
    TablepaymentsComponent,
    CreatepaymentsComponent,
    EditpaymentsComponent,
    MasivepaymentsComponent,
    CreateconfigurationUserComponent,
    EditconfigurationUserComponent,
    TableconfigurationUserComponent,
    ModalPatternComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
