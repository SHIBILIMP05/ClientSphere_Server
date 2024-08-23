import headModel from "../../entities_models/headModel";
import IHeadRepository from "../../interfaces/IRepositories/IHeadRepository";
import Head from "../../interfaces/models/head";



class HeadRepository implements IHeadRepository {
    async findByEmail(email: string): Promise<Head | null> {
        try {
            const head = await headModel.findOne({ email: email })
            if (head) {
                return head
            } else {
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async createHead(headData: Head): Promise<Head | null> {
        try {


            const addHead = await headModel.create({
                name: headData.name,
                position: headData.position,
                email: headData.email,
                password: headData.password
            })

            if (addHead) {
                return addHead
            } else {
                return null
            }

        } catch (error) {
            console.error(error);
            return null
        }
    }

    async updateData(editDatas: Head): Promise<Head | null> {
        try {
            const updateAdmin = await headModel.findByIdAndUpdate(
                editDatas._id,
                {
                    name: editDatas.name,
                    email: editDatas.email,
                    address: editDatas.address,
                    city: editDatas.city,
                    country: editDatas.country,
                    pinCode: editDatas.pinCode,
                    phone: editDatas.phone,
                    image: editDatas.image,
                },
                { new: true }
            )
            console.log("updated admin-----", updateAdmin);

            if (updateAdmin) {
                return updateAdmin
            } else {
                return null
            }
        } catch (error) {
            console.error('Error updating admin data:', error);
            return null
        }


    }
}

export default HeadRepository;