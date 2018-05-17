import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";
import { AlertController } from 'ionic-angular';
import { PatientsListPage } from "../patients-list/patients-list";

@IonicPage()
@Component({
  selector: 'page-create-body-composition-measurement',
  templateUrl: 'create-body-composition-measurement.html',
})
export class CreateBodyCompositionMeasurementPage {

  myForm: FormGroup;
  response: any;
  IMC: any = 0;

  patient_id: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public restful: RestfulService,
              private alertCtrl: AlertController) {
    this.patient_id = this.navParams.data;
    this.myForm = this.createMyForm();

  }

  onSubmit(){
    this.placeIMC();
    console.log(this.myForm.value);
    this.restful.createMeasurement(this.myForm.value)
      .subscribe(res => {
        this.response = res;
      }, error => {
        if(error.status == 200) {
          this.correctAlert();
        } else if(error.status == 500) {
          console.log("Introduzca correctamente los valores");
          this.failAlert();
        }
      })


  }

  private createMyForm(){
    return this.formBuilder.group({
      weight: [''],
      height: [''],
      imc: [''],
      fat_percentage: [''],
      muscle_mass: [''],
      water_percentage: [''],
      patient_id: [this.patient_id]
    });
  }

  placeIMC() {
    this.myForm.value.imc = this.myForm.value.weight/(this.myForm.value.height*this.myForm.value.height);
    this.IMC = this.myForm.value.imc;
  }

  goBack() {
    this.navCtrl.pop();
  }

  correctAlert() {
    let alert = this.alertCtrl.create({
      title: 'Medición creada satisfactoriamente',
      subTitle: 'Pulse aceptar para volver a Inicio',
      buttons: ['Aceptar']
    });
    alert.present();
    this.navCtrl.push(PatientsListPage);
  }

  failAlert() {
    let alert = this.alertCtrl.create({
      title: 'La dieta no ha sido creada',
      subTitle: 'Por favor, introduzca correctamente los datos',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
