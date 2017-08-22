/**
 *  app.routing.ts
 *    - Defines the app's routes
 *  
 ******************************************************************************/

/* Importing modules */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Importing custom components */
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

/* Importing custom providers */
import { AuthGuard } from './services/auth-guard.service';

/* Defining the app's routes */
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' }
];

/* Exporting the module (with all the providers), defining the routes as root */
export const CustomRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
