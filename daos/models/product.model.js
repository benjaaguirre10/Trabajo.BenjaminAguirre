import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    url: { type: String },
    type: { type: String },
    brand: { type: String },
    algorithms: { type: Schema.Types.Mixed } 
});

productSchema.plugin(paginate);

export const productModel = model("products", productSchema);
