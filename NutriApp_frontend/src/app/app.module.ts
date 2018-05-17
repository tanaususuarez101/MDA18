import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { RestfulService } from '../providers/restful-service/restful-service';
import { MenuService } from '../providers/menu-service/menu-service';
import { StorageService } from '../providers/storage-service/storage-service';
import { HeadersBuilderService } from '../providers/headers-builder-service/headers-builder-service';
import { DietService } from '../providers/diet-service/diet-service';
import { AuthService } from '../providers/auth-service/auth-service';

import { LoginPage } from "../pages/login/login";
import { PatientsListPage } from "../pages/patients-list/patients-list";
import { BodyCompositionMeasurementsListPage } from "../pages/body-composition-measurements-list/body-composition-measurements-list";
import { BodyCompositionMeasurementPage } from "../pages/body-composition-measurement/body-composition-measurement";
import { DishesListPage } from "../pages/dishes-list/dishes-list";
import { DishPage } from "../pages/dish/dish";
import { CreateDietPage } from "../pages/create-diet/create-diet";
import { AddDishesToDietPage } from "../pages/add-dishes-to-diet/add-dishes-to-diet";
import { DietPage } from "../pages/diet/diet";
import { UsersListPage } from "../pages/users-list/users-list";
import { DietsListPage } from "../pages/diets-list/diets-list";
import { CreateDishPage } from "../pages/create-dish/create-dish";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { CreateUserPage } from "../pages/create-user/create-user";
import { CreateBodyCompositionMeasurementPage } from "../pages/create-body-composition-measurement/create-body-composition-measurement";
import { ProfilePage } from "../pages/profile/profile";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PatientsListPage,
    BodyCompositionMeasurementsListPage,
    BodyCompositionMeasurementPage,
    DishesListPage,
    DishPage,
    CreateDietPage,
    AddDishesToDietPage,
    DietPage,
    UsersListPage,
    DietsListPage,
    CreateDishPage,
    EditProfilePage,
    CreateUserPage,
    CreateBodyCompositionMeasurementPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PatientsListPage,
    BodyCompositionMeasurementsListPage,
    BodyCompositionMeasurementPage,
    DishesListPage,
    DishPage,
    CreateDietPage,
    AddDishesToDietPage,
    DietPage,
    UsersListPage,
    DietsListPage,
    CreateDishPage,
    EditProfilePage,
    CreateUserPage,
    CreateBodyCompositionMeasurementPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestfulService,
    MenuService,
    StorageService,
    HeadersBuilderService,
    DietService,
    AuthService
  ]
})
export class AppModule {}
