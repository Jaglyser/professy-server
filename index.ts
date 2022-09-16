import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response, Router } from 'express'
import db from './database'
import { router } from './routes'
import cors from 'cors'
import { authenticate } from './controller/Authenticate'


const app: Express = express();
const port = process.env.PORT || 8080;

const init = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    app.use(express.json())
    app.use(cors())
    app.use(authenticate)

    app.use(router)

    app.listen(port, () => {
        console.log(`⚡️[Express]: Server is running at port: ${port}`);
    })

}
init()
export { app, db }
