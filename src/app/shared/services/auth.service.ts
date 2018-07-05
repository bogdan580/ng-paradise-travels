export class AuthService {

  public isAuthenticated = false;
  public isAdmin = false;
  login() {
    this.isAuthenticated = true;
  }
  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
