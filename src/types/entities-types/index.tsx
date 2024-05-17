import { colors } from "../../config/colors"

export type Theme ={
    dark:boolean
    colors: typeof colors
  }
export type Task ={
  id?:string,
  title?: string,
  time?: string,
  description?: string,
  }
export type UserInfo ={
  email?: string,
  name?: string,
  userId?: string,
  }
  export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface LocationData {
    area: string | null;
    city: string | null;
    country: string | null;
    country_short_name: string | null;
    district: string | null;
    fulladdress: string;
    geoCode: {
      lat: number;
      lng: number;
    };
    place_id: string;
    province: string;
    street_address: string | null;
    street_number: string;
    tehsil: string | null;
  }
  
