/**
 *  cadastrar-usuario.service.ts
 *    - Cadastrar usuario service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service'

/* Creating the service (injectable) */
@Injectable()
export class CadastrarUsuarioService {

  constructor(
    private authHttp: AuthHttp,
    private utilsService: UtilsService
  ) {}

  /**
   * Sends the "create usuario" request
   * @param {Object} userInfo New user info
   */
  createUsuario(userInfo) {
    /* Setting headers and options */
    let params = {
      new: {}
    };
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('session_token')
    });

    /* Setting the create parameters */
    params.new['nome'] = userInfo.name;
    params.new['email'] = userInfo.email;
    params.new['senha'] = userInfo.password;
    params.new['nivelAcesso'] = userInfo.access_level;

    /* Assigning the request options */
    let requestOptions: RequestOptions = new RequestOptions({
      headers: headers
    });

    /* Returns the promise */
    return this.authHttp
      .post(
        this.utilsService.getApiUrl() + 'api/usuarios',
        params,
        requestOptions
      )
      .toPromise()
      .then(this.utilsService.extractData)
      .catch(this.utilsService.handleError);
  }

}
