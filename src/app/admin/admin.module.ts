import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import{ReactiveFormsModule}from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ]
})
export class AdminModule { }
