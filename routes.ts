import express from "express"
import { authenticate, authenticateLogin } from "./controller/Authenticate"
import { createProduct, createProducts } from "./controller/Products"
import { createUser, getUserById, getUsers } from "./controller/User"

export const router = express.Router()


router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/signup', createUser)
router.post('/authenticate', authenticateLogin)
router.post('/createProduct', createProduct)
router.post('/createProducts', createProducts)
