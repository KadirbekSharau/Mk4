export interface AddressBoundedBy {
    lowerCorner: string
    upperCorder: string
  };
  
  export interface AddressComponent {
    kind: string
    name: string
  };
  
  export interface AddressInfo  {
    components: AddressComponent[];
    formatted: string;
    kind: string;
    precision: string;
  };
  
  export interface GetLocationInfo  {
    pos: string;
    boundedBy: AddressBoundedBy;
    address: AddressInfo;
  };

  export interface Point  {
    lat: number;
    lng: number;
    alt: number | null;
  }

  export interface MapPoint  {
    lat: number;
    lng: number;
  }

  export interface PointAddress  {
    city: string;
    street: string;
    house: string
  }
  
  export interface Address  {
    city: string;
    street: string;
    house: string;
    apartment: string | null;
  }
  
  export interface House  {
    cad: string;
    area: number;
    extra: string;
  }
  
  export interface Form  {
    id: number;
    userId: number;
    first: string;
    last: string;
    middle: string | null;
    iin: string;
    point: Point;
    address: Address;
    house: House;
  }