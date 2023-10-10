import * as types from "./InvestorActionTypes";
import dayjs from "dayjs";

const initialState = {
    viewType: "list",

    fetchingInvestors: false,
    fetchingInvestorsError: false,
    investorsbyId:[],

    addingInvestor: false, 
    addInvestorModal: false,
    updateInvestorModal:false,

    updateInvestorById: false,
    updateInvestorByIdError: false,

    fetchingInvestorDetailsById: false,
    fetchingInvestorDetailsByIdError: false,
    investorDetails:{}
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
          investorsbyId: [
            ...state.investorsbyId,
            ...action.payload],
        };
      case types.GET_INVESTORS_BY_ID_FAILURE:
        return {
          ...state,
          fetchingInvestors: false,
          fetchingInvestorsError: true,
        };
        case types.EMPTY_INVESTOR_LIST:
          return { ...state, investorsbyId:[] };

          case types.ADD_INVESTOR_REQUEST:
            return { ...state, addingInvestor: true };
          case types.ADD_INVESTOR_SUCCESS:
            return { ...state, 
              addingInvestor: false, 
              addInvestorModal: false ,
              investorsbyId:[action.payload,...state.investorsbyId]
            };
          case types.ADD_INVESTOR_FAILURE:
            return { ...state, addingInvestor: false, addInvestorModal: false };

            case types.UPDATE_INVESTOR_BY_ID_REQUEST:
              return { ...state, addInvestorModal: action.payload };
              case types.HANDLE_INVESTOR_UPDATE_MODAL:
              return { ...state, updateInvestorModal: action.payload };
             
              case types.UPDATE_INVESTOR_BY_ID_REQUEST:
                return { ...state, updateInvestorById: true };
              case types.UPDATE_INVESTOR_BY_ID_SUCCESS:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorModal: false,
        investorsbyId: state.investorsbyId.map((item) => {
          if (item.investorId === action.payload.investorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_INVESTOR_BY_ID_FAILURE:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorByIdError: true,
      };
      case types.GET_INVESTOR_DETAILS_BY_ID_REQUEST:
        return { ...state, fetchingInvestorDetailsById: true };
      case types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS:
        return {
          ...state,
          fetchingInvestorDetailsById: false,
          investorDetails: action.payload,
        };
      case types.GET_INVESTOR_DETAILS_BY_ID_FAILURE:
        return {
          ...state,
          fetchingInvestorDetailsById: false,
          fetchingInvestorDetailsByIdError: true,
        };

    default:
      return state;
  }
};