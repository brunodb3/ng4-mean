/**
 *  home.service.ts
 *    - Home service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service'

/* Creating the service (injectable) */
@Injectable()
export class HomeService {

  constructor(
    private authHttp: AuthHttp,
    private utilsService: UtilsService
  ) {}

  /**
   * Sends the "get usuario" request
   * @param {Object} query Query to send to database
   */
  getUsuarios(query) {
    /* Setting headers and options */
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('session_token')
    });
    let options = new RequestOptions({ headers: headers });

    /* Returns the promise */
    return this.authHttp
      .get(this.utilsService.getApiUrl() + 'api/usuarios', options)
      .toPromise()
      .then(this.utilsService.extractData)
      .catch(this.utilsService.handleError);
  }

}
