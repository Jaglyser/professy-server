import Sequelize from "sequelize"
import db from "../database"

const { DataTypes } = Sequelize

const User = db.define('users',
    {
        username: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
    },
    {
        // freezeTableName: true,
        tableName: 'users',
        schema: 'public'
    }

);

export default User;