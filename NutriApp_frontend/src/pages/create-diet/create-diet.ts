import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RestfulService } from "../../providers/restful-service/restful-service";
import { DietService } from "../../providers/diet-service/diet-service";
import { AddDishesToDietPage } from "../add-dishes-to-diet/add-dishes-to-diet";


@IonicPage()
@Component({
  selector: 'page-create-diet',
  templateUrl: 'create-diet.html',
})
export class CreateDietPage {

  private dietForm : FormGroup;
  private diasSemana:any;
  private patient_id: number;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dietService: DietService,
              public form: FormBuilder,
              public restful: RestfulService) {

    this.patient_id = this.navParams.get('patient_id');
    this.dietForm = this.form.group({
      name: ['', Validators.required],
      patient_id: this.patient_id,
      init_date: '',
      expiration_date: '',
      foods: [this.dietService.getDiet()],
      recommendations: ''
    });

    this.diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  }

  changeToAddDishes(day) {
    this.navCtrl.push(AddDishesToDietPage, {
      dia: day
    });
  }

  setDiet() {
    this.restful.createDiet(this.dietForm.value).subscribe(res => {
      console.log(res);
    });
    this.dietService.resetDiet();
    this.navCtrl.pop();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
