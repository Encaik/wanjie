import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // 统一加上服务端前缀
  let url = req.url;
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    const { apiUrl } = environment;
    url = apiUrl + (apiUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
  }
  const newReq = req.clone({ url });
  return next(newReq);
};
