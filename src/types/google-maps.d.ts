
declare namespace google.maps {
  export class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
  }

  export interface MapOptions {
    center: LatLng | LatLngLiteral;
    zoom: number;
    mapTypeId?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export class Marker {
    constructor(opts: MarkerOptions);
  }

  export interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map: Map;
    title?: string;
    icon?: string | Icon | Symbol;
  }

  export interface Icon {
    url: string;
    scaledSize?: Size;
  }

  export interface Symbol {
    path: SymbolPath | string;
    fillColor?: string;
    fillOpacity?: number;
    strokeWeight?: number;
    scale?: number;
  }

  export enum SymbolPath {
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW,
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW
  }

  export class Size {
    constructor(width: number, height: number);
  }

  export class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: string) => void): void;
  }

  export interface GeocoderRequest {
    address?: string;
    location?: LatLng | LatLngLiteral;
  }

  export interface GeocoderResult {
    geometry: {
      location: LatLng;
    };
    formatted_address: string;
  }
}

declare namespace google.maps.places {
  export class Autocomplete {
    constructor(inputField: HTMLInputElement, options?: AutocompleteOptions);
    addListener(event: string, handler: () => void): void;
    getPlace(): PlaceResult;
  }

  export interface AutocompleteOptions {
    types?: string[];
  }

  export interface PlaceResult {
    formatted_address?: string;
  }
}
