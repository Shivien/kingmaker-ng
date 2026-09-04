import User from "../../core/models/user.model";

export interface UpdateRoleResponse {
  message: string;
  user: User;
}
