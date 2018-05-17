import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDishesToDietPage } from './add-dishes-to-diet';

@NgModule({
  declarations: [
    AddDishesToDietPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDishesToDietPage),
  ],
})
export class AddDishesToDietPageModule {}
