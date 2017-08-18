/**
 *  app.module.ts
 *    - The main app module file, where Angular starts
 *  
 ******************************************************************************/

/* Importing modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Importing custom components */
import { CustomRouting } from './app.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* Creating the app module */
@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CustomRouting
  ],
  providers: [],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
