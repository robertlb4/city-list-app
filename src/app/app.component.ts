import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from './location.service';
import { Observable } from 'rxjs';
// import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RandomCityModalComponent } from './components/random-city-modal/random-city-modal.component';
import * as moment from "moment-timezone";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  savedCities$: Observable<any>;

  constructor(private _location: LocationService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    //retrieve saved cities for listing
    this.savedCities$ = this._location.SavedCitiesAsObs()
  }

  //on form entry send city to be saved
  updateSavedCities(city) {
    this._location.saveCity(city)
  }
  //display dialouge of random city
  showRandom(savedCities) {
    if (savedCities.length > 0) {
      const randomCity = savedCities[Math.floor(Math.random() * savedCities.length)]
      this._location.getTime(randomCity)
        .subscribe((res: any) => {
          let timeZone = res.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0]
          randomCity.timeZone = timeZone.genericName
          randomCity.timeZoneAbv = timeZone.abbreviation
          randomCity.currentTime = moment(timeZone.convertedTime.localTime).tz(timeZone.ianaTimeZoneId).format('MMMM Do YYYY, h:mm:ss a')
          console.log(moment(timeZone.convertedTime.localTime).tz(timeZone.ianaTimeZoneId).format('MMMM Do YYYY, h:mm:ss a'))

          const dialogRef = this.dialog.open(RandomCityModalComponent, {
            width: '400px',
            data: {randomCity: randomCity}
          })
        })
        //unless no cities are saved then use snackbar to inform no available cities
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
