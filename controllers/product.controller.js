import * as service from "../service/product.service.js"

//Pasar todas las funciones del router aca y luego exportarlas al router

export const getProducts = async (req, res, next) => {
    try {
        const { limit, page, brand, sort } = req.query;
        console.log(req.query);
        const response = await service.getAllProducts(limit, page, brand, sort);
        const next = response.hasNextPage ? `http://localhost:8080/api/product?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/api/product?page=${response.prevPage}` : null;
        res.json({
            payload: response.docs,
            info: {
                status: response ? "Success" : "error",
                count: response.totalDocs,
                pages: response.totalPages,
                hasPrevPage: response.hasNextPage,
                hasNextPage: response.hasPrevPage,
                next,
                prev
            }
        });
    } catch (error) {
        next(error)
    }
}

export const getProductsById = async (req, res, next) => {
    try {
        const id = req.params.pid
        const product = await service.getByIdProduct(id);
        if (!product) res.status(404).json({ msg: "Product not found!" });
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }

}
export const addProduct = async (req, res, next) => {
    try {
        const producto = await service.createProduct(req.body)
        res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.pid
        const deleteProduct = await service.deleteProduct(id)
        if (!product) res.status(404).json({ msg: "Product not found!" });
        res.status(200).json({ msg: `${deleteProduct} Sucessfull delete` })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.pid
        const updProduct = await service.updateProduct(id, req.body)
        if (!product) res.status(404).json({ msg: "Product not found!" });
        res.status(200).json(updProduct)
    } catch (error) {
        next(error)
    }
}