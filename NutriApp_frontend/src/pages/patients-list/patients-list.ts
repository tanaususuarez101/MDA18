import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestfulService } from "../../providers/restful-service/restful-service";
import { ProfilePage } from "../profile/profile";


@IonicPage()
@Component({
  selector: 'page-patients-list',
  templateUrl: 'patients-list.html',
})
export class PatientsListPage {

  patients: any = [];
  originPatients: any =[];
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restful: RestfulService,
              public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    this.loader = this.loadingCtrl.create({ content: 'Cargando' });
    this.loader.present();
    this.restful.getPatients()
      .subscribe( (res) =>  {
          this.originPatients = res;
          this.initializePatientsList();
          this.loader.dismiss();
        },
        (error)=> {
          console.log("error");
          this.loader.dismiss();
        }
      )
  }

  initializePatientsList(){
    this.patients = this.originPatients;
    this.patients.sort(function (a,b) {
      return (a.name > b.name)?(1):-1;
    });
  }

  searchPatient(ev) {
    // Reset items back to all of the items
    this.initializePatientsList();
    // set val to the value of the ev target
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.patients = this.patients.filter((patient) => {
        return (patient.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  viewDetails(patient){
    this.navCtrl.push(ProfilePage, patient)
  }

}
