import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesListPage } from './dishes-list';

@NgModule({
  declarations: [
    DishesListPage,
  ],
  imports: [
    IonicPageModule.forChild(DishesListPage),
  ],
})
export class ViewDishesPageModule {}
