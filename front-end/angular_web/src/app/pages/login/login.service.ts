/**
 *  login.service.ts
 *    - Login service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service';

/* Creating the service (injectable) */
@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private utilsService: UtilsService
  ) {}

  /**
   * Sends the login request
   * @param {Object} loginInfo Login information to send
   */
  sendLogin(loginInfo) {
    /* Checking if all the required fields have been defined */
    if (
      typeof(loginInfo.email) === 'undefined' ||
      typeof(loginInfo.password) === 'undefined') {
      /* Rejects with a promise */
      return Promise.reject({
        success: false,
        message: 'Verifique se todos os campos foram preenchidos'
      });
    }

    /* Setting headers and options */
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    /* Returning the request */
    return this.http.post(this.utilsService.getApiUrl() + 'api/login', {
        email: loginInfo.email,
        senha: loginInfo.password
      }, options)
      .toPromise()
      .then(this.utilsService.extractData)
      .catch(this.utilsService.handleError);
  }

}
