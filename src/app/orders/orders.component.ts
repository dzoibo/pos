import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, } from '../Models';
import {OrdersService} from '../service/order.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  Orders:Order[]=[];
  noOrder=true;

  constructor(private orderService:OrdersService,private router:Router) { 
    
  }

  async ngOnInit() {
    const data= await this.getOrders();
    try {
        this.Orders=data;
      }
       catch (error) {
      console.log('error');
      
    }
    if(this.Orders.length===0){
      this.noOrder=true;
    }
  }

 async getOrders(){
    var data=await this.orderService.getOrdersList()
    return data;
  }

  newOrder(){
    this.router.navigate
  }
  
  getColor(order){
    
  }
}
