import mongoose from 'mongoose';
import {AccountSchema, Schemas} from '@afirmashop/common-logic';


export default mongoose.model(Schemas.accounts, AccountSchema);
