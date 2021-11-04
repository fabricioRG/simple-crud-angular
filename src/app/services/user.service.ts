import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  createUserURL = "/backend/api/users/create";
  getUsersURL = "/backend/api/users";
  findUsersByEmailURL = "/backend/api/users/findByEmail/";
  findUsersByUsernameURL = "/backend/api/users/findByUsername/";
  updateUserURL = "/backend/api/users/update";
  deleteUserURL = "/backend/api/users/delete/";

  constructor(private _http: HttpClient) { }

  createUser(user: User){
    return this._http.post<any>(
      this.createUserURL,
      user
    )
  }

  getUsers(){
    return this._http.get<User[]>(
      this.getUsersURL
    )
  }

  findUsersByEmail(email: string){
      let finalURL = this.findUsersByEmailURL + email;
      return this._http.get<User[]>(
        finalURL
      )
  }

  findUsersByUsername(username: string){
    let finalURL = this.findUsersByUsernameURL + username;
    return this._http.get<User[]>(
      finalURL
    )
  }

  updateUser(user: User){
    return this._http.post<any>(
      this.updateUserURL,
      user
    )
  }

  deleteUser(userId: string){
    let finalURL = this.deleteUserURL + userId;
    return this._http.delete<any>(
      finalURL
    )
  }

}
