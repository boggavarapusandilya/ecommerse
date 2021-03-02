import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{SigninComponent} from'./signin/signin.component';
import{SignupComponent} from'./signup/signup.component';
import{HomeComponent}from'./home/home.component';
import{ListComponent}from'./list/list.component';
import{UserComponent} from'./user/user.component';
import{ViewComponent} from'./view/view.component';



const routes: Routes = [
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"list",component:ListComponent},
  {path:"usercom",component:UserComponent},
  {path:"view",component:ViewComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
