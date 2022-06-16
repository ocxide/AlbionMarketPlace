import { Component, OnInit } from '@angular/core';

interface Link {
  url: string,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  links: Link[] = [
    { url: '/search', name: 'Buscar' },
    { url: '/gold', name: 'Oro' },
  ];

  constructor(
  ) {}

  ngOnInit() {

  }
}
