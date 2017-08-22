/**
 *  utils.service.ts
 *    - Utilities service
 *  
 ******************************************************************************/

/* Importing modules */
import { JwtHelper } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

/* Creating the service (injectable) */
@Injectable()
export class UtilsService {

  /* Class variables */
  private apiUrl: string = 'http://localhost:8080/';
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor() {}

  /**
   * Returns the API url
   */
  getApiUrl() {
    return this.apiUrl;
  }

  /**
   * Decodes the local JWT
   */
  decodeToken() {
    let token = localStorage.getItem('session_token');

    return {
      decoded: this.jwtHelper.decodeToken(token),
      is_expired: this.jwtHelper.isTokenExpired(token),
      expiration_date: this.jwtHelper.getTokenExpirationDate(token),
    };
  }

  /**
   * Handles errors on the http request
   * @param {Response} error Error object
   */
  handleError(error: Response | any) {
    console.log('Error response', error);
    return Promise.reject(JSON.parse(error._body));
  }

  /**
   * Returns the data from the http body response
   * @param {Response} res Response object
   */
  extractData(res: Response | any) {
    console.log('Success response', res);
    return JSON.parse(res._body);
  }

}
