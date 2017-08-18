import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
