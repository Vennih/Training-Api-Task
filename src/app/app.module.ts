import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserlistfullComponent } from './userlistfull/userlistfull.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { ViewPopupComponent } from './view-popup/view-popup.component';
import {TextFieldModule} from '@angular/cdk/text-field';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'userlistfull', component: UserlistfullComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'edituser', component: PopupComponent },
  { path: 'viewuser', component: ViewPopupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    AddUserComponent,
    UserlistfullComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule, MatCheckboxModule, MatSortModule,
    AppRoutingModule, MatInputModule, MatSelectModule,
    NgbModule, RouterModule.forRoot(routes), HttpClientModule,
    DataTablesModule, MatTableModule, BrowserAnimationsModule,
    MatSidenavModule, MatPaginatorModule, MatFormFieldModule, MatButtonModule,
    FormsModule, MatIconModule, MatListModule, MatToolbarModule,
    MatDialogModule,TextFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
