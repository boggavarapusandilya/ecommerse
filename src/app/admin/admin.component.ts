import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
 
  //for uploading file;
  file!:File; 

  incomingfile(event:any) { 
    this.file= event.target.files[0];
   }


  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef:any){ 
    let proObj=formRef.value;
    let formData=new FormData(); //adding image and other data to FormData object 
    formData.append('photo',this.file,this.file.name); 
    formData.append("proObj",JSON.stringify(proObj))
    this.us.createproduct(formData).subscribe(
      res=>{
      
          alert("product added successfully");
          this.router.navigateByUrl("/list");
         
 
      },
      err=>{
        alert("something went wrong in user creation");
        console.log(err)
      }
    )
    
  
 

    console.log(formRef.value);
  } 
  gotolist(){
    this.router.navigateByUrl("/list");
  }

}
