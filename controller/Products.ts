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

export const createProduct: Controller = async (req, res) => {
    const { data } = req.body
    // console.log(req.body)
    console.log(data)

    if (!data) {
        res.status(500).json({ message: "Invalid arguments" })
    }
    const refinedData = data as productData
    const status = createProductDao(refinedData)
    res.status(200).json({ message: `Product with id ${data.id} successfully created` })
}

export const createProducts: Controller = async (req, res) => {
    const { data } = req.body
    if (!data) {
        res.status(500).json({ message: "Invalid arguments" })
    }
    const refinedData = data as productDataCollected
    try {
        refinedData.map(p => createProductDao(p))
    } catch (err) {
        res.status(500).json({ message: (err as Error).message })
    }
    res.status(200).json({ message: `${data.length} products successfully created` })
}


const createProductDao = ({ brand, category, subCategory,
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