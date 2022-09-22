import { Controller } from "./Controller";

export const read: Controller = async (req, res) => {
    const { data } = req.body
    res.json(data)
}