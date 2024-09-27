import {LoadAccountByTokenRepository, MongoHelper} from "@afirmashop/common-logic";
import AccountModel from "@src/adapters/db/mongoose/models/cccount-model";

export const addAccountRepository = async (params) => {
  const account = new AccountModel(params);
  await account.save();
  return account;
};

export const signoutRepository = async (accountId, accessToken) => {
  await AccountModel.findByIdAndUpdate(accountId, {
    $pull: {sessions: {accessToken}},
  });
};


export const loadAccountByTokenRepository: LoadAccountByTokenRepository =
  async (accessToken) => {
    const account = await AccountModel.findOne({
      'sessions.accessToken': accessToken,
    }).lean();
    return MongoHelper.serialize(account);
  };

export const updateAccessTokenRepository = async (
  email,
  token
) => {
  await AccountModel.findOneAndUpdate({email}, {
    $push: {
      sessions: {accessToken: token},
    },
  });
};