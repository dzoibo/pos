import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guard/auth.service';
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
  Created:boolean;
  permission:string;
  testOrder;
  constructor( private authService:AuthService,private orderService:OrdersService,private router:Router) {
    this.permission=this.authService.permission;
  }

  async ngOnInit() {
    

  }


  async ionViewWillEnter(){
    console.log('Orders 1',JSON.stringify(this.Orders));
    const data = await this.getOrders();
    
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
    this.Created=false;
    this.testOrder=new Order();// this is just for the test 
    this.testOrder.OrderId='N1229991';
    this.testOrder.Created= '2022-03-25 10:32:18';
    this.testOrder.OrderItems=[];
    this.testOrder.OrderLocationId=1;
    this.testOrder.OrderLocationLevelName='floor1',
    this.testOrder.OrderLocationName='table1',
    this.testOrder.OrderStatus='Draft',
    this.testOrder.OrderTotalAmount=0;
    this.Orders.push(this.testOrder);
    this.isCreated();
  }

 async getOrders(){
    var data=await this.orderService.getOrdersList()
    var order:Order[];
    try {
      for(const newOrder of data){
        let templateOrder=new Order();
        templateOrder.OrderId=newOrder.OrderId;
        templateOrder.Created=newOrder.Created;
      }
    } catch (error) {
      
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
    }else if(OrderStatus==='Paid'){
      return 'successs'
    }else{
      return 'warning'
    }
  }

  newOrder(){
    this.router.navigate(['/New Order'])
  }

  seeOrder(order:Order){
    if(this.permission==='cashier'){
      localStorage.setItem('Order',JSON.stringify(order))
      this.router.navigate(['/Cashier'])
    }
  }
   displayDate(datestring:string){
   return this.orderService.displayDate(datestring);  
  }
}
