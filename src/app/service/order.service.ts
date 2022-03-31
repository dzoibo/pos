import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Order,Catalog,User } from '../Models';
import { LoginService,CatalogService,OrderService } from 'poslibrary';
import { url } from 'inspector';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from '../guard/auth-guard.service';
import { AuthService } from '../guard/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Orders: Order[] ;
  Catalog:Catalog[];
  result:string;
  Order:Order;
  Created:boolean;
  
   constructor(private auth:AuthService, private catalogService:CatalogService,private orderService:OrderService) { 
   this.Created=false;
   
  }
  

 /* GetUser(userName:string,passWord:string):any{
    this.loginService.login(userName, passWord).subscribe((data: any) => { 
      console.log(data.WindowTabData);
      if(data.WindowTabData.Error){
        console.log(data.WindowTabData.Error);
        return false;
      }else{
        var userinfo=data.WindowTabData.DataSet.DataRow.field;
        this.User.userId=userinfo[0].val;
        this.User.userName=userinfo[1].val;
        this.User.userParner='Cashier';
        this.User.userImage='../assets/pp.png';
        return this.User;
      }
    });
    
  }

  getUserss(){
    return this.loginService.login('', '');
  }
  */
  async getCatalog(catalogId:number,itemId:number){
    const data = await this.catalogService.getCatalog(catalogId,itemId);
    return data
  }

  async getNewOrderId(){
    const data:any=await this.orderService.draftOrder()
    return data;
  }

  async getOrdersList(){
    const data=await this.orderService.getOrders('','','');
    return data
  }

  async Printer(id:string){
    try {
      const data=await this.orderService.getPrintData(id);
      return data; 
    } catch (error) {
     return error; 
    }
  }

  async createOrder(order:Order){
    const data=await this.orderService.createOrder(order);
    console.log(JSON.stringify(data))
    return data

  }// for now we don't not what is return by this fucntion...
  
  displayDate(datestring:string){
    var date=new Date(datestring)
    var day=date.getDate();
    var month=''+date.getMonth()+1;
    if(month.length===1){
     month='0'+month
    }
    var hours = date.getHours();
    var seconde = date.getSeconds();
    var minute = date.getMinutes();
    var years = date.getFullYear();
    return day+':'+month+':'+years+' '+hours+':'+minute+':'+seconde;
  }





}
