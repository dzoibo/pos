import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order,Table } from '../Models';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {
  Orders:Order[];
  showOrders:Order[];
  table:string;
  tableTemplate:string[]=['all'];
  floor:string;
  statut:string;
  Status:string[]=['any','Open','Started','On hold','New'];
  
  constructor( private orderService:OrderService,private popoverController: PopoverController) { }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
  ngOnInit() {
    this.Orders=this.orderService.Orders;
    this.showOrders=this.Orders;// This one will be seted after to show only the selected items 
    this.getTable();
    this.statut="any";
    this.table="all"

  }
  setfilter(param:number,value:string){
   if(param===1){
     this.table=value
   }else{
     this.statut=value
   }
   this.filter();
  }
  filter(){
    this.DismissClick()
     // with don't put the floor in  this funtion because floor is provided when  we access to the page so the filter is already for a specific floor
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

  getTable(){// get the list of different table to display it in the filter 
    for (const order of this.Orders){
         var rep=true;
        for (var i=0 ; i< this.tableTemplate.length;i++){
          if (order.orderTable===this.tableTemplate[i]){
            //noting ; it means that the table is already in the template
           rep=false;
          }
        }
        if(rep){
          this.tableTemplate.push(order.orderTable);
        }
       }
  }

   getColor(statut){
     switch (statut) {
       case 'Open':
          return 'danger';
         break;
         case 'Closed':
          return 'success'
         break;
         case 'New':
          return 'primary'
         break;
         case 'Started':
          return 'warning'
         break;
     
       default: return 'medium'
         break;
     }
   }
   checkStatut(id:number){
     for (const Order of this.Orders){
       if(Order.orderId===id){
         if(Order.orderStatus!=='Closed'){
          return ['/Order',id];
         }
         else{
           return ['/Order'];
         }
       }
     }
   }

    
}
