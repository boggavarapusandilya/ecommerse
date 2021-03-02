import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http';
import {Observable} from'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
  createUser(userObj:any):Observable<any>{
    console.log(userObj);
    return this.hc.post("/user/register",userObj);
  
  }
  loginUser(userCredObj:any):Observable<any>{
    console.log(userCredObj);
    return this.hc.post("/user/login",userCredObj)
  }
  loginadmin(userCredObj:any):Observable<any>{
    console.log(userCredObj);
    return this.hc.post("/user/login",userCredObj)
  }
  createproduct(proObj:any):Observable<any>{
    console.log("products is",proObj);
    
    return this.hc.post("/admin/productdetails",proObj);
  }
  getlist():Observable<any>{
    return this.hc.get("/admin/getlist/")
  }
  deleteProduct(obj:any):Observable<any>{
    console.log("products is",obj);
    
    return this.hc.post("/admin/delete",obj);
  }
  usercart(obj):Observable<any>{
    return this.hc.post("user/addtocart",obj);
  }
  getCartItems(username):Observable<any>{
    //console.log("the username is ",username)
    return this.hc.get("/user/getcartitems/"+username);
  }
  getItem(obj):Observable<any>{
    console.log("in US ",obj)
    return this.hc.get("/admin/oneproduct/"+obj);
  }
  viewItem(obj):Observable<any>{
    console.log("second",obj)
    return this.hc.post("/user/viewitem",obj)
  }
  deleteCartProduct(obj):Observable<any>{
    return this.hc.post("/user/deleteproduct",obj);
  }
  
  
  
}
