import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAndPointsComponent } from './label-and-points.component';

describe('LabelAndPointsComponent', () => {
  let component: LabelAndPointsComponent;
  let fixture: ComponentFixture<LabelAndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelAndPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAndPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
