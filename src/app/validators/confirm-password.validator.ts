import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField);
    const confirmPassword = formGroup.get(confirmPasswordField);


    if(!password || !confirmPassword){
        return null;
    }
    if(confirmPassword.errors && !confirmPassword.errors['passwordMismatch']){
        return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  };
}
// export function matchFields(field1: string, field2: string) {
//   return (formGroup: AbstractControl): ValidationErrors | null => {
//     const control1 = formGroup.get(field1);
//     const control2 = formGroup.get(field2);

//     if (!control1 || !control2) {
//       return null;
//     }

//     if (control2.errors && !control2.errors['mismatch']) {
//       return null;
//     }

//     if (control1.value !== control2.value) {
//       control2.setErrors({ mismatch: true });
//       return { mismatch: true };
//     } else {
//       control2.setErrors(null);
//       return null;
//     }
//   };
// }