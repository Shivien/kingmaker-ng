import User from "../../shared/models/user.model";

export default interface AuthResponse {
  token: string;
  user: User;
}
