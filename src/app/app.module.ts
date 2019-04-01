import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { 
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatIconModule,
  MatDialog,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomCityModalComponent } from './components/random-city-modal/random-city-modal.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { StateValidatorDirective } from './state.validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    RandomCityModalComponent,
    CityFormComponent,
    CityListComponent,
    StateValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RandomCityModalComponent]
})
export class AppModule { }
