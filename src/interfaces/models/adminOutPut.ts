import Admin from "./admin";

export interface AdminOutPut{
status:number,
message:string,
accessToken?:string,
employeId?:string,
employePassword?:string,
data?:Admin,
is_restricted?:boolean
}