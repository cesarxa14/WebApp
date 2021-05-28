import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from '../../models/account';
import { MatStepper } from '@angular/material/stepper';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  account: Account = {username:'', password:'', typeuser:null};
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  firstData: boolean = true;
  constructor(private _formBuilder : FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.registerForm1 = this._builderForm();
    this.registerForm2 = this._builderForm2();
    this.registerForm3 = this._builderForm3();

  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      usuario: ['', [Validators.required, Validators.pattern(pattern)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      typeuser: [null, [Validators.required]]
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
   /**Getters */
   get usuario() { return this.registerForm1.controls['usuario']; }
   get password() { return this.registerForm1.controls['password']; }
   get email() { return this.registerForm1.controls['email'];}
   get typeuser(){ return this.registerForm1.controls['typeuser']}


  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(pattern)]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      id_account: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }

  _builderForm3(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(pattern)]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      id_account: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
    


  validarDatos(stepper: MatStepper){
    this.account.username = this.usuario.value;
    this.account.password = this.password.value;
    this.account.typeuser = this.typeuser.value;
    console.log(this.registerForm1.value)
    this.firstData = false
    setTimeout(()=>{
      //Aca se pondra el servicio que validara los datos y despues se pasara al siguiente paso
      stepper.next()
    },3000)
    
  }

  registrarse(){
    this.router.navigateByUrl('/')
  }

}
