import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {

  dish: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.dish = this.navParams.data;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
