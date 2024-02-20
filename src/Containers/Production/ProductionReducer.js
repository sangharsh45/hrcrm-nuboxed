import * as types from "./ProductionActionType";

const initialState = {
    openProductiondrawer:false,
    viewType: "table",

    creatingProductionLink: false,
    creatingProductionLinkError:false,

    fetchingSearchedProduction: false,
    fetchingSearchedProductionError:false,
    searchedProduction:[],

    fetchingProductionLocId: false, fetchingProductionLocIdError:false,
    productionByLocsId:[],

    

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
                  productionByLocsId:[action.payload,...state.productionByLocsId]
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

                case types.GET_PRODUCTION_BYLOC_ID_REQUEST:
                  return { ...state, fetchingProductionLocId: true, fetchingProductionLocIdError: false };
                case types.GET_PRODUCTION_BYLOC_ID_SUCCESS:
                  return { ...state, fetchingProductionLocId: false, productionByLocsId: action.payload };
                case types.GET_PRODUCTION_BYLOC_ID_FAILURE:
                  return { ...state, fetchingProductionLocId: false, fetchingProductionLocIdError: true };
            
                  case types.REMOVE_PRODUCTION_REQUEST:
                    return { ...state, removingProduction: true };
                  case types.REMOVE_PRODUCTION_SUCCESS:
                    return {
                      ...state,
                      removingProduction: false,
                      productionByLocsId: state.productionByLocsId.filter(
                        (item) => item.productionProductId !== action.payload.productionProductId
                      ),
                    };
                  case types.REMOVE_PRODUCTION_FAILURE:
                    return {
                      ...state,
                      removingProduction: false,
                      removingProductionError: true,
                    };  


    default:
      return state;
}
};