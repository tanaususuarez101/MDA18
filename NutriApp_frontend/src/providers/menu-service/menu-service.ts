import { Injectable } from '@angular/core';
import { App } from "ionic-angular";
import { Subject, Observable } from "rxjs";
import { PatientsListPage } from "../../pages/patients-list/patients-list";
import { UsersListPage } from "../../pages/users-list/users-list";
import { DishesListPage } from "../../pages/dishes-list/dishes-list";
import { DietsListPage } from "../../pages/diets-list/diets-list";
import { BodyCompositionMeasurementsListPage } from "../../pages/body-composition-measurements-list/body-composition-measurements-list";
import { ProfilePage } from "../../pages/profile/profile";


@Injectable()
export class MenuService {

  private _pages: Subject<Array<{title: string, component: any, icon: String}>>;

  constructor(public app: App) {
    this._pages = new Subject<Array<{title: string, component: any, icon: String}>>();
  }

  getPages(): Observable<Array<{title: string, component: any, icon: String}>> {
    return this._pages.asObservable()
  }

  addPages(pages: Array<{title: string, component: any, icon: String}>) {
    this._pages.next(pages);
  }

  setPages(isAdmin: boolean, isNutritionist: boolean, isPatient: boolean) {
    let pages;
    let newRootPage;

    if (isAdmin) {
      pages = [
        { title: 'Usuarios', component: UsersListPage, icon: 'people' },
        { title: 'Mi perfil', component: ProfilePage, icon: 'contact'}
      ];
      newRootPage = UsersListPage;
    } else if (isNutritionist) {
      pages = [
        { title: 'Mis pacientes', component: PatientsListPage, icon: 'people' },
        { title: 'Ver platos', component: DishesListPage, icon: 'restaurant' },
        { title: 'Mi perfil', component: ProfilePage, icon: 'contact'}
      ];
      newRootPage = PatientsListPage;
    } else if (isPatient) {
      pages = [
        { title: 'Mis dietas', component: DietsListPage, icon: 'paper' },
        { title: 'Mi composicion corporal', component: BodyCompositionMeasurementsListPage, icon: 'body' },
        { title: 'Mi perfil', component: ProfilePage, icon: 'contact'}
      ];
      newRootPage = DietsListPage;
    }
    this.addPages(pages);
    this.app.getActiveNav().setRoot(newRootPage);
  }

}
