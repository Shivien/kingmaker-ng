import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import User from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import AuthResponse from "../models/auth-response.model";

const LOCALSTORAGEKEY_TOKEN = '/kingmaker/auth/token';
const LOCALSTORAGEKEY_USER = '/kinmaker/auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly httpClient = inject(HttpClient);

  public readonly currentUser = signal<User | null>(this.getUser());
  public readonly token = signal<string | null>(this.getToken());

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/google`, { idToken}).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.setUser(res.user);
      })
    )
  }

  logout(): void {
    this.setToken(null);
    this.setUser(null);
  }

  private getUser(): User | null {
    const userJson = localStorage.getItem(LOCALSTORAGEKEY_USER);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setUser(user: User | null) {
    if (user === null) {
      localStorage.removeItem(LOCALSTORAGEKEY_USER);
      this.currentUser.set(null);
      return;
    }
    localStorage.setItem(LOCALSTORAGEKEY_USER, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private getToken(): string | null {
    const tokenJson = localStorage.getItem(LOCALSTORAGEKEY_TOKEN);
    return tokenJson ? JSON.parse(tokenJson) : null;
  }

  private setToken(token: string | null) {
    if (token === null) {
      localStorage.removeItem(LOCALSTORAGEKEY_TOKEN);
      this.token.set(null);
      return;
    }
    localStorage.setItem(LOCALSTORAGEKEY_TOKEN, JSON.stringify(token));
    this.token.set(token);
  }

}
