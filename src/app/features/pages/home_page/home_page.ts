import { Component, OnInit } from '@angular/core';
import  DG  from '2gis-maps';
import { HomeServices } from 'src/app/core/services/home_services';
import { Form, MapPoint, PointAddress } from 'src/app/core/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from 'src/app/service/form_service/form.service';

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
  id: string | null = null;
  constructor(private services: HomeServices, private router: Router,
    private route: ActivatedRoute, private formServices: FormService) {

  }
  ngOnInit() {
  
    this.form = new FormGroup({
      first: new FormControl(null, [Validators.required]),
      last: new FormControl(null, [Validators.required]),
      middle: new FormControl(null),
      iin: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      point: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      apartment: new FormControl(null),
      cad: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      extra: new FormControl(null),

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
            const loc = point.pos.split(" ").map((el) => Number(el)).reverse();
            this.form.patchValue({
              city: point.address.components.find(el => el.kind == 'locality')!.name,
              street: point.address.components.find(el => el.kind == 'street')!.name,
              house: point.address.components.find(el => el.kind == 'house')!.name,
              point: {lat: loc[0], lng: loc[1]}
            });
            console.log(point)
          }
        })
      );
      DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
    });

    this.id = this.route.snapshot.queryParamMap.get('id') || null;
    console.log(this.id)
    if (this.id) {
      this.getDetail(this.id)
    }
  }

  write() {
    console.log('Hey');
  }

  getDetail(id: string) {
    this.formServices.getById(Number(id)).subscribe(res => {
      const {house, address, userId, id, ...rest} = res
      this.form.patchValue({...rest, ...house, ...address, })
      console.log(res)
    })
  }

  onSubmit() {
    const {extra, area, cad, apartment, house, street, city, ...rest} = this.form.value

const data = {
    ...rest,
    address: {
        city, 
        street,
        house,
        apartment
    },
    house: {
        cad,
        area,
        extra
    }
}
  if (this.id) {
    this.services.updateForm(data, this.id).subscribe(forma => {
      console.log(data)
      this.forms.push(forma);
    });
  }
  else {
    this.services.postForm(data).subscribe(forma => {
      console.log(data)
      this.forms.push(forma);
    });
  }
  }

  clearForm() {
    this.form.reset()
  }
}
