
import * as types from "./PitchActionTypes";
import dayjs from "dayjs"; 

const initialState = {
    fetchingPitch:false,
    fetchingPitchError:false,
    pitchData:[],


    updateTypePitch:false,
    updateTypePitchError:false,


    updatePitchById:false,
    updatePitchByIdError:false,

    addPitchModal:false,
    updatePitchModal:false,

    addingPitch:false,
    addingPitchError:false,

    deletingPitchData:false,
  deletingPitchDataError:false,

  setEditingPitch:{},
  };




export const pitchReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.HANDLE_PITCH_MODAL:
            return { ...state, addPitchModal: action.payload };


case types.GET_PITCH_REQUEST:

    return { ...state, fetchingPitch: true };
  case types.GET_PITCH_SUCCESS:
    return {
      ...state,
      fetchingPitch: false,
      pitchData: action.payload,
    };
  case types.GET_PITCH_FAILURE:
    return {
      ...state,
      fetchingPitch: false,
      fetchingPitchError: true,
    };


    case types.HANDLE_UPDATE_PITCH_MODAL:
        return { ...state, updatePitchModal: action.payload };



    case types.ADD_PITCH_REQUEST:
        return { ...state, addingPitch: true };
      case types.ADD_PITCH_SUCCESS:
        return { ...state, 
            addingPitch: false, 
        //   addLeadsModal: false ,
          // customerByUserId:[action.payload,...state.customerByUserId]
        };
      case types.ADD_PITCH_FAILURE:
        return { ...state, addingPitch: false,  };  
        
        

        case types.SET_PITCH_EDIT:
            return { ...state, setEditingPitch: action.payload };




            case types.UPDATE_PITCH_BY_ID_REQUEST:
                return { ...state, updatePitchById: true };
              case types.UPDATE_PITCH_BY_ID_SUCCESS:
                return {
                  ...state,
                  updatePitchById: false,
                //   updateLeadsModal: false,
                //   leadsAllData: state.leadsAllData.map((item) => {
                //     if (item.leadsId === action.payload.leadsId) {
                //       return action.payload;
                //     } else {
                //       return item;
                //     }
                //   }),
                };
              case types.UPDATE_PITCH_BY_ID_FAILURE:
                return {
                  ...state,
                  updatePitchById: false,
                  updatePitchByIdError: true,
                };



                case types.UPDATE_TYPE_FOR_PITCH_REQUEST:
                    return { ...state,updateTypePitch: true };
                  case types.UPDATE_TYPE_FOR_PITCH_SUCCESS:
                    return {
                      ...state,
                      updateTypePitch: false,
                    //      leadsAllData: state.leadsAllData.map((item) => {
                    //     if (item.leadsId === action.payload.leadsId) {
                    //       return action.payload;
                    //     } else {
                    //       return item;
                    //     }
                    //   }),
                    };
                  case types.UPDATE_TYPE_FOR_PITCH_FAILURE:
                    return { ...state, updateTypePitch: false,updateTypePitchError:true, };
        




        case types.DELETE_PITCH_DATA_REQUEST:
            return { ...state, deletingPitchData: true };
          case types.DELETE_PITCH_DATA_SUCCESS:
            return {
              ...state,
              deletingPitchData: false,
              pitchData: state.pitchData.filter(
                (item) => item.investorleadsId !== action.payload
              ),
            };
          case types.DELETE_PITCH_DATA_FAILURE:
            return { ...state, deletingPitchData: false, deletingPitchDataError: false };


  



    default:
return state;
}
};
