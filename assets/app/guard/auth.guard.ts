import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('id_token')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/autenticacao/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}