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
}
