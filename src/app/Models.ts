export class User {
        userId:number;
        userName:string;
        userImage:string;
        userParner:string;
    }


export interface Table{
    Name:string;
    Order:number[];
    Total:number;
    Statut:string;
}



export class Slide{
    public id:number;
    public items:Item[];
    constructor(id:number,items:[]){
        this.id=id;
        this.items=items;
    }
    
}


export class Order{
    public OrderId: string;
    public OrderLocationId: number;
    public OrderLocationName: string;
    public OrderLocationLevelName: string;
    public OrderTotalAmount: number;
    public OrderStatus: string;
    public Created: any;
    public OrderItems: OrderItem[];
    constructor(){
        this.Created=null,
        this.OrderId='',
        this.OrderLocationId=0,
        this.OrderLocationLevelName='',
        this.OrderLocationLevelName='',
        this.OrderStatus='',
        this.OrderTotalAmount=0,
        this.OrderItems=[];
    }
}

    


export class Table{
    public TableId!: number;
    public Name!: string;
    public Status!: string;
}

export  class LocationLevel {
    LocationLevelName: string;
    Locations: Location[];
}
export  class Location {
    LocationId: number;
    LocationName: string;
    LocationStatus: string;
    LocationLevelName: string;
}
export  class OrderItem {
    Item: Item;
    ItemQuantity: number;
    ItemModel: string;
}
export  class Catalog {
    CatalogId: number;
    CatalogName: string;
    CatalogDescription: string;
    CatalogImage: string;
    CatalogItems: Item[];
}
export  class Item {
    ItemId: number;
    ItemName: string;
    ItemDescription: string;
    ItemPrice: number;
    ItemImage: string;
    ItemModels: ItemModel[];
    ItemProvider: string;
}
export  class ItemModel {
    Model: string;
    Price: number;
}






 