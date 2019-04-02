// Async Validator to ensure that only states form the list are seleted
import { Directive, OnDestroy } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl, AsyncValidatorFn, AsyncValidator } from '@angular/forms';
import { LocationService } from './location.service';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, first, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[isState][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: StateValidatorDirective, multi: true }
  ]
})
export class StateValidatorDirective implements AsyncValidator, OnDestroy {
  //used to unsubscribe onDestroy with takeUntil
  private ngUnsubscribe = new Subject();
  
  constructor(private _location: LocationService) {}

  validate(c: FormControl) {
    return this.validateStateObservable(this._location.StatesAsObs(), c.value).pipe(debounceTime(500), distinctUntilChanged());
  }

  //compares entered state against list of states.  returns validation error if not found
  validateStateObservable(list: Observable<string[]>, state) {
    return new Observable(observer => {
      list.pipe(takeUntil(this.ngUnsubscribe)).subscribe(states => {
        if (states.includes(state.toLowerCase())) {
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
