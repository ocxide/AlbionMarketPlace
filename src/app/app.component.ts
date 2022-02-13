import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AlbionMarket';

  links: { url:string, name: string }[] = [
    { url: '/search', name: 'Buscar' },
    { url: '/gold', name: 'Oro' },
    { url: '/test', name: 'Test' }
  ];
  activeLink: typeof this.links[0] = this.links[0];

  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    this.location.onUrlChange(url => this.activeLink = { url, name: '' });
  }
}
