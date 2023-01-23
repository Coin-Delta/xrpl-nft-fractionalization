import { getType } from "typesafe-actions";
import * as actions from "../actions";

export const defaultState = {
  isShowSidebar: false,
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.toggleSidebar.success):
      return { ...state};
    default:
      return state;
  }
};

export default states;
