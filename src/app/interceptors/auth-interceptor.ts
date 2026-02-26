import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const user = JSON.parse(localStorage.getItem('user')!);

  if (user?.accessToken) {
    const cloned = req.clone({
      headers: req.headers.set('x-access-token', user.accessToken)
    });
    return next(cloned);
  }

  return next(req);
};