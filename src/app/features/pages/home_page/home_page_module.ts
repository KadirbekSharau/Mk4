import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from './home_page';
import { AppRoutingModule } from 'src/app/features/routing/app-routing.module';
import { HeaderModule } from 'src/app/features/components/header/header_module';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    AppRoutingModule,
  ],
  exports: [HomePage],
  providers: [],
  bootstrap: [HomePage]
})
export class HomePageModule { }