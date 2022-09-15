import { getUserByUsernameDao } from '../dao/User'
import { Controller } from './Controller'
import { getUserByUsername } from './User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from "crypto"

export const authenticate: Controller = async (req, res) => {
    const { username, password } = req.body
    const user = await getUserByUsernameDao(username)
    if (!user) {
        res.status(403).send("Wrong username")
    } else if (!bcrypt.compareSync(password, user.toJSON().password)) {
        res.status(403).send("Wrong password")
    } else {
        const secret = crypto.randomBytes(256).toString('base64')
        const token = await signToken(secret, user.toJSON().id)
        res.status(200).send({
            secret,
            token
        })
    }
}

export const authenticateUser = async (username: string) => {
    if (await getUserByUsernameDao(username)) {
        return {
            status: 500,
            send: "User already exists"
        }
    } else {
        return {
            status: 200,
            send: "User created successfully"
        }
    }
}

export const signToken = async (secret: string, id: string) => {
    return await jwt.sign({ id: id }, secret, {
        expiresIn: 3600
    })
}