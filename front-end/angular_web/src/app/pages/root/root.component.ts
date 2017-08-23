/**
 *  root.component.ts
 *    - Root component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as NavigationEvent
} from '@angular/router';

/* Creating the component */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  /* Global Variables */
  private currentUrl: String;
  private notificationOptions: any;
  private routeName: String = 'Root';
  private burgerMenu: Boolean = false;

  constructor(
    private router: Router
  ) {
    /* Angular Notification module options variable */
    this.notificationOptions = {
      timeOut: 2500,
      pauseOnHover: true,
      clickToClose: true,
      showProgressBar: true
    };

    /* Listening for each navigation event */
    router.events.forEach((event: NavigationEvent) => {
      /* Navigation End event (route has been loaded) */
      if (event instanceof NavigationEnd) {
        /* Assigning the current url to a class variable */
        this.currentUrl = event.url;
      }
    });
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {}

}
