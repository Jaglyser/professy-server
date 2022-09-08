import express, { Express, Request, Response } from 'express'
import dotenv from "dotenv"
import { Client } from "pg"
import { graphqlHTTP } from "express-graphql"
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLFloat } from "graphql"
import joinMonster from "join-monster"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

interface companyArgs {
    id: number | null
    name: string | null
    age: number | null
    address: string | null
    salary: number | null
    join_date: string | null
}

const client = new Client(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '') || 5432,
    }
)
client.connect()

const Company = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        salary: { type: GraphQLInt },
        join_date: { type: GraphQLString },
    }),
    extensions: {
        joinMonster: {
            sqlTable: 'company',
            uniqueKey: ['id']
        }
    },
})

const Helmet = new GraphQLObjectType({
    name: 'Helmet',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        price: { type: GraphQLFloat },
    })
})

const QueryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello world!"
        },
        companies: {
            type: new GraphQLList(Company),
            resolve: (parent, args, context, resolveInfo) => joinMonster(resolveInfo, {}, (sql: any) => {
                return client.query(sql)
            })
        },
        company: {
            type: Company,
            args: { id: { type: GraphQLInt } },
            where: (companyTable: companyArgs, args: companyArgs, context: any) => `${companyTable}.id = ${args.id}`,
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, {}, (sql: any) => {
                    return client.query(sql)
                })
            }
        },
        helmets: {
            type: new GraphQLList(Helmet),
            resolve: (parent, args, context, resolveInfo) => joinMonster(resolveInfo, {}, (sql: any) => {
                return client.query(sql)
            })
        }
    })
})

const schema = new GraphQLSchema({ query: QueryRoot })

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`⚡️[Express]: Server is running at port:${port}`);
})

