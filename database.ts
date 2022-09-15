import { Sequelize } from "sequelize"

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
})

export default db;