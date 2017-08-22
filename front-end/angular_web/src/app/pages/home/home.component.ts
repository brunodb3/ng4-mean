/**
 *  home.component.ts
 *    - Home component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* Importing custom providers */
import { HomeService } from './home.service';
import { UtilsService } from '../../services/utils.service';

/* Creating the component */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /* Global Variables */
  private userList: Array < any > ;
  private routeName: string = 'Home';

  constructor(
    private router: Router,
    private homeService: HomeService,
    private utilsService: UtilsService
  ) {}

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    console.log(this.utilsService.decodeToken());

    this.getUsuarios();
  }

  /**
   * Sends the "get usuario" request
   */
  getUsuarios() {
    this.homeService.getUsuarios({})
      .then((success: any) => {
        console.log(success);
        // this.userList = success;
      }, (error: any) => {
        console.log(error);
      });
  }

}
