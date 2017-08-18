/**
 *  home.component.ts
 *    - Home component definition
 *  
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';

/* Creating the component */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /* Global Variables */
  public routeName:String = 'Home';

  constructor() {
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
  }

}
