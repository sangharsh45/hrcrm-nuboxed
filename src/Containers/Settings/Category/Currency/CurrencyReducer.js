import * as types from "./CurrencyActionTypes";

const initialState = {


    fetchingCurrencyList: false,
    fetchingCurrencyListError: false,
    currencyList: [],

    addingCountryToggle: false,
    addingCountryToggleError: false,

    addingCountrySalesToggle: false,
    addingCountrySalesToggleError: false,

    addingMandatoryCurrency: false,
    addingMandatoryCurrencyError: false,

   
};

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
     
    case types.GET_CURRENCY_LIST_REQUEST:
        return { ...state, fetchingCurrencyList: true };
      case types.GET_CURRENCY_LIST_SUCCESS:
        return {
          ...state,
          fetchingCurrencyList: false,
          currencyList: action.payload,
        };
      case types.GET_CURRENCY_LIST_FAILURE:
        return {
          ...state,
          fetchingCurrencyList: false,
          fetchingCurrencyListError: true,
        };
     

        case types.LINK_COUNTRY_TOGGLE_REQUEST:
            return { ...state, addingCountryToggle: true };
          case types.LINK_COUNTRY_TOGGLE_SUCCESS:
            return {
              ...state,
              addingCountryToggle: false,
              country: state.country.map((item) => {
                if (item.country_id === action.payload.country_id) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.LINK_COUNTRY_TOGGLE_FAILURE:
            return {
              ...state,
              addingCountryToggle: false,
              addingCountryToggleError: true,
            };

            case types.LINK_COUNTRY_SALES_TOGGLE_REQUEST:
              return { ...state, addingCountrySalesToggle: true };
            case types.LINK_COUNTRY_SALES_TOGGLE_SUCCESS:
              return {
                ...state,
                addingCountrySalesToggle: false,
                country: state.country.map((item) => {
                  if (item.country_id === action.payload.country_id) {
                    return action.payload;
                  } else {
                    return item;
                  }
                }),
              };
            case types.LINK_COUNTRY_SALES_TOGGLE_FAILURE:
              return {
                ...state,
                addingCountrySalesToggle: false,
                addingCountrySalesToggleError: true,
              };


            case types.ALL_CURRENCY_MANDATORY_REQUEST:
              return { ...state, addingMandatoryCurrency: true };
            case types.ALL_CURRENCY_MANDATORY_SUCCESS:
              return {
                ...state,
                addingMandatoryCurrency: false,
                currencyList:action.payload
                // country: state.country.map((item) => {
                //   if (item.country_id === action.payload.country_id
                //     ) {
                //     return action.payload;
                //   } else {
                //     return item;
                //   }
                // }),
              };
            case types.ALL_CURRENCY_MANDATORY_FAILURE:
              return {
                ...state,
                addingMandatoryCurrency: false,
                addingMandatoryCurrencyError: true,
              };

     
    default:
        return state;
    }
  };