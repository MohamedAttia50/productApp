import { Component } from '@angular/core';
import {  FormControl,FormGroup, ReactiveFormsModule, Validators ,FormBuilder, FormArray} from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone:true
})
export class Register {
registerForm!:FormGroup;
showPassword:boolean=false;

constructor(private fb: FormBuilder){}

ngOnInit(){
  this.registerForm= this.fb.group({
   name:['',[Validators.required]],
   email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
   uName:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{4,15}$/)]],
   pass:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
   confirmPass:['',[Validators.required]],
   addresses:this.fb.array([
    this.createAddressGroup()
   ])
  },
  {validators:confirmPasswordValidator('pass','confirmPass')})

}



 get addresses():FormArray{
  return this.registerForm.get('addresses') as FormArray;
  }

createAddressGroup():FormGroup{
  return this.fb.group({
    id:[Date.now()],
    address:['',[Validators.required]],
    street:['',[Validators.required]],
    country:['',[Validators.required]],
    city:['',[Validators.required]]
  })
}

addAddress(){
  this.addresses.push(this.createAddressGroup());
}

removeAddress(index:number){

this.addresses.removeAt(index);
}

toggleShowPass():void{
this.showPassword=!this.showPassword;
}

submit(){
  console.log(this.registerForm.value);
  console.log('confirmPass errors:', this.registerForm.get('confirmPass')?.errors);
}
}
