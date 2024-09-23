export interface LeadData {
    name:string;
    email:string;
    phone:string;
    company:string;
    leadSource:string;
    message:string;
    address?:string;
    city?:string;
    country?:string,
    pinCode?:string,
    lead_holder?:string,
    lead_status?:string,
    date?:Date
} 