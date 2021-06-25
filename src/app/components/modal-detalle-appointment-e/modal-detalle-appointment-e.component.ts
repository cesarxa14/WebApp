import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-appointment-e',
  templateUrl: './modal-detalle-appointment-e.component.html',
  styleUrls: ['./modal-detalle-appointment-e.component.css']
})
export class ModalDetalleAppointmentEComponent implements OnInit {

  //esta variable data se inyecta desde la llamada de la funcion verDetalles
  //esta variable data es un appointment con todos sus atributos
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('raaa',this.data)
  }

}
