import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class RestAmqInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const useAmq = localStorage.getItem('BACKEND_PROTOCOL') ?? 'rest';

    if (useAmq === 'amq' && request.method !== 'GET') {
      const restUrl: string = environment.backend.baseURL;
      const amqUrl: string = environment.backend.baseAmqURL;
      const httpsReq = request.clone({
        url: request.url.replace(restUrl, amqUrl)
      });

      console.log('Using AMQ to process request: ' + httpsReq.url);
      return next.handle(httpsReq);
    }
    return next.handle(request);
  }
}
