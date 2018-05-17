import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";
import {UsersListPage} from "../users-list/users-list";


@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  myForm: FormGroup;
  rol = "isPatient";

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public restful: RestfulService,
              public alertCtrl: AlertController) {
    this.myForm = this.createMyForm();
  }

  onSubmit(){
    this.setRol(this.rol);
    console.log(this.myForm.value);
    this.restful.createUser(this.myForm.value)
      .subscribe(
        (res) => {
          console.log("Usuario registrado");
          this.successfullyAddedUser();
          this.navCtrl.setRoot(UsersListPage);
        },
        (error) => {
          console.log(error);
        });
  }
  private createMyForm(){
    return this.formBuilder.group({
      username: [''],
      password: [''],
      isAdmin: [''],
      isPatient: [''],
      isNutritionist: [''],
      name: [''],
      last_name: [''],
      dni: [''],
      birth_date: ['']
    });
  }

  setRol(rol){
    this.rol = rol;
    if(rol == 'isAdmin') {
      this.myForm.value.isAdmin = "true";
      this.myForm.value.isPatient = "false";
      this.myForm.value.isNutritionist = "false";
    } else if(rol == 'isPatient') {
      this.myForm.value.isPatient = "true";
      this.myForm.value.isAdmin = "false";
      this.myForm.value.isNutritionist = "false";
    } else if(rol == 'isNutritionist'){
      this.myForm.value.isNutritionist = "true";
      this.myForm.value.isAdmin = "false";
      this.myForm.value.isPatient = "false";
    }
    console.log(this.myForm.value);
  }

  successfullyAddedUser() {
    let alert = this.alertCtrl.create({
      title: 'Usuario creado',
      buttons: ['OK']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
