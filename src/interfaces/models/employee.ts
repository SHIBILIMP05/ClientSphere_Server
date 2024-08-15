interface Employee {
    _id?: string
    name: string
    phone?: number
    email?: string
    position: string
    password?: string
    is_teamLead?: boolean
    is_restricted?: boolean
}

export default Employee;