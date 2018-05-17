import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestfulService } from "../../providers/restful-service/restful-service";
import { BodyCompositionMeasurementPage } from "../body-composition-measurement/body-composition-measurement";
import { CreateBodyCompositionMeasurementPage } from "../create-body-composition-measurement/create-body-composition-measurement";
import {AuthService} from "../../providers/auth-service/auth-service";


@IonicPage()
@Component({
  selector: 'page-body-composition-measurements-list',
  templateUrl: 'body-composition-measurements-list.html',
})
export class BodyCompositionMeasurementsListPage {

  public myBodyHistory: any = [];
  public myOriginBodyHistory: any = [];
  private current_user: any;

  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restful: RestfulService,
              private authService: AuthService) {

    this.current_user = this.authService.current_user;

    //Asignamos a la variable user el correpondiente usuario, en funcion de su somos o no nutricionistas
    if (this.current_user.user.isPatient) { this.user = this.current_user }
    else if (this.current_user.user.isNutritionist) { this.user = this.navParams.get("user") }

    this.myOriginBodyHistory = this.user.measurements;
  }

  ionViewDidLoad() {
    this.initializateHistory();
  }

  initializateHistory(){

    //it's need to data reset when user use search bar
    this.myBodyHistory = this.myOriginBodyHistory;

    // SORT history
    this.myBodyHistory.sort(function (a,b) {
      return (a.datetime > b.datetime)?(-1):1;
    });
  }

  getHistory(ev){
    // Reset items back to all of the items
    this.initializateHistory();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.myBodyHistory = this.myBodyHistory.filter((hist) => {
        return (hist.datetime.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  openDetails(history){
    this.navCtrl.push(BodyCompositionMeasurementPage, history);
  }

  createMeasurement() {
    this.navCtrl.push(CreateBodyCompositionMeasurementPage, this.user.id);
  }

}
