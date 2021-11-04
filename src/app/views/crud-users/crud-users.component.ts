import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.css']
})
export class CrudUsersComponent implements OnInit {

  users: User[] = [];
  displayedUserColumns: string[] = ['user','email','phone','update','delete'];
  userNameValue = '';
  userEmailValue = '';
  userPhoneValue = 0;
  isUserSelected = false;
  selectedUser: User = {};

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
      console.log(this.users);
    });
  }

  findUsersByEmail(email: string){
    if(email){
      this.userService.findUsersByEmail(email).subscribe((response) => {
        this.users = response;
      });
    } else {
      this.getUsers();
    }
  }

  findUsersByUsername(username: string){
    if(username){
      this.userService.findUsersByUsername(username).subscribe((response) => {
        this.users = response;
      });
    } else {
      this.getUsers();
    }
  }

  createUser(user: User){
    this.userService.createUser(user).subscribe(() => {
      this.getUsers();
    })
  }

  deleteUser(user: User){
    if(user != undefined){
      if(user.id != undefined){
        this.userService.deleteUser(user.id)
        .subscribe(() => {
          this.getUsers();
        });
      }
    }
  }

  updateUserItem(user: User){
    if(user != undefined){
      this.isUserSelected = true;
      this.selectedUser = user;
      this.userNameValue = user.username!;
      this.userEmailValue = user.email!;
      this.userPhoneValue = user.phone!;
    }
  }

  updateUser(user: User){
    if(user != undefined){
      user.username = this.userNameValue;
      user.email = this.userEmailValue;
      user.phone = this.userPhoneValue;
      this.userService.updateUser(user)
      .subscribe(() => {
        this.getUsers();
        this.setDefaultValues();
        this.isUserSelected = false;
      })
    }
  }

  saveUser(){
    if(this.isUserSelected){
      this.updateUser(this.selectedUser);
    } else {
      let newUser: User = {
        username: this.userNameValue,
        email: this.userEmailValue,
        phone: this.userPhoneValue
      };
      this.createUser(newUser);
    }
    this.setDefaultValues();
  }

  applyFilterByEmail(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.findUsersByEmail(filterValue);
  }

  applyFilterByUsername(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.findUsersByUsername(filterValue);
  }

  cancel(){
    this.setDefaultValues();
    this.isUserSelected = false;
  }

  isBlank(str: string){
    return !str.trim() || str.length === 0;
  }

  setDefaultValues(){
    this.userNameValue = '';
    this.userEmailValue = '';
    this.userPhoneValue = 0;
  }

  signOut() {
    this.authService.logout();
  }

}
