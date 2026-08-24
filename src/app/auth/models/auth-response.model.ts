import User from "./user.model";

export default interface AuthResponse {
  token: string;
  user: User;
}
