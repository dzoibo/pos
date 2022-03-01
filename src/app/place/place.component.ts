import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order, Place } from '../Models';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {

  Orders:Order[];
  showOrders:Order[];
  tableList: string;
  OrderNumber:number;
  Place: Place[]=[
              {
                floor:'Floor1',
                Table:[] ,
                showDetail:true
              },
              {
                floor:'Floor2',
                Table:[] ,
                showDetail:false
              },
              {
                floor:'Floor3',
                Table:[] ,
                showDetail:false
              },
              {
                floor:'Floor4',
                Table:[] ,
                showDetail:false            }
            ];
  statut:string;
  
  constructor( private orderService:OrderService) {
    this.Orders=this.orderService.Orders;
    this.showOrders=this.Orders;
   }

  ngOnInit() {
    this.initTable();
  }
  initTable(){
    for(const order of this.Orders){
      this.Place.forEach(function(element,index){
        if(element.floor===order.orderFloor){// if the order is in the this floor we verify if we already have that table save in the floor that should means that we already have an order at that table if not we first add that new table ; if yes we just add a order to that table 
          let myIndex=element.Table.findIndex(el=>el.Name===order.orderTable)
          if(myIndex>=0){// it means that the table already have another order so we just add the new order to the list
            element.Table[myIndex].Order.push(order.orderId);
          }else{// we add the table with his new order
            var newTable={Name:order.orderTable,Order:[order.orderId],Total:500,Statut:'free'};
            element.Table.push(newTable);
          }
        
        }
      }) 
    }
    
  }
  getColor(statut){
    if(statut==='free'){
      return 'success';
    }else{
      return 'danger'
    }

    
  }
  setShowDetail(floorName){
    for (const floor of this.Place){
      if(floor.floor===floorName){
        if(floor.showDetail===true){
          floor.showDetail=false;
        }else{
          floor.showDetail=true;
        }
      }
    }
  }

}

