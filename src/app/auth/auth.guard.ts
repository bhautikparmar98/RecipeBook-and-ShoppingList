import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authservice.user.pipe(take(1),map(user=>{
            const isAuth = !!user;
            if (isAuth){
                return true;
            }
            // Create UrlTree also Used to Navigate to Other Route must have return type UrlTree
            return this.router.createUrlTree(['/auth']);
        })
        // tap(isAuth=>{
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // })
        )
    }
 
}