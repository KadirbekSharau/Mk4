import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from './home_page';
import { AppRoutingModule } from 'src/app/features/routing/app-routing.module';
import { HeaderModule } from 'src/app/features/components/header/header_module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MapsModule } from '@syncfusion/ej2-angular-maps';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MapsModule,
  ],
  exports: [HomePage],
  providers: [],
  bootstrap: [HomePage]
})
export class HomePageModule { }