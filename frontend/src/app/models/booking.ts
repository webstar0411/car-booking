import {Waypoint} from './waypoint';

export interface Booking {
  id: number;
  name: string;
  phone: string;
  asap: boolean;
  pickup_time: string;
  waiting_time: string;
  number_of_passengers: number;
  price: number;
  rating: number;
  created_on: string;
  modified_on: string;
  waypoint: Waypoint;
}
