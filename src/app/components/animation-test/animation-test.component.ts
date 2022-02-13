import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation-test',
  templateUrl: './animation-test.component.html',
  styleUrls: ['./animation-test.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({height: '400px'})),
      state('closed', style({height: '0', display: 'none'})),
      transition('closed => open', [
        style({display: 'block'}),
        animate('200ms')
      ]),
      transition('* => closed', [
        animate('2000ms')
      ])
    ])
  ]
})
export class AnimationTestComponent implements OnInit {

  isOpen: boolean = true;
  
  toggle() {
    console.log('Toggling open');
    this.isOpen = !this.isOpen;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
