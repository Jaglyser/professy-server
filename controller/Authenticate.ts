import { getUserByUsernameDao } from '../dao/User'
import { Controller } from './Controller'
import { getUserByUsername } from './User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import { NextFunction, Request, Response } from 'express'

export const authenticateLogin: Controller = async (req, res) => {
    const { username, password } = req.body
    const user = await getUserByUsernameDao(username)
    if (!user) {
        res.status(403).send("Wrong username")
    } else if (!bcrypt.compareSync(password, user.toJSON().password)) {
        res.status(403).send("Wrong password")
    } else {
        const secret = process.env.TOKEN_SECRET
        const token = await signToken(secret, user.toJSON().id)
        res.status(200).send({
            secret,
            token
        })
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"] as string
    let id = req.headers["involved-party-id"] as string
    let url = req.originalUrl

    if (url == '/signup') {
        return next()
    }

    if (!token) {
        return res.status(403).send({ message: "No token provided" })
    }

    if (!id) {
        return res.status(403).send({ message: "No id provided" })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.token = token
        req.decodedId = id
        next()
    })
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