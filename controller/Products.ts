import Product from "../model/Product";
import { Controller } from "./Controller";
import { v4 as uuidv4 } from 'uuid'

interface productData {
    brand: string
    category: string
    subCategory: string
    modelName: string
    shortDescription: string
    longDescription: string
    color: string
    size: string
    pictureFile: string
    netPrice: string
}

interface productDataCollected extends Array<productData> { }

export const createProducts: Controller = async (req, res) => {
    const { data } = req.body
    res.json(data)
    if (!data) {
        res.status(500).json({ message: "Invalid arguments" })
    }
    const refinedData = JSON.parse(data) as productDataCollected
    try {
        refinedData.map(p => createProduct(p))
    } catch (err) {
        res.status(500).json({ message: (err as Error).message })
    }
}

const createProduct = ({ brand, category, subCategory,
    modelName, shortDescription, longDescription,
    color, size, pictureFile, netPrice }: productData) => {
    Product.create({
        id: uuidv4(),
        brand,
        category,
        subCategory,
        modelName,
        shortDescription,
        longDescription,
        color,
        size,
        pictureFile,
        netPrice
    })
}