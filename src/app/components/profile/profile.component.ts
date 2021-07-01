import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CustomerService } from '../../services/customer.service';
import { ModalEditProfileComponent } from '../modal-edit-profile/modal-edit-profile.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              public dialog: MatDialog) { }

  progress_bar: boolean = false;
  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  user:any;
  data:any;
  ngOnInit() {
    this.progress_bar = true;
    if(this.metadata.userType == 1){
      this.customerService.getCustomerByIdAccount(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.progress_bar = false;
        this.user = {
          firstName: res.firstName,
          lastName: res.lastName,
          cellphone: res.cellphone,
          email: res.email,
          username: res.account.username,
          city: res.district.city.name,
          district: res.district.name,
          dni: res.dni
        }
      })
    }
    else if(this.metadata.userType == 2){
      this.employeeService.getEmployeeByIdAccount(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.progress_bar = false;
        //en esta variable guardaran los datos para que los muestre en el html
        this.user = {
          firstName: res.firstName,
          lastName: res.lastName,
          cellphone: res.cellphone,
          email: res.email,
          username: res.account.username,
          city: res.district.city.name,
          district: res.district.name,
          dni: res.dni,
          birthday: res.birthday,
          specialty: res.specialty.name
        }
      })
    }
  }

  //esta funcion abrira el modal para editar el perfil
  abrirModalEditar(){
    // se abrira en un modal lo que hay en el componente ModalEditProfileComponent
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '650px',
      //se envia al componente ModalEditProfileComponent el user y la metadata como data inyectable
      data: {user: this.data, metadata: this.metadata}
    })

    //aca se recibe la data despues de haberla editado en el componente ModalEditProfileComponent
    dialogRef.componentInstance.edit.subscribe(data =>{
      
      if(this.metadata.userType == 1) {
        this.user = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          cellphone: data.user.cellphone,
          email: data.user.email,
          city: data.city.name,
          district: data.district.name,
          dni: data.user.dni
        }
      } else if(this.metadata.userType == 2) {
        this.user = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          cellphone: data.user.cellphone,
          email: data.user.email,
          city: data.city.name,
          district: data.district.name,
          dni: data.user.dni,
          birthday: data.user.birthday,
          specialty: data.specialty.name
        }
      }
     
    })
  }

}
