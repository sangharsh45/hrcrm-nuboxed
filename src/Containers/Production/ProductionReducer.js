import * as types from "./ProductionActionType";

const initialState = {
    // createSubscriptiondrawer:false,
};
export const productionReducer = (state = initialState, action) => {
  switch (action.type) {
  
    // case types.HANDLE_CREATE_SUBSCRIPTION_DRAWER:
    //     return { ...state, createSubscriptiondrawer: action.payload };
  
    default:
      return state;
}
};