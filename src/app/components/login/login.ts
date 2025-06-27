import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service/auth.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

submit(form:any){
console.log(form.value);
}

authService =inject(AuthService)

onLoginSuccess(){
  this.authService.login()
}

}
