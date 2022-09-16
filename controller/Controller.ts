
import { Request, Response } from "express"
declare module 'express-serve-static-core' {
    export interface Request {
        decodedId?: string
        token?: string
    }
    export interface Response {

    }
}
export type Controller = (req: Request, res: Response) => Promise<any>