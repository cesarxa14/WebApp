import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalDetailCustomerComponent } from '../modal-detail-customer/modal-detail-customer.component';


@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  listCustomers: any[];
  constructor(private customerService: CustomerService,
              public dialog: MatDialog) { }

  hide = true;
  ngOnInit() {
    this.customerService.getAllCustomers().subscribe((res:any)=>{
      this.listCustomers = res;
    })
    
  }

  abrirModalDetail(customer){
    const dialogRef = this.dialog.open(ModalDetailCustomerComponent, {
      width: '900px',
      height: '600px',
      data: customer
    })
  }

}
