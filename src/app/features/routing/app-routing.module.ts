import { FormsPage } from './../pages/forms_page/forms_page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../pages/home_page/home_page';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'forms', component: FormsPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
