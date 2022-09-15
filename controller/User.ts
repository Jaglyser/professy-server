import User from "../model/User"
import { Request, Response } from "express"
import { Controller } from "./Controller"
import { v4 as uuidv4 } from 'uuid'
import bcrypt from "bcryptjs"
import { getUserByIdDao, getUserByUsernameDao } from "../dao/User"
import { authenticateUser } from "./Authenticate"



export const getUsers: Controller = async (req, res) => {
    try {
        const users = await User.findAll()
        res.send(users)
    } catch (err) {
        res.sendStatus(500).send(err)
        console.log(err)
    }
}


export const getUserById: Controller = async (req, res) => {
    try {
        const user = await getUserByIdDao(req.body.id)
        res.send(user)
    } catch (err) {
        console.log(err)
    }
}

export const getUserByUsername: Controller = async (req, res) => {
    try {
        const user = await getUserByUsernameDao(req.body.username)
        res.send(user)
    } catch (err) {
        console.log(err)
    }
}

export const createUser: Controller = async (req, res) => {
    const auth = await authenticateUser(req.body.username)
    try {
        User.create({
            id: uuidv4(),
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }).then(() => {
            res.status(auth.status).send(auth.send)
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
