import Admin from "./admin";
import Employee from "./employee";

export interface AdminOutPut{
status?:number,
message?:string,
accessToken?:string,
employeId?:string,
employePassword?:string,
data?:Admin,
is_restricted?:boolean,
employeList?:Employee[],
count?:number
}