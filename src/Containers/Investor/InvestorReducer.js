import * as types from "./InvestorActionTypes";
import dayjs from "dayjs";

const initialState = {
    viewType: "card",

    fetchingInvestors: false,
    fetchingInvestorsError: false,
    investorsbyId:[]
};
export const investorReducer = (state = initialState, action) => {
    switch (action.type) {
case types.SET_INVESTOR_VIEW_TYPE:
    return { ...state, viewType: action.payload };

    case types.GET_INVESTORS_BY_ID_REQUEST:
        return { ...state, fetchingInvestors: true };
      case types.GET_INVESTORS_BY_ID_SUCCESS:
        return {
          ...state,
          fetchingInvestors: false,
          // customerByUserId: action.payload,
          investorsbyId: [
            ...state.customerByUserId,
            ...action.payload],
        };
      case types.GET_INVESTORS_BY_ID_FAILURE:
        return {
          ...state,
          fetchingInvestors: false,
          fetchingInvestorsError: true,
        };
    default:
      return state;
  }
};