import User from "../model/User"
import { Dao } from "./Dao"


export const getUserByUsernameDao: Dao = async (arg: string) => {
    return await User.findOne({
        where: {
            username: arg
        }
    })
}

export const getUserByIdDao: Dao = async (arg: string) => {
    return await User.findOne({
        where: {
            id: arg
        }
    })
}