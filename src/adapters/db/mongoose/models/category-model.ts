import mongoose from 'mongoose';
import {CategorySchema, Schemas} from "@afirmashop/common-logic";

export default mongoose.model(Schemas.categories, CategorySchema);
