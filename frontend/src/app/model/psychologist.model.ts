import { User } from "./user.model";

export interface Psychologist extends User {
 
    id?: number;
    biography:string;
  }