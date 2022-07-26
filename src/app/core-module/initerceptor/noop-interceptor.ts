
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, mergeMap} from 'rxjs/internal/operators';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  modal = window['modal'];
  constructor(private $router: Router) {
  }

  /**
   * 拦截器  给请求设置 authorization 的头
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @description
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 拦截请求
    // const token = '43aaedb78c2ef89bb9ac1cd5f5f22ec'; // 获取token
    const authReq = null;
    // if (token) {
    //   authReq = req.clone({setHeaders: {Authorization: token}});
    // }
    // 可根据不同的请求设置不同的请求头
    // if (req.url === '/business/topology/static/export') {
    //   authReq = authReq.clone({setHeaders: {'Content-Type': 'form-data'}});
    // }
    return next.handle(authReq || req).pipe(mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status !== 200) {
          return Observable.create(observer => observer.next(event));
        }
        return Observable.create(observer => observer.next(event)); // 获取成功的
      }),
      catchError((err: HttpResponse<any>, caught: Observable<any>) => {
        if (err.status !== 200) {
          this.modal.open({
            message: '长时未操作，刷新页面即可',
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false,
          });
        }
        return Observable.create(observer => observer.next(event));
      })
    );
  }
}
