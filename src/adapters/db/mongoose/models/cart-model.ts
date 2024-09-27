import mongoose from "mongoose";
import {CartSchema, Schemas} from "@afirmashop/common-logic";

export default mongoose.model(Schemas.carts, CartSchema);
