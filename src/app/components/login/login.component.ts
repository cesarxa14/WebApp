import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from '../../models/account'

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
  constructor(private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._builderForm();
    
  }

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

  login(){
    this.account.username = this.usuario.value;
    this.account.password = this.password.value;
    console.log(this.account.username, this.account.password)
  }

}
