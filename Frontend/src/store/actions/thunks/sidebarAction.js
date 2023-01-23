import * as actions from "../../actions";

export const sidebarToggle = () => async (dispatch, getState) => {
  try {
    const state = getState();
    state.sidebar.isShowSidebar = !state.sidebar.isShowSidebar;
    dispatch(actions.toggleSidebar.success(state.sidebar.isShowSidebar));
  } catch (err) {
    console.log("err", err);
    dispatch(actions.toggleSidebar.failure(err));
  }
};
