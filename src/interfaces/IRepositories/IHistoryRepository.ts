import { History } from "../models/history"
import { LeadData } from "../models/leads"

interface IHistoryRepository {
    addHistory(data:LeadData,empId:string,leadId:string,message:string):Promise<History|null>,
    listHistory(empId:string):Promise<History[]|null>,


}

export default IHistoryRepository 