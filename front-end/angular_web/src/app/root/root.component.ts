/**
 *  root.component.ts
 *    - Root component definition
 *  
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';

/* Creating the component */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  /* Global Variables */
  public routeName:String = 'Root';

  constructor() {
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
  }

}
