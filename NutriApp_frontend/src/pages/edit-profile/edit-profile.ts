import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  myForm: FormGroup;
  current_user: any;
  user: any;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public restful: RestfulService,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
    this.myForm = this.createMyFormUser();
    this.user = this.navParams.get("user");
  }

  onSubmit() {
    console.log(this.myForm.value);
    if(this.myForm.value.password2 == this.myForm.value.password) {
      delete this.myForm.value.password2;
      this.restful.updateUser(this.user.user.public_id, this.myForm.value).subscribe(res => {
      }, error => {
        if (error.status == 200) {
          console.log("Usuario modificado");
          this.successfullyUpdatedUser();
          this.navCtrl.pop();
        } else if (error.status == 500) {
          console.log("El usuario no pudo ser modificado");
        }
      })
    }else{
      this.showNotSamePassword();
    }
  }

  private createMyFormUser(){
    return this.formBuilder.group({
      username: [''],
      password: [''],
      password2: [''],
      name: [''],
      last_name: [''],
      birth_date: [''],
      dni: [''],
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

  successfullyUpdatedUser() {
    let alert = this.alertCtrl.create({
      title: 'Usuario actualizado',
      buttons: ['OK']
    });
    alert.present();
  }

  showNotSamePassword() {
    let alert = this.alertCtrl.create({
      title: 'Error en la contraseña',
      subTitle: 'Por favor, compruebe los campos introducidos',
      buttons: ['OK']
    });
    alert.present();
  }

}
