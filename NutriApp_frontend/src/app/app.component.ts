import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { MenuService } from "../providers/menu-service/menu-service";
import { RestfulService } from "../providers/restful-service/restful-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('menu') navCtrl: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, icon: String}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menuService: MenuService,
              public restful: RestfulService) {
    this.initializeApp();
    this.menuService.getPages()
      .subscribe(res => this.pages = res);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.navCtrl.setRoot(page);
  }

  logout() {
    this.restful.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
