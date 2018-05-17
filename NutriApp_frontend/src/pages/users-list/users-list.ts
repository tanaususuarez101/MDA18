import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RestfulService } from "../../providers/restful-service/restful-service";
import { CreateUserPage } from "../create-user/create-user";
import { EditProfilePage } from "../edit-profile/edit-profile";


@IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  usersList: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private restful: RestfulService,
              public loadingCtrl: LoadingController) { }


  ionViewWillEnter(){
    let loader = this.loadingCtrl.create({ content: 'Cargando...' });
    loader.present();
    this.restful.getUsers()
      .subscribe((res) => {
        this.usersList = res;
        loader.dismiss();
      } );
  }

  editProfile(user){
    this.navCtrl.push(EditProfilePage, {
      user: user
    });
  }

  deleteUser(public_id){
    this.restful.deleteUser(public_id).subscribe(res => {
    }, error => {
      if(error.status == 200){
        console.log("Usuario eliminado");
        this.navCtrl.setRoot(UsersListPage);
      }else if(error.status == 500){
        console.log("El usuario no pudo ser eliminado");
      }
    })
  }

  createUser() {
    this.navCtrl.push(CreateUserPage);
  }

}
