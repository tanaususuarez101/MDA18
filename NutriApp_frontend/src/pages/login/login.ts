import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestfulService } from "../../providers/restful-service/restful-service";
import { MenuService } from "../../providers/menu-service/menu-service";
import { StorageService } from "../../providers/storage-service/storage-service";
import { AuthService } from "../../providers/auth-service/auth-service";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public restful: RestfulService,
              public menuService: MenuService,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({ content: 'Cargando...' });
    loader.present();
    if (StorageService.readValue('token') != null) {
      this.getCurrentUser(loader);
    } else loader.dismiss();
  }

  onSubmit() {
    let loader = this.loadingCtrl.create({ content: 'Cargando...' });
    loader.present();
    this.restful.login(this.myForm.value)
      .subscribe(
        (res) => {
          StorageService.writeValues({ key: "token", value: res['token'] });
          this.getCurrentUser(loader);
        },
        (error) => {
          loader.dismiss();
          console.error(error);
          this.presentAlert('Error', error.status + ': ' + error.error);
        });

  }

  private getCurrentUser(loader) {
    this.restful.getCurrentUser()
      .subscribe(
        (res: any) => {
          this.authService.setCurrentUser(res);
          StorageService.writeValues({ key: "public_id", value: res.user.public_id });
          loader.dismiss();
          this.menuService.setPages(res.user.isAdmin, res.user.isNutritionist, res.user.isPatient);
        },
        (error) => {
          loader.dismiss();
          console.error(error);
          this.presentAlert('Error', error.status + ': ' + error.error);
        });
  }

  private createMyForm(){
    return this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  private presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
