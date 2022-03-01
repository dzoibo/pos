export class User {
    userName:string;
    userPassword:string;
    constructor(private user:string, private password:string ){
        this.userName=this.user ;
        this.userPassword=this.password;
    }
}

export interface Order{
    orderId:number;
    orderTable:string;
    orderFloor:string
    orderTotal:number;
    orderStatus:string;
    orderDetails:Details[];
}

export interface Place {
    floor:string;
    Table:Table[];
    showDetail:boolean;
}

export interface Table{
    Name:string;
    Order:number[];
    Total:number;
    Statut:string;
}

export interface Details{
    id:number;
    model:string;
    name:string;
    image:string;
    price:number;
    Quantity:number;
}

export interface Catalog{
    id:number;
    name:string;
    drink:Drink[];
}

export interface Drink{
    id:number;
    name:string;
    price:number;
    image:string;
    model:string;
}

export class Slide{
    public id:number;
    public items:Drink[];
    constructor(id:number,items:[]){
        this.id=id;
        this.items=items;
    }
    
}
 