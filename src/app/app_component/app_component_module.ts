import { FormsPageModule } from './../features/pages/forms_page/forms_page_module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app_component';
import { AppRoutingModule } from 'src/app/features/routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from '../features/pages/home_page/home_page_module';
// import { MapsModule } from '@syncfusion/ej2-angular-maps';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomePageModule,
    // MapsModule,
    FormsPageModule
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }