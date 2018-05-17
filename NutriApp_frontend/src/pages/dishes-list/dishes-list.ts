import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import { RestfulService } from "../../providers/restful-service/restful-service";
import { AuthService } from "../../providers/auth-service/auth-service";
import { DishPage } from "../dish/dish";
import {CreateDishPage} from "../create-dish/create-dish";


@IonicPage()
@Component({
  selector: 'page-dishes',
  templateUrl: 'dishes-list.html',
})
export class DishesListPage {

  dishesList: any = [];
  current_user: any;

  constructor(public navCtrl: NavController,
              public restful: RestfulService,
              public authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {

    this.current_user = this.authService.current_user;
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({content: 'Cargando'});
    loader.present();
    this.restful.getDishes()
      .subscribe(res => {
        this.dishesList = res;
        loader.dismiss();
      } );
  }

  viewDish(dish) {
    //console.log(dish);
    this.navCtrl.push(DishPage, dish);
  }

  deleteDish(dish_id) {
    let loader = this.loadingCtrl.create({content: 'Cargando'});
    loader.present();
    this.restful.deleteDish(dish_id)
      .subscribe(res => {
        console.log(res);
    }, error => {
        if(error.status == 200) {
          this.presentAlert('Plato eliminado', '');
          this.navCtrl.setRoot(DishesListPage);
          loader.dismiss();

        }
      })
  }

  changeToCreateDish(){
    this.navCtrl.push(CreateDishPage);
  }

  private presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
