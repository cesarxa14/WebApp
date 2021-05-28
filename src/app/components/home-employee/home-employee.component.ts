import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
 

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {

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
  displayedColumns: string[] = ['firstname', 'lastname', 'dni', 'address', 'email', 'birthday'];
  dataSource: any;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(res=>{
      console.log(res);
      this.dataSource = res;

    })
  }



}
