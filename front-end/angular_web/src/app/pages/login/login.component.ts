/**
 *  login.component.ts
 *    - Login component definition
 *  
 ******************************************************************************/
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

/* Importing custom providers */
import { LoginService } from './login.service';
import { UtilsService } from '../../services/utils.service';

/* Importing custom components */
import { HomeComponent } from '../home/home.component';

/* Creating the component */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* Global Variables */
  private loginForm;
  private routeName: String = 'login';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private utilsService: UtilsService,
    private notificationsService: NotificationsService
  ) {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    /* Checking if token is valid */
    if (tokenNotExpired('session_token')) {
      /* Token is valid, redirect to home */
      this.router.navigate(['/home']);
    }
  }

  /**
   * Sends the login request
   */
  sendLogin() {
    this.loginService.sendLogin(this.loginForm.value)
      .then((success: any) => {
        /* Success */
        /* Saving the JWT on localStorage */
        localStorage.setItem('session_token', success.session_token);

        this.notificationsService.success('Sucesso', success.message);
        this.router.navigate(['/home']);
      }, (error: any) => {
        /* Error */
        this.notificationsService.error('Erro', error.message);
      });
  }

}
