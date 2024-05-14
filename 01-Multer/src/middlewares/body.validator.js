export const bodyValidator = (req, res, next) => {
    if (
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.price === undefined ||
        req.body.code === undefined ||
        req.body.stock === undefined
    ) return res.status(404).json({ msg: "Campos faltantes" })
    else next()
}
