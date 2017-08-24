/**
 *  auth-guard.service.ts
 *    - Auth guard service (provider) definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

/* Importing custom providers */
import { UtilsService } from './utils.service';

/* Creating the service (injectable) */
@Injectable()
export class AccessGuard implements CanActivate {

  constructor(
    private router: Router,
    private utilsService: UtilsService
  ) {}

  /**
   * Stops a route from loading if token is invalid or expired
   */
  canActivate() {
    /* Checking if token is valid */
    if (tokenNotExpired('session_token')) {
      console.log('token valid, user admin');
      if (this.utilsService.decodeToken().decoded.nivel_acesso == 1) {
        /* Token is valid and user is administrator, allow route to load */
        return true;
      }

      console.log('token valid, user NOT admin');
      /* Token is valid but user is not administrator, redirect to login */
      this.router.navigate(['/home']);
      return false;
    }

    console.log('token NOT valid');
    /* Token is not valid, redirect to login */
    this.router.navigate(['/login']);
    return false;
  }

}
