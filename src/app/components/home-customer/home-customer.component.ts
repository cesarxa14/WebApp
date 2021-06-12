import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AppointmentService} from '../../services/appointment.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalDetalleAppointmentCComponent } from '../modal-detalle-appointment-c/modal-detalle-appointment-c.component';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  displayedColumns: string[] = ['firstname', 'lastname', 'fecha', 'address', 'status', 'details'];
  dataSource: any;
  constructor(private employeeService: EmployeeService,
              private appointmentService: AppointmentService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.appointmentService.getAppointmentByIDCustomer(this.metadata.id).subscribe(res=>{
      console.log('citas customer', res);
      this.dataSource = res;
    })
    
  }
  verDetalles(element){
    console.log(element);
    const dialogRef = this.dialog.open(ModalDetalleAppointmentCComponent,{
      width: '1100px',
      height: '600px',
      data: element
      
    })
  }

}
