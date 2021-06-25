import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from '../../models/account';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: Account = {
    username:'',
    password:'',
    typeuser:''
  };
  loginForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.loginForm = this._builderForm();
    
  }

  //Aqui se definen los formControlName (campos) que formaran parte del formulario
  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      usuario: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required]]
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
     /**Getters */
     get usuario() { return this.loginForm.controls['usuario']; }
     get password() { return this.loginForm.controls['password']; }

  //funcion para iniciar sesion
  login(){
    // this.account.username = this.usuario.value;
    // this.account.password = this.password.value;
    let obj = {
      username: this.usuario.value,
      password: this.password.value
    }
    //se manda como json el usuario y el password
    this.authService.login(obj).subscribe(res=>{
      //se guarda los datos de la cuenta en el localStorage
      localStorage.setItem('metadata', JSON.stringify(res))
      if(res.userType == 1) { // si el userType es 1, es un usuario customer y se redireccion a home-customer
        this.router.navigateByUrl('/home-customer');
      } else if(res.userType == 2) { // si el userType es 2, es un usuario employee y se redireccion a home-employee
        this.router.navigateByUrl('/home-employee');
      }
      console.log(res);
    })
    console.log(this.account.username, this.account.password)
  }

}
