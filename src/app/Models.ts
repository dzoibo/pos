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
    public Created:any;
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

export class OrderCreated{
    public OrderId: string;
    public OrderLocationId: number;
    public OrderLocationName: string;
    public OrderLocationLevelName: string;
    public OrderTotalAmount: number;
    public OrderStatus: string;
    public Created:any;
    public OrderItems: {
        ItemId:number;
        ItemName:string;
        ItemModel:string;
        ItemProvider:string;
        ItemPrice:number;
        ItemImage:string;
        ItemQuantity:number;
    }[];
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
    ItemId: number;
    Model: string;
    Price: number;
    C_UOM_ID:number;
}

export class ADLoginRequest {
    public user!: string;
    public pass!: string;
    public lang!: string;
    public ClientID!: string;
    public RoleID!: string;
    public OrgID!: string;
    public WarehouseID!: string;
    public stage!: string;
  }
  
  export class ModelCRUD {
    public serviceType!: string;
    public TableName!: string;
    public Action!: string;
    public DataRow!: DataRow;
  }
  
  export class ResponseData {
    public WindowTabData!: WindowTabData;
  }
  
  export class WindowTabData
  {
    public NumRows!: number;
    public TotalRows!: number;
    public StartRow!: number;
    public DataSet!: DataSet;
    public RowCount!: number;
    public Success!: boolean;
    public ADLoginResponse!: ADLoginResponse;
  }
  
  export class DataSet
  {
    public DataRow!: DataRow;
  }
  
  export class DataRow
  {
    public field!: field[];
  }
  
  export class field
  {
    '@column': string;
    public val!: string;
  }
  
  export class ADLoginResponse
  {
    public Token!: string;
  }
  
  
  export class ModelCRUDRequest {
    public ModelCRUD: ModelCRUD = new ModelCRUD;
    public ADLoginRequest: ADLoginRequest = new ADLoginRequest;
  }
  
  export class MyData
  {
    public ModelCRUDRequest: ModelCRUDRequest = new ModelCRUDRequest;
  }




 