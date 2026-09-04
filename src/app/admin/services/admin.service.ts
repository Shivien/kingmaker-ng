import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ListResponse from "../../core/models/list-response.model";
import User from "../../core/models/user.model";
import { RoleType } from "../../core/types/role.type";
import { UpdateRoleResponse } from "../models/update-role-response.model";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;
  private readonly httpClient = inject(HttpClient);

  list() {
    return this.httpClient.get<ListResponse<User>>(`${this.apiUrl}/users`);
  }

  read(id: string) {
    return this.httpClient.get<User>(`${this.apiUrl}/user/${id}`);
  }

  updateRole(id: string, role: RoleType) {
    return this.httpClient.patch<UpdateRoleResponse>(`${this.apiUrl}/user/${id}`, { role });
  }

}
