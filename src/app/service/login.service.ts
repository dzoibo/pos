import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls } from 'poslibrary';
import { catchError } from 'rxjs';
import { ADLoginRequest, ModelCRUD, ModelCRUDRequest, MyData } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticateUser(email, password, language) {
    const lrequest = new ADLoginRequest();
    lrequest.user = email;
    lrequest.pass = password;
    lrequest.lang = language;
    lrequest.ClientID = '1000116';
    lrequest.RoleID = '1011698';
    lrequest.OrgID = "0";
    lrequest.WarehouseID = "0";
    lrequest.stage = "0";

//    clientid = '1000116', roleid = '1011698'

    // model crud data
    const cdata = new ModelCRUD();
    cdata.serviceType = "QueryUserData";
    cdata.TableName = "AD_User";
    cdata.Action = "Read";

    // request data
    const requestdata = new ModelCRUDRequest();
    requestdata.ModelCRUD = cdata;
    requestdata.ADLoginRequest = lrequest;

    // api request data
    const data = new MyData();
    data.ModelCRUDRequest = requestdata;

    const url = 'http://94.250.202.177:8185/ADInterface/services/rest/model_adservice/query_data';
    // make api request to login and get user data
    return this.http.post<any>(url, data)
                    .pipe(catchError(this.handleError));
}


handleError(err): any {

}


}

