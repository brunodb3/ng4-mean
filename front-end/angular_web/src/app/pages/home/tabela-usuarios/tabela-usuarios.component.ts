/**
 *  tabela-usuarios.component.ts
 *    - Tabela usuarios component definition
 *  
 ******************************************************************************/

/* Importing modules */
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

/* Importing custom providers */
import { UtilsService } from '../../../services/utils.service';
import { TabelaUsuariosService } from './tabela-usuarios.service';

/* Creating the component */
@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.scss']
})
export class TabelaUsuariosComponent implements OnInit {

  /* Global Variables */
  private currentUser: any;
  private userList: Array < any > ;
  private routeName: string = 'Home';
  private selectedUserList: Array < any > ;
  private anyUserSelected: Boolean = false;

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private notificationsService: NotificationsService,
    private tabelaUsuariosServie: TabelaUsuariosService
  ) {
    this.selectedUserList = [];
  }

  /* Fires when everything is loaded and ready */
  ngOnInit() {
    this.getUsuarios();
  }

  /**
   * Sends the "get usuario" request
   */
  getUsuarios(query ? ) {
    /* If query was not passed, declare it empty */
    if (!query) { query = {}; }

    this.tabelaUsuariosServie.getUsuarios(query)
      .then((success: any) => {
        /* Success */
        this.userList = success.usuarios;
      }, (error: any) => {
        /* Error */
        this.notificationsService.error('Erro', error.message);
      });
  }

  /**
   * Selects an user from the table
   * @param {Object} user User to be selected
   */
  selectUser(user) {
    user.selected = !user.selected;

    if (user.selected) {
      this.anyUserSelected = true;
      this.selectedUserList.push(user);
    } else {
      this.selectedUserList.splice(this.selectedUserList.indexOf(user), 1);
    }

    /* Checking if there are no users selected */
    if (this.selectedUserList.length === 0) { this.anyUserSelected = false; }
  }

  /**
   * Selects or deselects all users
   * @param {Boolean} deselect Implies if should select or deselect
   */
  selectAllUsers(deselect) {
    /* Checks if should deselect users */
    if (deselect) {
      /* Loops the "selectedUserList" array */
      for (var i = 0; i < this.selectedUserList.length; ++i) {
        var eachUser = this.selectedUserList[i];

        eachUser.selected = false;
      }

      /* Setting the "anyUserSelected" boolean and cleaning the array */
      this.selectedUserList = [];
      this.anyUserSelected = false;
    } else {
      this.selectedUserList = [];

      /* Loops the "userList" array */
      for (var i = 0; i < this.userList.length; ++i) {
        var eachUser = this.userList[i];

        eachUser.selected = true;
        this.selectedUserList.push(eachUser);
      }

      /* Setting the "anyUserSelected" boolean */
      this.anyUserSelected = true;
    }
  }

  /**
   * Opens the edit user modal
   * @param {Object} user User to be edited
   */
  editUser(user) {
    this.router.navigate(['/editar-usuario', user.email]);
  }

  /**
   * Sends the "delete" request for a selected user
   * @param {Object} user User to be deleted
   */
  removeUser(user) {
    console.log(user);
  }

  /**
   * Sends the "delete" request for the selected users
   */
  removeSelected() {
    console.log(this.selectedUserList);
  }

}
