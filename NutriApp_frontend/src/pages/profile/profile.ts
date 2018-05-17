import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestfulService} from "../../providers/restful-service/restful-service";
import {DietsListPage} from "../diets-list/diets-list";
import {BodyCompositionMeasurementsListPage} from "../body-composition-measurements-list/body-composition-measurements-list";
import {AuthService} from "../../providers/auth-service/auth-service";
import {EditProfilePage} from "../edit-profile/edit-profile";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
  current_user: any;

  constructor(public navCtrl: NavController,
              public restful: RestfulService,
              public navParams: NavParams,
              public authService: AuthService) {
    this.current_user = this.authService.current_user;
    this.user = (this.navParams.data.hasOwnProperty('id') == true) ? this.navParams.data : this.current_user;
    console.log(this.user);
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage, {
      user: this.user
    });
  }

  viewDiets(){
    this.navCtrl.push(DietsListPage, {
      patient: this.user
    });
  }

  viewMeasurements(){
    this.navCtrl.push(BodyCompositionMeasurementsListPage, { user: this.user });
  }

}
