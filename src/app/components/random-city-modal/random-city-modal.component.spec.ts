import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCityModalComponent } from './random-city-modal.component';

describe('RandomCityModalComponent', () => {
  let component: RandomCityModalComponent;
  let fixture: ComponentFixture<RandomCityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomCityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
