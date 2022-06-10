import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAndPointsComponent } from './label-and-points.component';
import { LabelAndPointsService } from './services/label-and-points.service';

describe('LabelAndPointsComponent', () => {
  let component: LabelAndPointsComponent;
  let fixture: ComponentFixture<LabelAndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelAndPointsComponent ],
      providers: [ LabelAndPointsService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAndPointsComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    component.values = []
    component.points = []
    component.minRangeValue = [{ price: 0, timestamp: 0 }, { price: 0, timestamp: 0 }]
    component.container = document.createElement('div')

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
