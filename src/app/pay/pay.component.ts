import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  state='';
  messageState='';
  Order:Order=null;
  payMode='';
  constructor( private orderService:OrderService, private router:Router) { 
    
  }

  ngOnInit() {
    var retrievedObject = localStorage.getItem('Order')
    this.Order=JSON.parse(retrievedObject)
  }

  proceed(){
  var tel= (<HTMLInputElement>document.getElementById('tel')).value;
  if(!( /^[0-9]{3,}$/.test(tel)) || !(/[1-9]/.test(tel))){
    document.getElementById('tel').focus();
    document.getElementById('tel').style.border='2px solid red';
    setTimeout(()=>{
      document.getElementById('tel').style.borderColor='transparent';
    },200);
    return false
  }else{
    this.state='proceed';
    this.messageState='Waiting for confirmation...'; 
    setTimeout(()=>{
      this.orderService.SendByOM(parseInt(tel),this.Order.orderTotal).then(
        (res) => {
          this.state=res;
          if(this.state==='done'){
            this.messageState='MTN MoMo Payment successful...'; 
          }else if(this.state==='error'){
            this.messageState='Phone number is unknown...';
          }else{
            this.messageState='Failed to connect to the server...';
          }
        },
        (error) => {
        }
      ); 
    },3000);
  }

  
  
    
  }

  cancel(){
    this.router.navigate(['Order/',this.Order.orderId]); 
  }

  close(){
   this.orderService.saveOrder(this.Order).then(
     ()=>{
      this.router.navigate(['Order']);
     },
     (error)=>{
       console.log(error);
     }
   )
  }
  
}