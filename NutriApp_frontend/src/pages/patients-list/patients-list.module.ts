import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsListPage } from './patients-list';

@NgModule({
  declarations: [
    PatientsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsListPage),
  ],
})
export class PatientsListPageModule {}
