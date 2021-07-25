//Saving Data coming from server , which comes when user is Authenticated
export class User{
    constructor(
        public email: string,
        public id : string,
        private _token:string,
        private _tokenExpirationDate: Date
        ){}

    get token(){
        if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
            return null
        }
        return this._token
    }
}