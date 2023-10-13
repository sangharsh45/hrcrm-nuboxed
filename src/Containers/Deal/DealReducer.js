import * as types from "./DealActionType";
import dayjs from "dayjs";

const initialState = {
  viewType: "table",

  dealsByuserId:[],
  fetchingDeal: false,
  fetchingDealError:false,
};
export const dealReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEAL_VIEW_TYPE:
      return { ...state, viewType: action.payload };

      case types.GET_DEAL_REQUEST:
        return { ...state, fetchingDeal: true };
      case types.GET_DEAL_SUCCESS:
        return {
          ...state,
          fetchingDeal: false,
          dealsByuserId: [...state.dealsByuserId,...action.payload],
        };
      case types.GET_DEAL_FAILURE:
        return {
          ...state,
          fetchingDeal: false,
          fetchingDealError: true,
        };
     
    default:
      return state;
  }
};
