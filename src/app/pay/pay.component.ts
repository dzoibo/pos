import { Component, HostListener, OnInit } from '@angular/core';
import { Order } from '../Models';
import { CanDeactivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../guard/deactivate-guard.guard';
import { OrdersService } from '../service/order.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { PrintService } from '../service/print';










@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    

  Order:Order;
  Mode:string='CASH';
  Pay='Pay';// the state of the order about pay ; it can be 'null','pay'or 'valid'
  Payment:number=0;
  bluetoothList: any=[];
  selectedPrinter: any;
  macAddress: any;
  


  constructor(private printService:PrintService, private bluetoothSerial: BluetoothSerial,private router:Router,private alertController:AlertController,private orderService:OrdersService) {
    this.Order=new Order();
   }


    ionViewDidEnter() {
      try {
        
        var retrievedObject = localStorage.getItem('Order')
        this.Order= JSON.parse(retrievedObject);
        console.log(this.Order,'edee')
        if(this.Order===null){
          console.log('jkik');
          this.router.navigate(['Cashier'])
        }
      } catch (error) {
          console.log(error);
          this.router.navigate(['Cashier'])
        }
        

    } 
    ngOnInit(): void {
      setTimeout(() => {
        var width= document.getElementById('keyEnter') as HTMLElement
      var back= document.getElementById('keyBack') as HTMLElement
      var numero = width.clientWidth;
      numero=numero+1;
      back.style.width=numero+'px';
      width.style.width=numero+'px';
      }, 100);
    }

  changeMode(){ // function to set the Mode of payment
    if(this.Mode==='CASH'){
      this.Mode='NO CASH';
    }else{
      this.Mode='CASH'
    }
  }
  payBill(action){
    this.Pay=action;
   }
   Cancel(){
    this.router.navigate(['Cashier'])
  }
  
   getChange(){
     var change=this.Payment - this.Order.OrderTotalAmount;
     if(change<0){
       return 0
     }else{
       return change ;
     }
   }

   
   addPayment(key:string){
     var string=this.Payment+key;
     this.Payment=parseInt(string);
   }
   clearPayment(key:string){
    if(key==='C'){
      this.Payment=0;
    }else
    { 
      var string=this.Payment.toString(10)
      if(string.length>1){
        string=string.substr(0, string.length-1)
        this.Payment=parseInt(string);
      }else{
        this.Payment=0;
      }
      
    }
   }

   
   async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      //subHeader: 'Subtitle', this is not relevant for us now
      message: 'Payment is not suffisant',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  scan() {
    this.printService.searchBluetoothPrinter()
    .then(resp => {
     //List of bluetooth device list
     this.bluetoothList = resp;
     console.log('PRINTERS', JSON.stringify(resp))
    });
  }

  selectPrinter(name, macAddress) {
    //Selected printer macAddress stored here
    this.selectedPrinter = 'NAME: ' + name + '   MAC: ' + macAddress;
    this.macAddress = macAddress;
  }
  printBluetooth(myText) {
    //The text that you want to print
    //var myText="\x1b\x45\x01Hello hello hello\x1b\x45\x00 \n\n\n This is a test \n\n\n";
    this.printService.sendToBluetoothPrinter(this.macAddress, myText);
  }
   async Valid(){
     if(this.Payment-this.Order.OrderTotalAmount<0){
      await this.presentAlert()
      //we display the alert message with the message "payment is not suffisant"
     }else{//Maybe we can add a spinner here...
      
      this.Order.Created='2022'
       this.Order.OrderLocationId=1;
       this.Order.OrderLocationLevelName='Floor1';
       this.Order.OrderLocationName='Table1';
       this.Order.OrderStatus='Paid';// we will tcheck the good order status after , and a thing to display if the order fall to serve or if there is not connection...
       const data= await this.orderService.createOrder(this.Order);
          if(typeof(data)==='string'){
            this.Pay='Valid';
            console.log(data);
            const print= await  this.orderService.Printer(data)
            this.print(print);
            localStorage.removeItem('Order');
            console.log('uuu',localStorage.getItem('Order'))
            setTimeout(() => {
            this.Order=new Order;
            this.router.navigate(['/Cashier']);
            }, 2000);
          }else{
            this.Pay='Error'// we display the error icon and the error message in red
            console.log('error');
          }
     }
   }
   
   print(text){
    this.selectPrinter('BlueTooth Printer','66:12:DA:74:79:BF');
    this.printBluetooth(text);
   }
   
   ExactAmount(){
     this.Payment=this.Order.OrderTotalAmount;
   }
  
}
