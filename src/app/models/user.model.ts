export interface UserModel {
    _id?:string,
    avatar?:string,
    name: string,
    sur_name : string,
    email:string,
    password: string,
    terms: boolean,
    fav_team?: Array<number>,
    fav_five?: string
}