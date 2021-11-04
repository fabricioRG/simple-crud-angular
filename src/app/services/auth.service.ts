import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/crud-users');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }


  emailSignup(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
    console.log('Sucess', value);
    this.router.navigateByUrl('/crud-users');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
