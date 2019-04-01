import { Directive, OnDestroy } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl, AsyncValidatorFn } from '@angular/forms';
import { LocationService } from './location.service';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, first, takeUntil } from 'rxjs/operators';


// function stateValidator(list: any[]): ValidatorFn {
//   return (control: AbstractControl, ) => {
//     let isValid = list.indexOf(control.value)
//     console.log(list)
//     if (isValid !== -1) return null
//     return {
//       validState: {
//         valid: false
//       }
//     }
//   }
// };


@Directive({
  selector: '[isState][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: StateValidatorDirective, multi: true }
  ]
})
export class StateValidatorDirective implements Validator, OnDestroy {
  private ngUnsubscribe = new Subject();
  
  constructor(private _location: LocationService) {}

  validate(c: FormControl) {
    return this.validateStateObservable(this._location.StatesAsObs(), c.value).pipe(debounceTime(500), distinctUntilChanged());
  }

  validateStateObservable(list: Observable<string[]>, state) {
    return new Observable(observer => {
      list.pipe(takeUntil(this.ngUnsubscribe)).subscribe(states => {
        if (states.includes(state)) {
          observer.next(null)
          observer.complete()
        } else {
          observer.next({stateInvalid: true})
          observer.complete()
        }
      })
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

}
