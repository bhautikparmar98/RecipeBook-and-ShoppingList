import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface authResponseData{
    idToken:string,
    email:string,
    refresToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
@Injectable({providedIn:'root'})
export class AuthService{
    // Behaviour Subject Helps to use previous Emitted value before Ongoing Subscription
    user = new BehaviorSubject<User>(null);  /// When the USer Subject Changes It can Inform whole application about its status , and Emit the event
    tokenExpirationTimer:any;
    constructor( private http: HttpClient, private router : Router){}
    signIn(email:string,password:string){
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5lkN4TWTbnXsYv-YYgnII00kTeqbcBzQ',
          {  
              email:email,
              password:password,
              returnSecureToken:true
          } 
          ).pipe(catchError(this.HandleError),tap(resData=>{
              this.HandleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
          }))
          }

    logIn(email:string,password:string){
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5lkN4TWTbnXsYv-YYgnII00kTeqbcBzQ',
        {
            email:email,
            password:password,
            returnSecureToken:true   
        }).pipe(catchError(this.HandleError),tap(resData=>{
            this.HandleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        }))
    }
    autoLogin(){
        // Retrieving userData from Local Storage and Converting String into Object using Parse Method
        const userData :{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if (!loadedUser){
            return
        }
        this.user.next(loadedUser);
        const timerExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        //console.log(timerExpirationDuration);
        this.autologOut(timerExpirationDuration);
    }
    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
    autologOut(timeExpirationDuration: number){
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logOut();
        },timeExpirationDuration)
    }
    private HandleAuthentication(email:string, localId: string,Token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
        const user = new User(email,localId,Token,expirationDate);
        this.user.next(user);  
        this.autologOut(expiresIn*1000);
        // to Prevent the lose of state of user while reloading, we store the authenticated token inside Local Storage
        //So we can still have token after Reloading, And it is stored as Key Value Pair and value should converted Into String
        localStorage.setItem('userData',JSON.stringify(user));
    }
    private HandleError(errorRes:HttpErrorResponse){
        let errorMessage="A Unknow Error Occured"
              if(!errorRes.error || !errorRes.error.error){
                  return throwError(errorMessage)
              }
            console.log(errorRes.error.error.message);
            switch(errorRes.error.error.message){
                case'EMAIL_EXISTS':
                errorMessage='Error Occured Email Already Exits';
                break;
                case 'EMAIL_NOT_FOUND':
                errorMessage='Email Id does Not Exist.';
                break;
                case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password';
                break;
            }
            return throwError(errorMessage)
    }
}