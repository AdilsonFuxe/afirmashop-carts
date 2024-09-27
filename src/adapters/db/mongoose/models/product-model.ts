import mongoose from 'mongoose';
import {ProductSchema, Schemas} from "@afirmashop/common-logic";

export default mongoose.model(Schemas.products, ProductSchema);
