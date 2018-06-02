import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User = null;

    constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);  // You are logged in now
        this.router.navigate(['/training']);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);  // You are logged in now
        this.router.navigate(['/training']);
    }

    logout() {
        this.user = null;
        this.authChange.next(false); // You are logged out
        this.router.navigate(['/login']);
    }

    getUser() {
        // return a copy of the user object
        return { ...this.user };
    }

    isAuth() {
        return this.user !== null;
    }
}
