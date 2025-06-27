import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLoggedInSignal = signal<boolean>(false);

isLoggedIn = this.isLoggedInSignal.asReadonly();

login(){
  this.isLoggedInSignal.set(true);
}
}

