import * as types from "./SubscriptionActionTypes";

const initialState = {
    createSubscriptiondrawer:false,
};
export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case types.HANDLE_CREATE_SUBSCRIPTION_DRAWER:
        return { ...state, createSubscriptiondrawer: action.payload };
  
    default:
      return state;
}
};