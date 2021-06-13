import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModules } from './material.modules';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeCustomerComponent } from './components/home-customer/home-customer.component';
import { HomeEmployeeComponent } from './components/home-employee/home-employee.component';
import { ModalDetalleAppointmentCComponent } from './components/modal-detalle-appointment-c/modal-detalle-appointment-c.component';
import { ModalDetalleAppointmentEComponent } from './components/modal-detalle-appointment-e/modal-detalle-appointment-e.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ModalEditProfileComponent } from './components/modal-edit-profile/modal-edit-profile.component'


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeCustomerComponent,
    HomeEmployeeComponent,
    ModalDetalleAppointmentCComponent,
    ModalDetalleAppointmentEComponent,
    ProfileComponent,
    ModalEditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDetalleAppointmentCComponent, ModalDetalleAppointmentEComponent, ModalEditProfileComponent]
})
export class AppModule { }
