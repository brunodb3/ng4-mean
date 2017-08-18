/**
 *  not-found.component.ts
 *    - Not found component definition
 *  
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';

/* Creating the component */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  /* Global Variables */
  public routeName:String = 'Not Found';

  constructor() {
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
  }

}
