import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";


@IonicPage()
@Component({
  selector: 'page-create-dish',
  templateUrl: 'create-dish.html',
})
export class CreateDishPage {

  dishForm: any;

  constructor(public restful: RestfulService,
              public navCtrl: NavController,
              public formBuilder: FormBuilder,
              private alertCtrl: AlertController)  {
    this.dishForm = this.createDishForm();
  }

  private createDishForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: ['',Validators.required],
      elaboration: ['',Validators.required],
      difficulty : ['Fácil'],
      thumbnail:['']
    });
  }

  onSubmit() {
    this.restful.createDish(this.dishForm.value)
      .subscribe(res => console.log(res));
    this.presentAlert('Creacion completa','Pulse OK para volver a Ver Platos')
    if (this.navCtrl.getPrevious() != null) // Back to previous page if it exists - test purposes
      this.navCtrl.pop();
  }

  private presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
