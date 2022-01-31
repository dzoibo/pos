import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {
currentLink:string;
  constructor() { }

  ngOnInit() {
    this.currentLink='/Order';
  }

}
