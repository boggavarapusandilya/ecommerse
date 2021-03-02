import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import{Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username;
  cart:any;

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("home");
  }
  
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"];
        console.log(this.cart);
      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  
  }
  deletepro(i:number){
    let obj=this.cart[i];
    console.log("the deleted obj is ",obj)

    this.us.deleteCartProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from your cart")
          this.router.navigateByUrl("/");
          window.location.reload();
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }


  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

  

  }
  userLogout(){
    //clear local storage
    localStorage.clear();
    this.router.navigateByUrl("home");
  

  
  }
 


}


