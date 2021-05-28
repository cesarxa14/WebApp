import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCustomerComponent } from './components/home-customer/home-customer.component';
import { HomeEmployeeComponent } from './components/home-employee/home-employee.component';
import { LandingComponent} from './components/landing/landing.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: '' , component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home-customer', component: HomeCustomerComponent},
  {path: 'home-employee', component: HomeEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
