import Sequelize from "sequelize"
import db from "../database"

const { DataTypes } = Sequelize

const Product = db.define('products',
    {
        brand: { type: DataTypes.STRING },
        catergory: { type: DataTypes.STRING },
        subCategory: { type: DataTypes.STRING },
        modelName: { type: DataTypes.STRING },
        shortDescription: { type: DataTypes.STRING },
        longDescription: { type: DataTypes.STRING },
        color: { type: DataTypes.STRING },
        size: { type: DataTypes.STRING },
        pictureFile: { type: DataTypes.STRING },
        netPrice: { type: DataTypes.STRING },
    },
    {
        // freezeTableName: true,
        tableName: 'products',
        schema: 'public'
    }

);

export default Product;