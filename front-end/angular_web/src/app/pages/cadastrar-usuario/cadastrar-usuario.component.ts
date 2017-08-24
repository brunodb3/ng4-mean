/**
 *  cadastrar-usuario.component.ts
 *    - Cadastrar usuario component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service';
import { CadastrarUsuarioService } from './cadastrar-usuario.service';

/* Creating the component */
@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  /* Global Variables */
  private userCreateForm;
  private currentUser: any;
  private routeName: string = 'Cadastrar Usuario';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private cadastrarUsuarioService: CadastrarUsuarioService,
    private notificationsService: NotificationsService
  ) {
    /* Building the user form */
    this.userCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      access_level: ['0', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    this.currentUser = this.utilsService.decodeToken().decoded;
  }

  /**
   * Sends the "create" request
   */
  sendCreate() {
    this.cadastrarUsuarioService.createUsuario(this.userCreateForm.value)
      .then((response: any) => {
        /* Checking if request successful */
        if (!response.success) {
          this.notificationsService.alert('Erro', response.message);
          return;
        }

        /* Success message */
        this.notificationsService.create('Sucesso', response.message);
        this.router.navigate(['/home']);
      }, (error) => {
        this.notificationsService.alert('Erro', error.message);
      });
  }

}
