import { model } from "mongoose";
import { IProducts } from "../interfaces/productsInterface";
import { productsSchema } from "../schemas/productsSchema";

const ProductsModel = model<IProducts>("Drink", productsSchema);

export { ProductsModel };
