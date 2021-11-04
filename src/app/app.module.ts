import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';



import { HttpClient, HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrudUsersComponent } from './views/crud-users/crud-users.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';


const rutas: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'crud-users',
    component: CrudUsersComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
]

const firebaseConfig = {

  apiKey: "AIzaSyBg_FSwSi2gaVNUHZOEBDW3vcIQG5uU2ms",
  authDomain: "backend-3954a.firebaseapp.com",
  projectId: "backend-3954a",
  storageBucket: "backend-3954a.appspot.com",
  messagingSenderId: "77049089483",
  appId: "1:77049089483:web:65e78fdc61257929e57a4e"

};


@NgModule({
  declarations: [
    AppComponent,
    CrudUsersComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas, {
      useHash: true
    }),
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    HttpClientModule,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
