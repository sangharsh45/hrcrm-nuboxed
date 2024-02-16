import * as types from "./ProductionActionType";

const initialState = {
    openProductiondrawer:false,
    viewType: "table",

    creatingProductionLink: false,
    creatingProductionLinkError:false,

    fetchingSearchedProduction: false,
    fetchingSearchedProductionError:false,
    searchedProduction:[
        {
            cate:"etetr",
            subcate:"hkore",
            parto:"re1",
            partt:"rewf",
            prodId:"pd24535",
        },
        {
            cate:"retewe",
            subcate:"mbnh",
            parto:"5454",
            partt:"iy56",
            prodId:"pd78565",
        }
    ]
};
export const productionReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case types.HANDLE_CREATE_PRODUCTION_DRAWER:
        return { ...state, openProductiondrawer: action.payload };
  
        case types.SET_PRODUCTION_VIEW_TYPE:
            return { ...state, viewType: action.payload };

            
            case types.CREATE_PRODUCTION_LINK_REQUEST:
                return { ...state, creatingProductionLink: true };
              case types.CREATE_PRODUCTION_LINK_SUCCESS:
                return {
                  ...state,
                  creatingProductionLink: false,
                  productionLink: [action.payload]
                };
              case types.CREATE_PRODUCTION_LINK_FAILURE:
                return {
                  ...state,
                  creatingProductionLink: false,
                  creatingProductionLinkError: true,
                };

  case types.GET_SEARCH_PRODOCTION_REQUEST:
                return { ...state, fetchingSearchedProduction: true };
              case types.GET_SEARCH_PRODOCTION_SUCCESS:
                return { ...state, 
                  fetchingSearchedProduction: false,
                  searchedProduction: action.payload,
                };
              case types.GET_SEARCH_PRODOCTION_FAILURE:
                return {
                  ...state,
                  fetchingSearchedProduction: false,
                  fetchingSearchedProductionError: true,
                };

    default:
      return state;
}
};