import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietsListPage } from './diets-list';

@NgModule({
  declarations: [
    DietsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DietsListPage),
  ],
})
export class DietsListPageModule {}
