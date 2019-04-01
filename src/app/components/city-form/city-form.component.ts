import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../../location.service';
import { Observable } from 'rxjs';
import { StateValidatorDirective } from '../../state.validator.directive';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {
  @ViewChild('form') form;
  @Output() addCity = new EventEmitter()


  filteredStates$: Observable<string[]>;

  constructor(private _location: LocationService) { }

  ngOnInit() {
    this.filteredStates$ = this._location.StatesAsObs()    
  }

  filterStates(value) {
    this._location.updatefilterdStates(value)
  }

  formSubmit(formInfo) {
    this.addCity.emit(formInfo)
    // this.previousEntries.push(cityInfo)
    this.form.resetForm()
}


}
