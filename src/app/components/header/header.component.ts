import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Se crea la variable metadata y se obtiene el valor desde el localStorage
  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.metadata)
  }

  //esta funcion se activa cuando le haces click en el boton home (linea 11 html)
  //mediante el metadata se verifica si el usuario es customer o employee para que muestre su respectiva información
  toHomePage(){
    if(this.metadata.userType == 1){
      this.router.navigateByUrl('/home-customer')
    } else {
      this.router.navigateByUrl('/home-employee')
    }
  }

  //esta funcion es para cerrar sesion
  //se borra el elemento metadata del localStorage
  //y despues de eso se manda denuevo a la vista del login
  logout(){
    localStorage.removeItem('metadata');
    this.router.navigateByUrl('/login');
  }

}
