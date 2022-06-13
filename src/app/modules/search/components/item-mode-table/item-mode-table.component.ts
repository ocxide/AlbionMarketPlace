import { Component, Input, OnInit } from '@angular/core';
import { QualityRequiredCity } from '@search/interfaces/quality-required-city';
import { WindowSizes } from '@search/interfaces/window-sizes';
import { WindowEventsService } from '@search/services/window-events.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-item-mode-table',
  templateUrl: './item-mode-table.component.html',
  styleUrls: ['./item-mode-table.component.scss']
})
export class ItemModeTableComponent implements OnInit {

  @Input() title = ''
  @Input() cities!: QualityRequiredCity[]

  qualityList = [ 1, 2, 3, 4, 5 ]
  columnActive: Array<0 | 1> = [ 0, 0, 0, 0, 0 ]
  colspan$ = this.winESer.windowSize$.pipe(map(value => value === WindowSizes.small ? 1 : 2))

  constructor(private winESer: WindowEventsService) { }

  ngOnInit(): void {
  }

  toggleQualityColumn(quality: number) {
    this.columnActive[quality] = !this.columnActive[quality] ? 1 : 0
  }

}
