import * as types from "./ProcurementActionType";

const initialState = {
    addBOMdrawer: false,
    addingBOM: false, addingBOMError:false,
    fetchingBOM: false, fetchingBOMError:false,
    BOMs:[],

    addIndentModal:false,

    dispatchProcModal:false
  };
  export const procurementReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case types.HANDLE_BOM_DRAWER:
        return { ...state, addBOMdrawer: action.payload };
           
        case types.ADD_BOM_REQUEST:
            return { ...state, addingBOM: true };
          case types.ADD_BOM_SUCCESS:
            return { ...state, addingBOM: false, addBOMdrawer: false };
          case types.ADD_BOM_FAILURE:
            return { ...state, addingBOM: false, addingBOMError: true };
      
            case types.GET_BOM_REQUEST:
              return { ...state, fetchingBOM: true };
            case types.GET_BOM_SUCCESS:
              return { ...state, fetchingBOM: false, BOMs: action.payload };
            case types.GET_BOM_FAILURE:
              return { ...state, fetchingBOM: false, fetchingBOMError: true };

              case types.HANDLE_ADD_INDENT__MODAL:
                return {
                  ...state,
                  addIndentModal: action.payload,
                };
                case types.HANDLE_PRO_DISPATCH_MODAL:
                  return {
                    ...state,
                    dispatchProcModal: action.payload,
                  };
                
      default:
        return state;
    }
    
  };
