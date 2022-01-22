import { Component, OnInit } from '@angular/core';
import  DG  from '2gis-maps';
import { HomeServices } from 'src/app/core/services/home_services';
import { Form, MapPoint, PointAddress } from 'src/app/core/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Home page component */
@Component({
  selector: 'home-page',
  templateUrl: './home_page.ng.html',
  styleUrls: ['./home_page.scss']
})
export class HomePage implements OnInit {

  address!: PointAddress;
  form!: FormGroup;
  forms: Form[] = [];
  title = 'Mk4';
  constructor(private services: HomeServices) {

  }
  ngOnInit() {
    this.form = new FormGroup({
      surname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      fathername: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      flat: new FormControl(null, [Validators.required]),

  });

    var map;
    DG.then( () => {
      map = DG.map('map', {
          center: [54.98, 82.89],
          zoom: 13
      });
      map.on("click", (res: any)=>
        this.services.getMapPoint(res.latlng)
        .subscribe(point => {
          if (point.address.kind == 'house') {
            this.form.patchValue({
              city: point.address.components.find(el => el.kind == 'locality')!.name,
              street: point.address.components.find(el => el.kind == 'street')!.name,
              house: point.address.components.find(el => el.kind == 'house')!.name,
            });
            console.log(point)
          }
        })
      );
      DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
  }

  write() {
    console.log('Hey');
  }

  onSubmit() {
    this.services.postForm(this.form.value)
    .subscribe(forma => {
      console.log(this.form.value)
      this.forms.push(forma);
    });
    this.form.reset();
  }

  clearForm() {
    this.form.reset()
  }
}
