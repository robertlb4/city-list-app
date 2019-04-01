import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private states: string[];
  private filteredStates: BehaviorSubject<string[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) { 
    this.getStates()
  }

  updatefilterdStates(value?: string) {
    let filtered = this.states
    if (value) {
      filtered = this.states.filter(state => state.toLowerCase().startsWith(value.toLowerCase()))
    }
    this.filteredStates.next(filtered)
  }

  StatesAsObs() {
    return this.filteredStates.asObservable()
  }

  getStates() {
    const URL: string = 'http://battuta.medunes.net/api/region/us/all/?callback=foo&key=00000000000000000000000000000000';
    this.http.jsonp(URL, 'callback')
      .subscribe((results: any[]) => {
        this.states = results.map(state => state.region)
        this.updatefilterdStates();
      }, e => {
        console.log(e)
      })
  }

}
