import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from './location.service';
import { Observable } from 'rxjs';
// import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RandomCityModalComponent } from './components/random-city-modal/random-city-modal.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  filteredStates$: Observable<string[]>;
  savedCities: any = [];

  constructor(private _location: LocationService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.filteredStates$ = this._location.StatesAsObs()
  }

  updateSavedCities(city) {
    this.savedCities = [city].concat(this.savedCities)
  }

  showRandom() {
    if (this.savedCities.length > 0) {
      const randomCity = this.savedCities[Math.floor(Math.random() * this.savedCities.length)]
      const dialogRef = this.dialog.open(RandomCityModalComponent, {
        width: '400px',
        data: {randomCity: randomCity}
      })
    } else {
      this.snackBar.open(`No Cities Avaliable`, `OK`, {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['warn-snackBar']  
      });
    }
  }

}
