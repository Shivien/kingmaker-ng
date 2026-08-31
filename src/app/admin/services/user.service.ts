import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ListResponse from "../../core/models/list-response.model";
import User from "../../core/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/admin/users`;
  private readonly httpClient = inject(HttpClient);

  list() {
    return this.httpClient.get<ListResponse<User>>(this.apiUrl);
  }

  read(id: string) {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`)
  }

}
