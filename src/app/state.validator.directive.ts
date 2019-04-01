import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { LocationService } from './location.service';


function stateValidator(list: any[]): ValidatorFn {
  return (control: AbstractControl, ) => {
    let isValid = list.indexOf(control.value)

    if (isValid !== -1) return null
    return {
      validState: {
        valid: false
      }
    }
  }
};

@Directive({
  selector: '[isState][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: StateValidatorDirective, multi: true }
  ]
})
export class StateValidatorDirective implements Validator {
  validator: ValidatorFn;

  constructor(private _location: LocationService) {
    this.validator = stateValidator(this._location.states);
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
