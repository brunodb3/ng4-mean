/**
 *  home.service.ts
 *    - Home service (prodiver) definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Injectable } from '@angular/core';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service'

/* Creating the service (injectable) */
@Injectable()
export class HomeService {

  constructor(
    private utilsService: UtilsService
  ) {}

}
