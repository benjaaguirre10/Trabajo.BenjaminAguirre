import productsDaoMongoDB from "../daos/product.dao.js";
const productDao = new productsDaoMongoDB();


export const getAllProducts = async (limit, page, brand, sort) =>{
    try {
        console.log(limit, page, brand, sort);
        return await productDao.getProducts(limit, page, brand, sort)
    } catch (error) {
        throw new Error(error)
    }
}



export const getByIdProduct = async (id) => {
    try {
        return await productModel.getProductsById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const createProduct = async (product) => {
    try {
        return await productDao.addProduct(product);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProdctById = async (id) => {
    try {
        return await productDao.deleteProduct(id);
    } catch (error) {
        throw new Error(error)
    }
}

export const updateProducts = async (id, obj) => {
    try {
        return await productDao.updateProduct(id, obj)
    } catch (error) {
        throw new Error(error)
    }
}
