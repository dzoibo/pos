import { Injectable } from '@angular/core';
import { Order } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  Orders:Order[];
  constructor() { 
    this.Orders=[
      {orderId:1,
            orderTable:"Table1",
            orderFloor:"Floor1",
        orderTotal:600,
        orderStatus:"Delivered"},

        {orderId:2,

              orderTable:"Table2",
              orderFloor:"Floor1",
          orderTotal:600,
          orderStatus:"Open"},

          {orderId:3,
  
                orderTable:"Table3",
                orderFloor:"Floor1",
            orderTotal:600,
            orderStatus:"Collected"},
            {orderId:1,
                  orderTable:"Table2",
                  orderFloor:"Floor1",
              orderTotal:700,
              orderStatus:"Open"},
    ]
  }

}
