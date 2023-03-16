import { model } from "mongoose";
import { IDrink } from "../interfaces/drinkInterface";
import { drinkSchema } from "../schema/drinkSchenma";

const Drink = model<IDrink>("Drink", drinkSchema);

export { Drink };
