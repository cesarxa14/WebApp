import { Component, OnInit, Inject, Output, EventEmitter  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CityService } from '../../services/city.service';
import { SpecialtyService } from '../../services/specialty.service';
import { EmployeeService } from '../../services/employee.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css']
})
export class ModalEditProfileComponent implements OnInit {

  @Output() edit:any = new EventEmitter();
  editForm: FormGroup;

  progress_bar: boolean = false;
  cities: any[];
  districts: any[];
  specialties: any[];

  cityAux: any;
  districtAux: any;
  specialtyAux: any;

  ID_SPECIALTY: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>,
              private cityService: CityService,
              private specialtyService: SpecialtyService,
              private customerService: CustomerService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.cityAux = this.data.user.district.city;
    this.districtAux = {id:this.data.user.district.id, name: this.data.user.district.name };
    this.specialtyAux = this.data.user.specialty;
    
    //se traen las ciudades desde base de datos para poder elegir en el mat select del html
    this.cityService.getCities().subscribe(res =>{
      this.cities = res;
    })

    //aca se elige si el userType es customer o employee para inicializar su respectivo formulario
    if(this.data.metadata.userType == 1) { // customer
      this.editForm = this._builderForm();
    } else if(this.data.metadata.userType == 2) { //employee
      this.specialtyService.getSpecialties().subscribe(res =>{
        this.specialties = res;
      })
      this.editForm = this._builderForm2();
    }
    
  }
  // se construye el formulario para los datos de un profile customer
  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      cellphone: [this.data.user.cellphone, [Validators.required, Validators.pattern(pattern)]],
      email: [this.data.user.email, [Validators.required, Validators.pattern(pattern)]],
      dni: [this.data.user.dni, [Validators.required, Validators.pattern(pattern)]],
      city: [this.data.user.city, [Validators.required]],
      district: [this.data.user.district, [Validators.required]]
    }) 
    return form;
  }
  /**Getters */
  get firstnameC() { return this.editForm.controls['firstname']; }
  get lastnameC() { return this.editForm.controls['lastname']; }
  get dniC() { return this.editForm.controls['dni']; }
  get emailC() { return this.editForm.controls['email']; }
  get cellphoneC() { return this.editForm.controls['cellphone']; }
  get cityC() { return this.editForm.controls['city']; }
  get districtC() { return this.editForm.controls['district']; }


  // se construye el formulario para los datos de un profile employee
  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      cellphone: [this.data.user.cellphone, [Validators.required, Validators.pattern(pattern)]],
      email: [this.data.user.email, [Validators.required, Validators.pattern(pattern)]],
      dni: [this.data.user.dni, [Validators.required, Validators.pattern(pattern)]],
      birthday: [this.data.user.birthday, [Validators.required]],
      specialty: [this.data.user.specialty.id, [Validators.required]],
      city: [this.data.user.district.city.id, [Validators.required]],
      district: [this.data.user.district.id, [Validators.required]]
    }) 
    return form;
  }

  get firstnameE() { return this.editForm.controls['firstname']; }
  get lastnameE() { return this.editForm.controls['lastname']; }
  get dniE() { return this.editForm.controls['dni']; }
  get emailE() { return this.editForm.controls['email']; }
  get cellphoneE() { return this.editForm.controls['cellphone']; }
  get cityE() { return this.editForm.controls['city']; }
  get districtE() { return this.editForm.controls['district']; }
  get birthdayE() { return this.editForm.controls['birthday']; }
  get specialtyE() { return this.editForm.controls['specialty']; }

  //esta funcion viene desde el mat select del formControl city
  selectCity(event){
    //el parametro event trae la ciudad que se seleccionado
    this.cityAux = event.value;
    // se traen los distritos de la ciudad (event) que se ha seleccionado
    this.cityService.getDistrictsByCity(event.value.id).subscribe(res=>{
      this.districts = res;
    })
  }

  //esta funcion se ejecuta cuando se cambia de distrito en el mat select
  selectDistrict(event){
    this.districtAux = event.value;

  }

   //esta funcion se ejecuta cuando se cambia de specialty en el mat select
  selectSpecialty(event) {
    this.specialtyAux = event.value;

  }

  //esta funcion es para editar la informacion del perfil
  editProfile(){
    //se muestra la barra de progreso mientras se va editando en la base de datos
    this.progress_bar = true;

    if(this.data.metadata.userType == 1) { // si el userType es customer entonces se mandan con una estructura de obj distinta
      
      //la estructura de este json obj me guie de como lo manda en el swagger y lo copie
      let obj = {
        account: {
          id: this.data.metadata.id,
        },
        cellphone: this.cellphoneC.value,
        district: {
          city: {
            id: this.cityAux.id
          },
          id: this.districtAux.id
        },
        dni: this.dniC.value,
        email: this.emailC.value,
        firstName: this.firstnameC.value,
        lastName: this.lastnameC.value
      }
      //se manda toda la info actualizada (obj) y ademas el id del usuario
      this.customerService.updateCustomer(this.data.user.id, obj).subscribe(res =>{
        let obj = {
          user: res,
          city: this.cityAux,
          district: this.districtAux
        }
        //este edit.emit es para que al cerrar el modal se envie la data actualizada en el componente que llamo este modal
        this.edit.emit(obj)
        this.dialogRef.close(); // hace que se cierre el modal
        this.progress_bar = false; // desaparece la barra de progreso porque ya termino de actualizar en base de datos
      })

      
    } else if(this.data.metadata.userType == 2) { // si el userType es employee entonces se mandan con una estructura de obj distinta
      
      //la estructura de este json obj me guie de como lo manda en el swagger y lo copie
      let obj = {
        account: {
          id: this.data.metadata.id
        },
        birthday: this.birthdayE.value,
        cellphone: this.cellphoneE.value,
        district: {
          city: {
            id: this.cityAux.id
          },
          id: this.districtAux.id
        },
        dni: this.dniE.value,
        email: this.emailE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        specialty: {
          id: this.specialtyAux.id
        }
      }
      //se manda toda la info actualizada (obj) y ademas el id del usuario
      this.employeeService.updateEmployee(this.data.user.id, obj).subscribe(res =>{
        let obj = {
          user: res,
          city: this.cityAux,
          district: this.districtAux,
          specialty: this.specialtyAux
        }
        //este edit.emit es para que al cerrar el modal se envie la data actualizada en el componente que llamo este modal
        this.edit.emit(obj);
        this.dialogRef.close(); // hace que se cierre el modal
        this.progress_bar = false; // desaparece la barra de progreso porque ya termino de actualizar en base de datos
      })

    }

  }

}
