import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import User from "../../shared/models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import AuthResponse from "../models/auth-response.model";
import { AuthStore } from "../../shared/store/auth.store";

const LOCALSTORAGEKEY_TOKEN = '/kingmaker/auth/token';
const LOCALSTORAGEKEY_USER = '/kingmaker/auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly httpClient = inject(HttpClient);
  private readonly userStore = inject(AuthStore);

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/google`, { idToken }).pipe(
      tap((res) => {
        this.userStore.loginSuccess(res.user, res.token);
      })
    )
  }

  logout(): void {
    this.userStore.logout();
  }

}
