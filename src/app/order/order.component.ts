import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../Models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {
  Orders:Order[];
  showOrders:Order[];
  table:string;
  floor:string;
  statut:string;
  
  constructor( private orderService:OrderService) { }

  ngOnInit() {
    this.Orders=this.orderService.Orders;
    this.showOrders=this.Orders;// This one will be seted after to show only the selected items 
    this.statut="any";
    this.table="all";

  }
  filter(){
     // with don't put the floor in  this funtion because floor is provided when  we access to the page so the filter is only for the place and the statut
    this.showOrders=[];
    if (this.table==='all' && this.statut==='any' ){
      this.showOrders=this.Orders
    }else if(this.table==='all'){
      for (const order of this.Orders){
        if(order.orderStatus===this.statut){
            this.showOrders.push(order);
        }
      }
    }else if(this.statut==='any'){
      for (const order of this.Orders){
        if(order.orderTable===this.table){
            this.showOrders.push(order);
        }
      }
    }
    else{
      for (const order of this.Orders){
        if(order.orderStatus===this.statut && order.orderTable===this.table) {
            this.showOrders.push(order);
        }
      }
    }

  }

    
}
