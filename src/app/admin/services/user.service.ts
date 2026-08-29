import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ListResponse from "../../shared/models/list-response.model";
import User from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/admin/users`;
  private readonly httpClient = inject(HttpClient);

  list() {
    return this.httpClient.get<ListResponse<User>>(this.apiUrl);
  }

}
