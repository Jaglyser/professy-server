import express from "express"
import { createUser, getUserById, getUsers } from "./controller/User"

export const router = express.Router()


router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/signup', createUser)