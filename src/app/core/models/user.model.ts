import { RoleType } from "../types/role.type";

export default interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  role: RoleType;
}
