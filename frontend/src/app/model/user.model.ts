import { Role } from "../feature-moduls/model/userRole.model";

export interface User {
 
  id?: number;
  email: String;
  password: String;
  name: String;
  username : String
  roles: Role[]
}
