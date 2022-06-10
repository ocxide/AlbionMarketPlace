import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelComponent ]
    })
    .compileComponents();
  });

  /*
  * For hooks function testing automatic detectChanges is off, please add it manually to each test
  */
  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    /*fixture.detectChanges();*/
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require its required Inputs', () => {
    expect(() => component.ngOnInit()).toThrowError()
  })

  it('should have a default value for its non required Inputs', () => {
    expect(component.value).toBeDefined()
    expect(component.offset).toBeDefined()    
    expect(component.display).toBeDefined()
  })

  /*
  * TODO: test if label its always inside its container
  */
});
