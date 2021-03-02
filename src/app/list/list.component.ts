import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import{Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listObj:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.listObj=this.us.getlist().subscribe(
      res=>{ 
        if(res["message"]=="success"){
          this.listObj=res["list"] 
          console.log(this.listObj);
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
  adminLogout(){
    //clear local storage
    localStorage.clear();
    //navigate to home
    this.router.navigateByUrl("/home");
  }
  delete(ing:number){
    let obj=this.listObj[ing];
    console.log("the deleted obj is ",obj)

    this.us.deleteProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed successfully");
          window.location.reload();
        
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
}
