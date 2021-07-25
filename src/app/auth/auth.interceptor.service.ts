import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authservice:AuthService){}

    intercept(req:HttpRequest<any>, next:HttpHandler){
         //here take Operator take only 1 value from the latest Subscription(We can say Subscription after Login)
         // before this onGoing Subsription and Automatically Unsubscribe
         // AND Exhaust Map return the Observable inside its Body and replace with the OuterChain Observable i.e User Observable
        return this.authservice.user.pipe(take(1), exhaustMap(user=>{
            if (user!=null){
            const modifiedReq=req.clone({ params : new HttpParams().set('auth',user.token)});
            return next.handle(modifiedReq)
            }
            else{
                return next.handle(req)
            }
        }))
    }
}