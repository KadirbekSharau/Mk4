import { Component, OnInit } from '@angular/core';
import DG from '2gis-maps';
import { HomeServices } from 'src/app/core/services/home_services';
import {
  AddressInfo,
  Form,
  Location,
  PointAddress,
} from 'src/app/core/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from 'src/app/service/form_service/form.service';
import { Loader, google } from 'google-maps';

/* Home page component */
@Component({
  selector: 'home-page',
  templateUrl: './home_page.ng.html',
  styleUrls: ['./home_page.scss'],
})
export class HomePage implements OnInit {
  address!: PointAddress;
  form!: FormGroup;
  forms: Form[] = [];
  title = 'Mk4';
  id: string | null = null;
  map: any;
  zoom = 15;
  location: Location = {
    lat: null,
    lng: null,
  };
  google!: google;
  current: {
    address: AddressInfo | null;
    marker: any;
    coordinates: any[];
    polyline: any;
    confirm: boolean;
  } = {
    address: null,
    marker: null,
    coordinates: [],
    polyline: null,
    confirm: false,
  };
  constructor(
    private services: HomeServices,
    private router: Router,
    private route: ActivatedRoute,
    private formServices: FormService
  ) {}
  ngOnInit() {
    this.getCoords();
    this.initGoogle();

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

    this.id = this.route.snapshot.queryParamMap.get('id') || null;
    if (this.id) {
      this.getDetail(this.id);
    }

    
  }

  getPointFromQueryParams(){
    try {
      const point = JSON.parse(
        this.route.snapshot.queryParamMap.get('point') || '[]'
      );
      if (!Number.isNaN(point[0]) && !Number.isNaN(point[1])) {
        this.handleGetLocation({ lat: point[0], lng: point[1] });
      }
    } catch (err) {}
  }

  async initGoogle() {
    const key = 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk';
    const loader = new Loader(key, { libraries: ['geometry'] });
    const google = await loader.load();
    this.google = google;
  }

  handleGetLocation(location: Location) {
    const { lat, lng } = location;
    if (lat && lng && this.map) {
      if (!this.current.marker || !this.current.confirm) {
        this.services
          .getMapPoint({ lat, lng })
          .subscribe(({ pos, address, boundedBy }) => {
            const point = this.formatPoint(pos);
            if (address.kind !== 'house') {
              this.zoom = Math.min(17, Math.max(this.zoom + 1, 15));
              this.map.setView([lat, lng], this.zoom);
            } else {
              if (this.current?.marker)
                this.current.marker.removeFrom(this.map);

              //set current pick
              const marker = DG.marker(point)
                .addTo(this.map)
                .bindPopup('Выберите границу');
              this.current = {
                address,
                marker,
                coordinates: [],
                polyline: null,
                confirm: false,
              };
              this.map.setView(point, 17);
              this.updateFormByAddress(point);
            }
          });
      } else {
        this.handlePickArea(location);
      }
    }
  }

  onConfirm() {
    this.current.confirm = true;
  }

  onReset() {
    this.current.coordinates.forEach((marker) => marker.removeFrom(this.map));
    this.current.coordinates = [];
    this.current.polyline?.removeFrom(this.map);
    this.current.polyline = null;
    this.form.patchValue({ area: null });
  }

  onCancel() {
    this.onReset();
    this.form.patchValue({
      area: null,
      city: null,
      street: null,
      house: null,
      apartment: null,
    });
    this.current.marker.removeFrom(this.map);
    this.current.marker = null;
    this.current.confirm = false;
  }

  handlePickArea({ lat, lng }: Location) {
    const { coordinates } = this.current;
    if (lat && lng && this.map) {
      const icon = DG.icon({
        iconUrl:
          'https://e7.pngegg.com/pngimages/988/1015/png-clipart-computer-icons-circle-amber-3d-computer-graphics-orange-thumbnail.png',
        iconSize: [12, 12],
      });
      const marker = DG.marker([lat, lng], {
        draggable: true,
        icon,
      }).addTo(this.map);
      marker.on('drag', this.drawArea.bind(this));
      coordinates.push(marker);
      if (coordinates.length > 2) {
        this.drawArea();
      }
    }
  }

  drawArea() {
    const { coordinates, polyline } = this.current;
    const map = this.map;

    if (coordinates?.length > 2 && map) {
      // remove the original polyline
      if (polyline) polyline.removeFrom(map);
      // создаем ломаную из массива географических точек
      const polyCoords: [number, number][] = coordinates.map((marker) => [
        marker._latlng.lat,
        marker._latlng.lng,
      ]);
      // to complete the image
      polyCoords.push(polyCoords[0]);
      const newPolyline = DG.polyline(polyCoords, {
        color: '#f7963a',
      }).addTo(map);
      this.current.polyline = newPolyline;
      // подстраиваем центр карты и масштаб, чтобы ломаную было видно
      map.fitBounds(newPolyline.getBounds());
      const area = this.getArea(polyCoords);
      this.form.patchValue({ area });
    }
  }

  getArea(coordinates: [number, number][]) {
    if (this.google) {
      const path = coordinates.map(
        ([lat, lng]) => new google.maps.LatLng(lat, lng)
      );
      const area = google.maps.geometry.spherical.computeArea(path);
      return area;
    }
    return 0;
  }

  updateFormByAddress(point: number[]) {
    if (this.current?.address && this.current?.address?.kind === 'house') {
      this.form.patchValue({
        city:
          this.current.address.components.find((el) => el.kind == 'locality')
            ?.name || null,
        street:
          this.current.address.components.find((el) => el.kind == 'street')
            ?.name || null,
        house:
          this.current.address.components.find((el) => el.kind == 'house')
            ?.name || null,
        point: { lat: point[0], lng: point[1] },
      });
    }
  }

  initMap() {
    DG.then(() => {
      this.map = DG.map('map', {
        center: [this.location.lat, this.location.lng],
        zoom: this.zoom,
      });
      this.map.on('click', (res: any) => this.handleGetLocation(res.latlng));
      this.getPointFromQueryParams()
    });
  }

  write() {
    console.log('Hey');
  }

  formatPoint(location: string) {
    return location
      .split(' ')
      .map((el) => Number(el))
      .reverse();
  }

  getDetail(id: string) {
    this.formServices.getById(Number(id)).subscribe((res) => {
      const { house, address, userId, id, ...rest } = res;
      this.form.patchValue({ ...rest, ...house, ...address });
      console.log(res);
    });
  }

  onSubmit() {
    const { extra, area, cad, apartment, house, street, city, ...rest } =
      this.form.value;

    const data = {
      ...rest,
      address: {
        city,
        street,
        house,
        apartment,
      },
      house: {
        cad,
        area,
        extra,
      },
    };
    if (this.id) {
      this.services.updateForm(data, this.id).subscribe((forma) => {
        console.log(data);
        this.forms.push(forma);
      });
    } else {
      this.services.postForm(data).subscribe((forma) => {
        console.log(data);
        this.forms.push(forma);
      });
    }
  }

  getCoords() {
    const handleResponse = ({
      coords,
    }: {
      coords: { latitude: number; longitude: number };
    }) => {
      const { latitude: lat, longitude: lng } = coords;
      this.location = { lat, lng };
      this.initMap();
    };

    const handleError = () => {
      this.location = { lat: 43.222015, lng: 76.85125 };
      this.initMap();
    };
    navigator.geolocation.getCurrentPosition(handleResponse, handleError);
  }

  clearForm() {
    this.form.reset();
  }
}
