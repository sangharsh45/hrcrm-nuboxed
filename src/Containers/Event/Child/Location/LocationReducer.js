import * as types from "./LocationActionType";
const initialState = {
    addlocationModal:false ,
    viewType:"card",

    fetchingLocationData: false,
    fetchingLocationDataError: false,
    showLocation:[],

    addingLocation: false, 
    addingLocationError: false,

    locShiftDrawer:false,

  };

  export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOCATION_VIEW_TYPE:
            return { ...state, viewType: action.payload };
            case types.HANDLE_LOCATION_MODAL:
                return { ...state, addlocationModal: action.payload }; 
                
                
                case types.GET_LOCATION_DATA_REQUEST:
                  return { ...state, fetchingLocationData: true };
                // case types.GET_LOCATION_DATA_SUCCESS:
                //   return {
                //     ...state,
                //     fetchingLocationData: false,
                //     showLocation: [...state.showLocation,...action.payload]
                //   };
                case types.GET_LOCATION_DATA_SUCCESS:
                  return { ...state, fetchingLocationData: false, showLocation: action.payload };
                case types.GET_LOCATION_DATA_FAILURE:
                  return {
                    ...state,
                    fetchingLocationData: false,
                    fetchingLocationDataError: true,
                  };
            
                  case types.ADD_LOCATION_REQUEST:
                    return { ...state, addingLocation: true };
                  case types.ADD_LOCATION_SUCCESS:
                    return { ...state, addingLocation: false, addlocationModal: false };
                  case types.ADD_LOCATION_FAILURE:
                    return { ...state, addingLocation: false, 
                                    addingLocationError: true };

            case types.HANDLE_LOCATION_SHIFT_DRAWER:
                return { ...state, locShiftDrawer: action.payload }; 
                
        default:
    return state;
      }
  };