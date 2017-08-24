/**
 *  editar-usuario.component.ts
 *    - Editar usuario component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

/* Importing custom providers */
import { UtilsService } from '../../services/utils.service';
import { EditarUsuarioService } from './editar-usuario.service';

/* Creating the component */
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  /* Global Variables */
  private userEditForm;
  private userToEdit: any;
  private oldUserInfo: any;
  private currentUser: any;
  private routeName: string = 'Editar Usuario';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private editarUsuarioService: EditarUsuarioService,
    private notificationsService: NotificationsService
  ) {
    this.userToEdit = {};
    this.oldUserInfo = {};

    /* Building the user form */
    this.userEditForm = this.formBuilder.group({
      access_level: [''],
      new_password: [''],
      name: ['', Validators.required],
      old_password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /* Initializes the form as common user (validation for "old_password") */
  initializeFormAsCommon() {
    /* Building the user form */
    this.userEditForm = this.formBuilder.group({
      new_password: [''],
      access_level: [''],
      name: ['', Validators.required],
      old_password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /* Initializes the form as admin (no validation for "old_password") */
  initializeFormAsAdmin() {
    /* Building the user form */
    this.userEditForm = this.formBuilder.group({
      new_password: [''],
      old_password: [''],
      name: ['', Validators.required],
      access_level: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    this.currentUser = this.utilsService.decodeToken().decoded;

    /* Checking if user is admin, no validation needed for "old_password" */
    if (this.currentUser.nivel_acesso == 1) {
      this.initializeFormAsAdmin();
    } else {
      this.initializeFormAsCommon();
    }

    /* Getting route parameters */
    this.activatedRoute.params
      .subscribe((params) => {
        /* Getting the 'usuario' on the database, by email */
        this.editarUsuarioService.getUsuarios({ email: params.userEmail })
          .then((response) => {
            /* Checking if any user was found */
            if (!response.success) {
              this.notificationsService.alert('Erro', response.message);
              return;
            }

            /* Assigning user to edit */
            this.userToEdit = response.usuarios[0];
            this.oldUserInfo = response.usuarios[0];
            this.userEditForm.controls['email']
              .setValue(this.userToEdit.email);
            this.userEditForm.controls['name']
              .setValue(this.userToEdit.nome);
            this.userEditForm.controls['access_level']
              .setValue(this.userToEdit.nivel_acesso);
          });
      });
  }

  /**
   * Sends the "update" request
   */
  sendEdit() {
    let query = this.oldUserInfo;
    let userInfo = this.userEditForm.value;
    query.password = this.userEditForm.value.old_password;

    this.editarUsuarioService.updateUsuario(query, userInfo)
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
