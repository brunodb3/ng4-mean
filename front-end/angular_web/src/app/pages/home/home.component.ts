/**
 *  home.component.ts
 *    - Home component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

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
  private currentUser: any;
  private routeName: string = 'Home';

  constructor(
    private router: Router,
    private homeService: HomeService,
    private utilsService: UtilsService,
    private notificationsService: NotificationsService
  ) {}

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    this.currentUser = this.utilsService.decodeToken().decoded;
  }

}
