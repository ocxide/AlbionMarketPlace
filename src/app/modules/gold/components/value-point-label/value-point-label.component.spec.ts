import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuePointLabelComponent } from './value-point-label.component';

describe('ValuePointLabelComponent', () => {
  let component: ValuePointLabelComponent;
  let fixture: ComponentFixture<ValuePointLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuePointLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuePointLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
