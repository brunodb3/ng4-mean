/**
 *  app.routing.ts
 *    - Defines the app's routes
 *  
 ******************************************************************************/

/* Importing modules */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

/* Importing custom components */
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* Defining the app's routes */
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: '/404' }
];

/* Exporting the module (with all the providers), defining the routes as root */
export const CustomRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);