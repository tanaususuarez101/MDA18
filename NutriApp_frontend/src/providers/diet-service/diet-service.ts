import { Injectable } from '@angular/core';


@Injectable()
export class DietService {

  public days = [];

  constructor() { }

  getDiet() {
    return this.days;
  }

  resetDiet() {
    this.days = [];
  }

  parseForm(formOutput, dia) {
    if(formOutput.breakfast) {
      this.days.push({
        day: dia,
        type_id: 1,
        dishes: [JSON.stringify(formOutput.breakfast)]
      });
    }
    if (formOutput.midmorning) {
      this.days.push({
        day: dia,
        type_id: 2,
        dishes: [JSON.stringify(formOutput.midmorning)]
      });
    }
    if(formOutput.lunch) {
      this.days.push({
        day: dia,
        type_id: 3,
        dishes: [JSON.stringify(formOutput.lunch)]
      });
    }
    if(formOutput.snack) {
      this.days.push({
        day: dia,
        type_id: 4,
        dishes: [JSON.stringify(formOutput.snack)]
      });
    }
    if(formOutput.dinner) {
      this.days.push({
        day: dia,
        type_id: 5,
        dishes: [JSON.stringify(formOutput.dinner)]
      });
    }
  }

}
