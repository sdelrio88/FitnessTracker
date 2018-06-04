import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackBar: MatSnackBar) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                this.snackBar.open(error, null, {
                    duration: 3000
                });
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
            })
            .catch(error => {
                this.snackBar.open(error, null, {
                    duration: 3000
                });
            });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.snackBar.open('You have been logged out', null, {
            duration: 3000
        });
    }

    isAuth() {
        return this.isAuthenticated;
    }

}
