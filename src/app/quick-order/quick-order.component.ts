import { Component, OnInit } from '@angular/core';
import { Router,Route } from '@angular/router';

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit {
  catalog=[{name:'cat1'},{name:'cat2'},{name:'cat3'},{name:'cat4'},{name:'cat5'}]
  selectedLeave : string = '';
  catSlideOpts={
    freeMode:true,
    slidesPerView:3.5,
    slidesOffsetBefore:11,
    spaceBetween:10,
  }
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.router.url);
  }

}
