import { Component, HostListener, OnInit } from '@angular/core';
import { Order,OrderCreated,OrderItem} from '../Models';
import { CanDeactivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ComponentCanDeactivate } from '../guard/deactivate-guard.guard';
import { OrdersService } from '../service/order.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { PrintService } from '../service/print';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../guard/auth.service';
import { TranslateService } from '@ngx-translate/core';










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
  permission:string;
  exactAmount:boolean;
  alert1;
  alert2;
  


  constructor(private translate:TranslateService, private cookies:CookieService,private authService: AuthService, private printService:PrintService, private bluetoothSerial: BluetoothSerial,private router:Router,private alertController:AlertController,private orderService:OrdersService) {
   this.permission=this.authService.permission;
   this.Order=new Order();
   this.translate.get('Pay.alertAmount').subscribe((data)=>{
     this.alert1=data;
   })
   this.translate.get('Pay.alertError').subscribe((data)=>{
    this.alert2=data;
  })
  }


    ionViewDidEnter() {

      try {
        
        var retrievedObject = localStorage.getItem('Order');
        
        if(this.permission==='seller & cashier'){
            let order =new Order();
            order =JSON.parse(retrievedObject);
            this.Order = order;
        }
        else if(this.permission==='cashier'){
          let order =new Order();
            order =JSON.parse(retrievedObject);
            this.Order = order;
        }else{
          this.router.navigate(['Order'])
        }
        if(this.Order===null){
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
    
    TransfertItem(  OrderItems2: {
                                      ItemId:number;
                                      ItemName:string;
                                      ItemModel:string;
                                      ItemProvider:string;
                                      ItemPrice:number;
                                      ItemImage:string;
                                      ItemQuantity:number;
                                    }[])
                                    {
          var OrderItems1:OrderItem[]=[];                                                   
          for(const item of OrderItems2){
          let orderItem = new OrderItem();
          orderItem.ItemModel=item.ItemModel,
          orderItem.ItemQuantity=item.ItemQuantity,
          orderItem.Item.ItemId=item.ItemId;
          orderItem.Item.ItemDescription=item.ItemProvider;
          orderItem.Item.ItemProvider=item.ItemProvider;
          orderItem.Item.ItemImage=item.ItemImage;
          orderItem.Item.ItemPrice=item.ItemPrice;
          orderItem.Item.ItemName=item.ItemName;
          orderItem.Item.ItemModels[0].ItemId=item.ItemId;
          orderItem.Item.ItemModels[0].C_UOM_ID=0;
          orderItem.Item.ItemModels[0].Model=item.ItemModel;
          orderItem.Item.ItemModels[0].Price=item.ItemPrice;
OrderItems1.push(orderItem); 
}
return OrderItems1;
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
    this.router.navigate([localStorage.getItem('url')])
  }
  
  
  formatAmout(n) {
    return this.orderService.formatAmout(n);
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
     if(this.exactAmount===true){
       this.Payment=0;
       this.exactAmount=false;
     }
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

   
   async presentAlert(string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      //subHeader: 'Subtitle', this is not relevant for us now
      message: string,
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
      await this.presentAlert(this.alert1)
     }else{//Maybe we can add a spinner here...
       console.log(this.Order.OrderId);
       this.Order.Created= new Date ('23.01.2022 12:55:35')
       this.Order.OrderLocationId=1;
       this.Order.OrderLocationLevelName='Floor1';
       this.Order.OrderLocationName='Table1';
       console.log(this.Order);
       this.Order.OrderStatus='paid';// we will tcheck the good order status after , and a thing to display if the order fall to serve or if there is not connection...
       var data;
       if(this.permission==='cashier'){
         data= await this.orderService.updateOrder(this.Order);
       }else{
        data= await this.orderService.createOrder(this.Order);
       }
          if(typeof(data)!==undefined){
            this.Pay='Valid';
            this.orderService.Created=true;
            console.log(data);
            const print= await  this.orderService.Printer(data)
            this.print(print);
            localStorage.removeItem('Order');
            setTimeout(() => {
            this.Order=new Order;
            this.router.navigate(['/Cashier']);
            }, 2000);
          }else{
            this.Pay='Error'// we display the error icon and the error message in red
            console.log('error');
            console.log(JSON.stringify(data));
            this.presentAlert(this.alert2);
          }
     }
   }
   
   print(text){
    this.selectPrinter('BlueTooth Printer','66:12:DA:74:79:BF');
    this.printBluetooth(text);
   }
   
   ExactAmount(){
     this.Payment=this.Order.OrderTotalAmount;
     this.exactAmount=true;
   }
  
}
