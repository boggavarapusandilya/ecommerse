import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import{Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  username;
  productname;
  product;
  listObj:any;

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  
    this.username=localStorage.getItem("username")
    this.productname=localStorage.getItem("productname")
    console.log("PRODUCT NAME IS ",this.productname)
    this.getProduct();
  }
  getProduct(){
    this.us.getItem(this.productname).subscribe(
      res=>{
        this.product=res["message"]
        console.log("the product is",this.product)
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }

  additem(){
    if(localStorage.username){
      let obj={
        username:localStorage.username,
        productbrand:this.product.pbrand,
        productname:this.product.pname,
        model:this.product.pmodel,
        price:this.product.pprice,
        colour:this.product.pcol,
        productImgLink:this.product.userImgLink
        }
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]){
            alert("Product added to cart")
          this.router.navigateByUrl("usercom")
          }
        },
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      alert("please..login first")
      this.router.navigateByUrl("/signin")
    }
  }
  back(){
    this.router.navigateByUrl("home")
  }


}
