import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFnInterceptor: HttpInterceptorFn = (req, next) => {
  const token="token here";
  const cloned=req.clone({
    setHeaders:{
      Authorization:`bearer ${token}`
    }
  });
  return next(cloned);
};
