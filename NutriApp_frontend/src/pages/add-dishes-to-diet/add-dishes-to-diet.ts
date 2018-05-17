import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";
import { DietService } from "../../providers/diet-service/diet-service";


@IonicPage()
@Component({
  selector: 'page-add-dishes-to-diet',
  templateUrl: 'add-dishes-to-diet.html',
})
export class AddDishesToDietPage {

  private dishes;
  dishesForm : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restful: RestfulService,
              public formBuilder: FormBuilder,
              public dietService: DietService,
              private loadingCtrl: LoadingController) {

    this.dishesForm = formBuilder.group({
      breakfast: '',
      midmorning: '',
      lunch: '',
      snack: '',
      dinner: ''
    });
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({ content: 'Cargando' });
    loader.present();
    this.restful.getDishes().subscribe(res => {
      this.dishes = res;
      loader.dismiss();
    });
  }

  changeToCreateDiet() {
    console.log(this.dishesForm.value);
    this.dietService.parseForm(this.dishesForm.value, this.navParams.get('dia'));
    this.navCtrl.pop();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
