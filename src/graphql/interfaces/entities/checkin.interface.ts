import { Place } from "./place.interface";
import { UserBasic } from "./user.interface";

export interface Checkin {
  id: string;
  place: Place;
  mood?: string;
  status?: string;
  checkedAt: string;
  user?: UserBasic;
  content?: string;
}

export interface CHECKINS {
  checkIns: Checkin[];
}