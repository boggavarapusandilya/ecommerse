import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef:any){
    let userCredObj=formRef.value;
  console.log(userCredObj);
  //if user
  if(userCredObj.usertype=="user"){
    this.us.loginUser(userCredObj).subscribe(
      res=>{
        if(res["message"]=="success"){
          //store token and username in local storage

          localStorage.setItem("token",res["signedToken"])
          localStorage.setItem("username",res["username"])

          //navigate to user dashboard
          this.router.navigateByUrl("home")
        }
        else{
          alert(res["message"]);
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err)
      }
    )
  }
  if(userCredObj.usertype=="admin"){
    this.us.loginadmin(userCredObj).subscribe(
      res=>{
        if(res["message"]=="success"){
          //store token and username in local storage

          localStorage.setItem("token",res["signedToken"])
          localStorage.setItem("username",res["username"])

          //navigate to user dashboard
          this.router.navigateByUrl("admin")
        }
        else{
          alert(res["message"]);
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err)
      }
    )
  }
}
}

