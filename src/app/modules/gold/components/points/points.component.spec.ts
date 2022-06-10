import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsComponent } from './points.component';
import { CenterPointPipe } from '@gold/pipes/center-point.pipe'
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PointsComponent', () => {
  let component: PointsComponent;
  let fixture: ComponentFixture<PointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsComponent, CenterPointPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsComponent);
    component = fixture.componentInstance;
});

it('should create', () => {
    component.values = []
    component.points = []
    component.boardSize = { x: 0, y: 0 }

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
