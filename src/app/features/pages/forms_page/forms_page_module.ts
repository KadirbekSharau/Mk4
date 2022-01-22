import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/features/routing/app-routing.module';
import { HeaderModule } from 'src/app/features/components/header/header_module';
import { FormsPage } from './forms_page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    FormsPage
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [FormsPage],
  providers: [],
  bootstrap: [FormsPage]
})
export class FormsPageModule { }