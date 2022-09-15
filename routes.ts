import express from "express"
import { authenticate } from "./controller/Authenticate"
import { createUser, getUserById, getUsers } from "./controller/User"

export const router = express.Router()


router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/signup', createUser)
router.post('/authenticate', authenticate)