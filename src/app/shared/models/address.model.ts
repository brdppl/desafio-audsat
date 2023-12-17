interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  city: string;
  geo: IGeo;
  street: string;
  suite: string;
  zipcode: string;
}