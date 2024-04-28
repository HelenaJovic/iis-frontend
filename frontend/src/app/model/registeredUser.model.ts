import { User } from "./user.model";

export interface RegisteredUser extends User {
 
    id?: number;
    isStudent:false;
  }