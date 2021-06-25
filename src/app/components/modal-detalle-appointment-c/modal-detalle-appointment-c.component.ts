import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-appointment-c',
  templateUrl: './modal-detalle-appointment-c.component.html',
  styleUrls: ['./modal-detalle-appointment-c.component.css']
})
export class ModalDetalleAppointmentCComponent implements OnInit {

  //esta variable data se inyecta desde la llamada de la funcion verDetalles
  //esta variable data es un appointment con todos sus atributos
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }

}
