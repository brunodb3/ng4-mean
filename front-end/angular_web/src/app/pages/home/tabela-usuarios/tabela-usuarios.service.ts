/**
 *  tabela-usuarios.service.ts
 *    - Tabela usuarios service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';

/* Importing custom providers */
import { UtilsService } from '../../../services/utils.service'

/* Creating the service (injectable) */
@Injectable()
export class TabelaUsuariosService {

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
    let params: URLSearchParams = new URLSearchParams();
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('session_token')
    });

    /* Assigning query parameters */
    if (query.name) { params.set('nome', query.name); }
    if (query.email) { params.set('email', query.email); }

    /* Assigning the request options */
    let requestOptions: RequestOptions = new RequestOptions({
      params: params,
      headers: headers
    });

    /* Returns the promise */
    return this.authHttp
      .get(this.utilsService.getApiUrl() + 'api/usuarios', requestOptions)
      .toPromise()
      .then(this.utilsService.extractData)
      .catch(this.utilsService.handleError);
  }

  /**
   * Sends the "delete usuario" request
   * @param {Object} query Query to send to database
   */
  removeUsuario(query) {
    /* Setting headers and options */
    let params: URLSearchParams = new URLSearchParams();
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('session_token')
    });

    /* Checking if query parameters were provided */
    if (!query.email) {
      /* Rejects the promise if there was no email provided */
      return Promise.reject({
        success: false,
        message: 'Informe um email válido para a busca'
      });
    }

    /* Setting the query parameters */
    params.set('email', query.email);

    /* Assigning the request options */
    let requestOptions: RequestOptions = new RequestOptions({
      params: params,
      headers: headers
    });

    /* Returns the promise */
    return this.authHttp
      .delete(this.utilsService.getApiUrl() + 'api/usuarios', requestOptions)
      .toPromise()
      .then(this.utilsService.extractData)
      .catch(this.utilsService.handleError);
  }

}
