import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDietPage } from './create-diet';

@NgModule({
  declarations: [
    CreateDietPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDietPage),
  ],
})
export class CreateDietPageModule {}
