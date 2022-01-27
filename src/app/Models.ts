export class User {
    userName:string;
    userPassword:string;
    constructor(private user:string, private password:string ){
        this.userName=this.user ;
        this.userPassword=this.password;
    }
}