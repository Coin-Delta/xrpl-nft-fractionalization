import { Axios, Canceler } from "../../../core/axios";
import * as actions from "..";
import api from "../../../core/api";
import auth from "../../../core/auth";

export const walletAction = () => async (dispatch) => {
  try {
    const xummWalletDetails = {
      walletAccount: auth.get("walletAccount"),
      walletToken: auth.get("walletToken"),
    };
    dispatch(actions.saveWallet.success(xummWalletDetails));
  } catch (err) {
    console.log(err);
    dispatch(actions.saveWallet.failure(err));
  }
};
