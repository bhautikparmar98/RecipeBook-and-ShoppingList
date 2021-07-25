import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { authResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLogging = true;
    isLoading = false;
    error: string = null;  
    constructor(private authservice:AuthService, private router:Router){}
    ngOnInit(){
    
    }
    onSwitchtoLogin(){
        this.isLogging=!this.isLogging;
    }
    onSubmit(form:NgForm){
        const email=form.value.email;
        const password=form.value.password;
        let authObs : Observable<authResponseData>;
        if(!form.valid){
            return
        }
        this.isLoading=true;
        if(this.isLogging){
            authObs = this.authservice.logIn(email,password);
    }else{ 
            authObs = this.authservice.signIn(email,password);
        }
        authObs.subscribe(res=>{
            console.log(res);
            this.isLoading=false;
            this.router.navigate(['/recipes']);
        },errorMessage=>{
            //this.errorRes="An Error Occured"
            console.log(errorMessage);
            this.error=errorMessage;
            this.isLoading=false;
            form.reset();
    })
}
onHandleError(){
    this.error=null;
}
}
