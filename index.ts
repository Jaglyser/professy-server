import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[Express]: Server is running at https://localhost:${port}`);
});


const dataBase = async () => {
    const client = new Client(
        {
            host: '127.0.0.1',
            user: 'postgres',
            database: 'professy',
            password: 'root',
            port: 5432,
        }
    )
    client.connect()
    client.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        client.end()
    })
    console.log('💾[PostgreSQL] Database connected')
}
dataBase()