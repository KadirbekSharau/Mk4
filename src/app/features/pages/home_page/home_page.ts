import { Component, OnInit } from '@angular/core';
import  DG  from '2gis-maps';

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
  ngOnInit() {
    var map;
    DG.then(function () {
      map = DG.map('map', {
          center: [54.98, 82.89],
          zoom: 13
      });
      map.on("click", (res: any)=>console.log(res.latlng));
      DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
  });
  }

  write() {
    console.log('Hey');
  }
}
