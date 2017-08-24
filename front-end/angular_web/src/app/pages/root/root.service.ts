/**
 *  root.service.ts
 *    - Root service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service';

/* Creating the service (injectable) */
@Injectable()
export class RootService {

  constructor(
    private http: Http,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  /**
   * Logs the user out
   */
  sendLogout() {
    localStorage.removeItem('session_token');
    this.router.navigate(['/login']);
  }

}
