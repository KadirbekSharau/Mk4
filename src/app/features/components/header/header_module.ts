import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Header } from './header';
import { AppRoutingModule } from 'src/app/features/routing/app-routing.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    Header
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    AppRoutingModule,
  ],
  exports: [
      Header,
  ],
  providers: [],
})
export class HeaderModule { }
