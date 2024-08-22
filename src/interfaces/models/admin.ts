interface Admin {
    _id: string,
    name: string,
    email: string,
    password?: string,
    image?: string,
    address?:string,
    city?:string,
    country?:string,
    pinCode?:string,
    phone?:string,
}

export default Admin