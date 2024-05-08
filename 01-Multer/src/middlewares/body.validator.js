export const bodyValidator = (req, res, next) =>{
    if(!req.body.title && !req.body.description && !req.body.price && !req.body.code && !req.body.stock){
        return res.status(404).json({msg: "Campos faltantes"})
    }
}
