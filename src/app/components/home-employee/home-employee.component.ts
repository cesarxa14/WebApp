import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AppointmentService} from '../../services/appointment.service';
import {MatDialog} from '@angular/material/dialog';
// import { ModalDetalleAppointmentComponent } from '../modal-detalle-appointment/modal-detalle-appointment.component';
import { ModalDetalleAppointmentEComponent } from '../modal-detalle-appointment-e/modal-detalle-appointment-e.component';
 

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
 
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  dataSource1 = [
    {
      titulo:'1',
      subtitulo:'sub1',
      desc_tag:'dtag1',
      editar:'e',
      eliminar:'el',
      foto_noticia:'que fox'
    }
  ]
  displayedColumns: string[] = ['firstname', 'lastname', 'fecha', 'address', 'status', 'details'];
  dataSource: any;
  constructor(private employeeService: EmployeeService,
              private appointmentService: AppointmentService,
              public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.metadata)
    this.appointmentService.getAppointmentByIDEmployee(this.metadata.id).subscribe(res=>{
      this.dataSource = res;
      console.log(res);
    })
  }

  verDetalles(element){
    console.log(element);
    const dialogRef = this.dialog.open(ModalDetalleAppointmentEComponent,{
      width: '1100px',
      height: '600px',
      data: element
      
    })
  }



}
