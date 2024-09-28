import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api')) {
    const newUrl = `${environment.apiUrl}${req.url}`;
    const modifiedReq = req.clone({ url: newUrl });
    return next(modifiedReq);
  }
  return next(req);
};
