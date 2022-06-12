import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '@models/data.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss','./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: any;
  @Output() onDeleteData: EventEmitter<Data> = new EventEmitter();
  @Output() onChangeStatus: EventEmitter<Data> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}


}
