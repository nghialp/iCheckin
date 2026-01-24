import { Checkin } from "../entities/checkin.interface";
import { MapPlace } from "../entities/place.interface";

export interface GetHomeDataResponse {
  nearbyPlaces: MapPlace[];
  myCheckins: Checkin[];
}