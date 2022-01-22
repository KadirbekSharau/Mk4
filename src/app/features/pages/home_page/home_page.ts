import { Component, OnInit } from '@angular/core';


/* Home page component */
@Component({
  selector: 'home-page',
  templateUrl: './home_page.ng.html',
  styleUrls: ['./home_page.scss']
})
export class HomePage implements OnInit {

  
  title = 'Mk4';
  constructor() {

  }
  ngOnInit() {}
}
