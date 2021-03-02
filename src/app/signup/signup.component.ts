import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import{Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef:any){
    let userObj=formRef.value; 
    console.log(userObj);
    this.us.createUser(userObj).subscribe(
      res=>{
        
        if(res["message"]=="user existed"){
          alert("user alreay exist choose another");
         
        }
        else{
          alert("successfully registered");
          this.router.navigateByUrl("/signin")
        }
 
      },
      err=>{
        alert("something went wrong in user creation");
        console.log(err)
      }
    )
    
  }



}
