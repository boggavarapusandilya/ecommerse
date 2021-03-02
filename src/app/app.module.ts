import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import{ReactiveFormsModule}from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'angular-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ListComponent,
    CartComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IvyCarouselModule,
    BrowserAnimationsModule,
    SliderModule,
    UserModule,
    AdminModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

