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

    
export class Location {
    public Floor!: string;
    public Table!: Table[];
}

export class Table{
    public TableId!: number;
    public Name!: string;
    public Status!: string;
}

export class OrderItem{
    public Item!: Item;
    public ItemQuantity!: number;
    public ItemModel:ItemModel;
}

export class Catalog{
    public CatalogId!: number;
    public CatalogName!: string;
    public CatalogDescription!: string;
    public CatalogImage!: string;
    public CatalogItems!: Item[];
}
export class Item{
    public ItemId!: number;
    public ItemName!: string;
    public ItemPrice!: number;
    public ItemDescription!:string;
    public ItemImage!: string;
    public ItemModels: ItemModel[];
    public ItemProvider: string='';
}

export class ItemModel {
    public Model: string;
    public Price: number;
}








 