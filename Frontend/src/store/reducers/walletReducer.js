import { getType } from "typesafe-actions";
import * as actions from "../actions";

export const defaultState = {
  xummWalletDetails: {},
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.saveWallet.success):
      return { ...state, xummWalletDetails: action.payload };
    default:
      return state;
  }
};

export default states;
