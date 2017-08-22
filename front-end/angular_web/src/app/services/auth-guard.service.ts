/**
 *  auth-guard.service.ts
 *    - Auth guard service (provider) definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

/* Creating the service (injectable) */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  /**
   * Stops a route from loading if token is invalid or expired
   */
  canActivate() {
    /* Checking if token is valid */
    if (tokenNotExpired('session_token')) {
      console.log('token valid');
      /* Token is valid, allow route to load */
      return true;
    }

    console.log('token NOT valid');
    /* Token is not valid, redirect to login */
    this.router.navigate(['/login']);
    return false;
  }

}
