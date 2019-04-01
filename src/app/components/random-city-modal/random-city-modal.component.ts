import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-random-city-modal',
  templateUrl: './random-city-modal.component.html',
  styleUrls: ['./random-city-modal.component.scss']
})
export class RandomCityModalComponent {

  constructor(dialogRef: MatDialogRef<RandomCityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

}
