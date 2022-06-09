import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CenterPointPipe } from '../../pipes/center-point.pipe';

import { LabelAndPointsComponent } from '../label-and-points/label-and-points.component';
import { LabelComponent } from '../label/value-point-label.component';
import { PointsComponent } from '../points/points.component';

import { GraphComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphComponent, LabelAndPointsComponent, PointsComponent, LabelComponent, CenterPointPipe ],
      providers: [ChangeDetectorRef]
    })
    .compileComponents();
  });

  /*
  * For hooks function testing automatic detectChanges is off, please add it manually to each test
  */
  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    /*fixture.detectChanges();*/
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require its own input', () => {
    expect(component.ngOnInit).toThrowError()
  })

  it('should have svg html child', () => {
      component.values = [{ price: 0, timestamp: 0 }]
      fixture.detectChanges()

      expect(component.graph).toBeTruthy()
  })

  describe('chekedCalculatePoints', () => {
    const fn = () => fixture.detectChanges();

      it('should prepared to recieve empty arrays', () => {
        component.values = []
        expect(fn).toThrowError()
      })

      it('Ends of points must be according to the board size', () => {
        const svg = document.createElement('svg')
        svg.style.height = '100px'
        svg.style.width = '100px'

        component.values = [{ price: 0, timestamp: 0 }]
        component.graph = { nativeElement: svg }

        component.ngAfterViewInit()

        component.points?.forEach(point => {
            expect(point.x).toBeGreaterThanOrEqual(0)
            expect(point.x).toBeLessThanOrEqual(100)

            expect(point.y).toBeGreaterThanOrEqual(0)
            expect(point.y).toBeLessThanOrEqual(100)
        })
      })
  })

});

// describe('toPoints', () => {
    
//     it('Points lenght should be values lenght plus 2', () => {
//         const values = [{ price: 0, timestamp: 0 }]
//         expect(toPoints(values, { x: 1, y: 1 }, values[0], values[0])).toHaveLength(values.length+2)
//     })

//     it('Ends of points must be according to the board size', () => {
//         const board = { x: 10, y: 10 }
//         const values: Value[] = [ 
//             { price: 100, timestamp: 2300 },
//             { price: 100, timestamp: 2400 },
//             { price: 100, timestamp: 2500 }
//          ]
//         const points = toPoints(values, board, values[0], { price: 0, timestamp: 200 })

//         expect(points[0]).toEqual({ x: 0, y: board.y })
//         expect(points[points.length-1]).toEqual(board)
//     })

//     it('Points position should be between 0 and board size', () => {
//         const board = { x: 100, y: 100 }

//         const values: Value[] = [ 
//             { price: 100, timestamp: 2300 },
//             { price: 100, timestamp: 2400 },
//             { price: 100, timestamp: 2500 }
//         ]

//         const points = toPoints(values, board, values[0], { price: 0, timestamp: 200 })

//         points.forEach(point => {
//             expect(point.x).toBeGreaterThanOrEqual(0)
//             expect(point.x).toBeLessThanOrEqual(board.x)

//             expect(point.y).toBeGreaterThanOrEqual(0)
//             expect(point.y).toBeLessThanOrEqual(board.y)

//         })
//     })
// })

// describe("Render points", () => {
//     it('should return the double of lenght of points', () => {
//         const points = [{ x: 0, y: 0 }]
//         expect(toRenderPoints(points)).toHaveLength(points.length*2)
//     })
// })
