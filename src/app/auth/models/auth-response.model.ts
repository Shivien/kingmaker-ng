import User from "../../core/models/user.model";

export default interface AuthResponse {
  token: string;
  user: User;
}
