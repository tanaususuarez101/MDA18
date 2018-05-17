import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { RestfulService } from "../../providers/restful-service/restful-service";
import {DishPage} from "../dish/dish";
import {AuthService} from "../../providers/auth-service/auth-service";


@IonicPage()
@Component({
  selector: 'page-diet',
  templateUrl: 'diet.html',
})
export class DietPage {

  public diet;
  public days: any;

  current_user: any;

  public shownGroup = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restful: RestfulService,
              public alertCtrl: AlertController,
              public authService: AuthService) {

    this.current_user = this.authService.current_user;
    this.diet = this.navParams.get('diet');
    this.handleDetails(this.diet);
  }

  handleDetails(details) {
    this.days = [{dia:'Lunes', dishes:[]}, {dia: 'Martes', dishes: []}, {dia: 'Miercoles', dishes: []}, {dia: 'Jueves', dishes: []}, {dia: 'Viernes', dishes: []}, {dia: 'Sabado', dishes: []}, {dia: 'Domingo', dishes: []}];
    for (let e of details.foods) {
      this.fillDays(e.day, e.type_id, e.dishes[0]);
    }
    console.log(this.days);
  }

  fillDays(day, type, dishes) {
    switch(type) {
      case 1:
        this.pushDishesToDay(day, dishes, 'Desayuno');
        break;
      case 2:
        this.pushDishesToDay(day, dishes, 'Media mañana');
        break;
      case 3:
        this.pushDishesToDay(day, dishes, 'Almuerzo');
        break;
      case 4:
        this.pushDishesToDay(day, dishes, 'Merienda');
        break;
      case 5:
        this.pushDishesToDay(day, dishes, 'Cena');
        break;
    }
  }

  pushDishesToDay(day, dish, type) {
    switch(day) {
      case 'Lunes':
        this.days[0].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Martes':
        this.days[1].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Miercoles':
        this.days[2].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Jueves':
        this.days[3].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Viernes':
        this.days[4].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Sabado':
        this.days[5].dishes.push({
          name: type,
          dish: dish
        });
        break;
      case 'Domingo':
        this.days[6].dishes.push({
          name: type,
          dish: dish
        });
        break;
    }
  }

  changeToDishView(dish) {
    this.navCtrl.push(DishPage, dish);
  }

  deleteDiet(diet_id) {
    this.restful.deleteDiet(diet_id).subscribe(() => {
    }, (error) => {
      if(error.status == 200) {
        this.navCtrl.pop();
        this.deleteConfirmation('Dieta eliminada!');
      } else if(error.status == 500) {
        this.deleteConfirmation('No se pudo eliminar la dieta');
      }
      console.log(error);
    })
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  deleteConfirmation(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['OK']
    });
    alert.present();
  }

  goBack(){
    this.navCtrl.pop();
  }

}
