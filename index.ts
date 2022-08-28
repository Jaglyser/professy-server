import express, { Express, Request, Response } from 'express'
import dotenv from "dotenv"
import { Client } from "pg"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`⚡️[Express]: Server is running at port:${port}`);
})


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
        client.end()
    })
    console.log('💾[PostgreSQL] Database connected')
}
//dataBase()