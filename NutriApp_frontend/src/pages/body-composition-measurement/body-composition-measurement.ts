import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-body-composition-measurement',
  templateUrl: 'body-composition-measurement.html',
})
export class BodyCompositionMeasurementPage {

  bodyDetails: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams ) {
    this.bodyDetails=this.navParams.data;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
