import { Model } from "sequelize"
export type Dao = (arg: string) => Promise<Model<any, any> | null>