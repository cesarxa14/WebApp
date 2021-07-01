import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetailEmployeeComponent } from '../modal-detail-employee/modal-detail-employee.component';
import { ModalCreateAppointmentComponent } from '../modal-create-appointment/modal-create-appointment.component';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  progress_bar: boolean = false;
  listEmployees: any[];
  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.progress_bar = true;
    this.employeeService.getAllEmployees().subscribe((res:any)=>{
      this.progress_bar = false;
      this.listEmployees = res;
      console.log('employees', res)
    })
  }

  abrirModalDetail(employee){
    const dialogRef = this.dialog.open(ModalDetailEmployeeComponent, {
      width: '900px',
      height: '600px',
      data: employee
    })
  }

  abrirModalCreateAppo(employee){
    const dialogRef = this.dialog.open(ModalCreateAppointmentComponent, {
      width: '900px',
      height: '500px',
      data: employee
    })

  }

}
