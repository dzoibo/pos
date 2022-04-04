import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../guard/auth.service';
import { Order, OrderCreated, } from '../Models';
import {OrdersService} from '../service/order.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  Orders:OrderCreated[]=[];
  noOrder=true;
  Created:boolean;
  permission:string;
  testOrder;
  constructor( private popoverController:PopoverController, private authService:AuthService,private orderService:OrdersService,private router:Router,private route:ActivatedRoute) {
    this.permission=this.authService.permission;
  }

  async ngOnInit() {
    
  }
ionViewDidEnter(){
  if(this.permission==='seller & cashier'){
    this.router.navigate(['/cashier']);
  }
}

  async ionViewWillEnter(){
    this.Created=false;

    if(this.permission==='seller'){
      this.isCreated();
    }
    const data = await this.getOrders();
  /*this.testOrder=new OrderCreated();// this is just for the test 
    this.testOrder.OrderId='N1229991';
    this.testOrder.Created= '2022-03-25 10:32:18';
    this.testOrder.OrderItems=[];
    this.testOrder.OrderLocationId=1;
    this.testOrder.OrderLocationLevelName='floor1',
    this.testOrder.OrderLocationName='table1',
    this.testOrder.OrderStatus='In progress',
    this.testOrder.OrderTotalAmount=0;
    this.Orders.push(this.testOrder);*/
    
    try {
        if(this.Orders.length===0){
          this.noOrder=true;
        }
      }
       catch (error) {
        console.log('error');
        if(this.Orders.length===0){
          this.noOrder=true;
        }
      
    }
    
  }

  formatAmout(n) {
    return this.orderService.formatAmout(n);
}
 async getOrders(){
    var data=await this.orderService.getOrdersList()
    var order:OrderCreated[];
    try {
      order=data;
    } catch (error) {
      console.log(error)
    }
    order=data;
    if(order!==null){
      this.Orders=order;
    }
  }

 async isCreated(){// this function is to ckeck if we have a new order to display the message
  this.Created=this.orderService.Created; // if the user is the cashier this value will always be false
  setTimeout(() => {
    this.Created=false;
    this.orderService.Created=false;
    }, 2000);
 }  

  getColor(OrderStatus:string){
    if(OrderStatus==='Draft'){
      return 'medium'
    }else if(OrderStatus==='Paid' || OrderStatus==='paid'){
      return 'successs'
    }else{
      return 'warning'
    }
  }

  newOrder(){
    this.router.navigate(['/New Order'])
  }

  async PerfomPayment(order:Order){
    if(this.permission==='cashier'){
      localStorage.setItem('Order',JSON.stringify(order))
      this.router.navigate(['/Pay'])
      await this.ClosePopOver()
    }
  }

  async ShowDetails(order){
    localStorage.setItem('Order',JSON.stringify(order))
    console.log(order);
    this.router.navigate(['/Order detail'])

  }
  
   displayDate(datestring:string){
   return this.orderService.displayDate(datestring);  
  }

  async ClosePopOver() {
    await this.popoverController.dismiss();
      }
}
