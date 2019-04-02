import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  //holds constant reference to states
  private states: string[] = [];
  //value of states filtered by input value
  private filteredStates: BehaviorSubject<string[]> = new BehaviorSubject([]);
  //previously saved cities
  private savedCities = new BehaviorSubject([]);

  constructor(private http: HttpClient) { 
    //init app state
    this.getStates();
    this.initSavedCities();
  }
//transmit new values based on filter results
  updatefilterdStates(value?: string) {
    //default if no input value
    let filtered = this.states;
    if (value) {
      filtered = this.states.filter(state => state.toLowerCase().startsWith(value.toLowerCase()));
    }
    this.filteredStates.next(filtered);
  }
  //return subject as observable for subscription on components
  StatesAsObs() {
    return this.filteredStates.asObservable();
  }

  //get states form 3rd party api
  getStates() {
    const URL: string = 'http://battuta.medunes.net/api/region/us/all/?callback=foo&key=00000000000000000000000000000000';
    this.http.jsonp(URL, 'callback')
      .subscribe((results: any[]) => {
        this.states = results.map(state => state.region.toLowerCase());
        this.updatefilterdStates();
      }, e => {
        console.log(e);
      })
  }
  //get time and timezone info from bing api
  getTime(city) {
    const URL = `https://dev.virtualearth.net/REST/v1/TimeZone/?query=${city.city},${city.state},us&key=${env.BING_API}`;
    return this.http.get(URL);
  }

  //retrieve saved cities form backend for initial app loading
  initSavedCities() {
    this.http.get(`${env.URL}/api/cities`)
      .subscribe((res: any) => {
        this.savedCities.next(res);
      })
  }

  //return subject as observable for subscription on components
  SavedCitiesAsObs() {
    return this.savedCities.asObservable()
  }
  //transmit new values based on filter results
  updateSavedCities(city) {
    this.savedCities.next([...this.savedCities.getValue(), city]);
  }
  //save to back end and transmit new values
  saveCity(city) {
    this.http.post(`${env.URL}/api/cities`, city)
      .subscribe(res => {
        this.updateSavedCities(res);
      })
  }

}
