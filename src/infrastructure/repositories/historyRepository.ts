import historyModel from "../../entities_models/historyModel";
import IHistoryRepository from "../../interfaces/IRepositories/IHistoryRepository";
import { History } from "../../interfaces/models/history";
import { LeadData } from "../../interfaces/models/leads";


class HistoryRepository implements IHistoryRepository {

    async addHistory(data: LeadData, empId: string, leadId: string, message: string): Promise<History | null> {
        const addHistory = await historyModel.create({
            empId: empId,
            leadId: leadId,
            message: message,
            date: new Date()
        })
        console.log("history", addHistory);

        if (addHistory) {
            return addHistory
        } else {
            return null
        }
    }

    async listHistory(empId: string): Promise<History[] | null> {
        const getHistory = await historyModel.find({ empId }).populate('leadId').sort({date:-1})
        if (getHistory) {
            return getHistory
        } else {
            return null
        }
    }

}
export default HistoryRepository