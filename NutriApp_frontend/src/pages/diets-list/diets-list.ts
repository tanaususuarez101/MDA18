import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service/auth-service";
import { RestfulService } from "../../providers/restful-service/restful-service";
import { DietPage } from "../diet/diet";
import { CreateDietPage } from "../create-diet/create-diet";


@IonicPage()
@Component({
  selector: 'page-diets-list',
  templateUrl: 'diets-list.html',
})
export class DietsListPage {

  public diets :any = [];
  current_user: any;
  patient: any;
  loadDietsAgain: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restful: RestfulService,
              public authService: AuthService,
              private loadingCtrl: LoadingController) {
    this.current_user = this.authService.current_user;

    if (this.current_user.user.isNutritionist) {
      this.patient = this.navParams.get('patient');
      this.diets = this.patient.diets;
      this.loadDietsAgain = false;
    } else {
      this.patient = this.current_user;
      this.loadDietsAgain = true;
    }
  }

  ionViewDidEnter() {
    if(this.loadDietsAgain) {
      let loader = this.loadingCtrl.create({ content: 'Cargando' });
      loader.present();
      this.restful.getDiets(this.patient.id).subscribe(res => {
        this.diets = res;
        loader.dismiss();
      });
    }
    if (this.current_user.user.isPatient && this.loadDietsAgain) {this.loadDietsAgain = false}
    if (this.current_user.user.isNutritionist && !this.loadDietsAgain) {this.loadDietsAgain = true}
  }

  changeToDietView(diet){
    this.navCtrl.push(DietPage, {
      diet: diet
    });
  }

  changeToCreateDiet(){
    this.navCtrl.push(CreateDietPage, {
      patient_id: this.patient.user.id
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
