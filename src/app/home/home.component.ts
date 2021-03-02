import { Component, OnInit } from '@angular/core';
import{UserService} from'../user.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    {path: '/assets/fa-4.jpg'},
    {path: '/assets/fa-3.jpg'},
    {path: '/assets/fa-1.jpg'},
    {path: '/assets/fa-2.jpg'},
    {path: '/assets/fa-5.jpeg'},
];
listObj:any;
status=false;
logername:any;
pbrand!:any;


  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
   if(localStorage.username){
     this.logername=localStorage.username;

     console.log(localStorage.username)
    this.status=true;
   }

    this.listObj=this.us.getlist().subscribe(
      res=>{ 
        if(res["message"]=="success"){
          this.listObj=res["list"] 
          }
        else{
          alert(res["message"])
         
        }
      }, 
      err=>{ 
        alert("Something went wrong") 
        console.log(err)
       }
  )

  }
 
  userLogout(){
    //clear local storage
    localStorage.clear();
    this.router.navigateByUrl("home");
    this.router.navigateByUrl("/");
    window.location.reload();

  
  }
 viewcart(){
  this.router.navigateByUrl("usercom")
 }
 viewitem(n:number){
    
  let viewObj=this.listObj[n];
  console.log("first ",viewObj);
  this.us.viewItem(viewObj).subscribe(
    res=>{
      if(res["message"]){
        localStorage.setItem("token",res["signedToken"])
        localStorage.setItem("productname",res["productname"])
        this.router.navigateByUrl("/view");
      }
    },
    err=>{
      alert("Something went wrong in getting details")
      console.log(err)
    }
  )
}
  

  additems(n:number){
    if(localStorage.username){
      let obj={
      username:localStorage.username,
      productbrand:this.listObj[n].pbrand,
      productname:this.listObj[n].pname,
      model:this.listObj[n].pmodel,
      price:this.listObj[n].pprice,
      colour:this.listObj[n].pcol,
      productImgLink:this.listObj[n].userImgLink
      }
      console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){
            alert("this product already exists in your cart");
          }
          else{
            
            alert("Product added to cart")
            this.router.navigateByUrl("usercom")
          }
        },
        err=>{
          alert("Something went wrong in Adding Cart")
        console.log(err)
        }
      )
      
    }
    else{
      alert("please login with your account first to add items to your cart");
      this.router.navigateByUrl("/signin");
    }
  }
    }
 
  

    
    
  
