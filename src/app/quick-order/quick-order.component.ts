import { Component, OnInit } from '@angular/core';
import { Router,Route } from '@angular/router';

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit {
  selectedLeave : string = '';
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.router.url);
  }

}
