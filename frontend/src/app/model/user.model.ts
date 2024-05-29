import { Role } from '../feature-moduls/sessions/model/userRole.model';

export interface User {
  id?: number;
  email: String;
  password: String;
  name: String;
  lastName: String;
  username: String;
  roles: Role[];
}
