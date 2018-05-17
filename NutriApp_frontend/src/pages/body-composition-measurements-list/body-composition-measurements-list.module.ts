import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodyCompositionMeasurementsListPage } from './body-composition-measurements-list';

@NgModule({
  declarations: [
    BodyCompositionMeasurementsListPage,
  ],
  imports: [
    IonicPageModule.forChild(BodyCompositionMeasurementsListPage),
  ],
})
export class BodyCompositionMeasurementsListPageModule {}
