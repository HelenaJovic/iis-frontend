import { Role } from "./userRole.model";

export interface User {
  id?: number;
  name: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  roles:Role[]

}
