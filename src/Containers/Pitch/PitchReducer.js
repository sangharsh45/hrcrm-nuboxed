
import * as types from "./PitchActionTypes";
import dayjs from "dayjs"; 

const initialState = {
    fetchingPitch:false,
    fetchingPitchError:false,
    pitchData:[],

    addingDocumentByPitchId:false,
    addingDocumentByPitchIdError:false,


    updateTypePitch:false,
    updateTypePitchError:false,


    fetchingDocumentsByPitchId:false,
    fetchingDocumentsByPitchIdError:false,
    documentsByPitchId:[],


    updatePitchById:false,
    updatePitchByIdError:false,


    fetchingPitchOpportunity:false,
    fetchingPitchOpportunityError:false,
    opportunityByPitchId:[],


    addingPitchOpportunity:false,
    addingPitchOpportunityError:false,

    addPitchOpportunityModal:false,

    addPitchModal:false,
    updatePitchModal:false,
    fetchingPitchDetailsById:false,
    fetchingPitchDetailsByIdError:false,
    pitch:{},

    addingPitch:false,
    addingPitchError:false,

    deletingPitchData:false,
  deletingPitchDataError:false,


  pitchDocumentUploadModal:false,

  setEditingPitch:{},
  };




export const pitchReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.HANDLE_PITCH_MODAL:
            return { ...state, addPitchModal: action.payload };



            case types.HANDLE_PITCH_DOCUMENT_UPLOAD_MODAL:
              return { ...state, pitchDocumentUploadModal: action.payload };


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
            addPitchModal: false ,
            pitchData:[action.payload,...state.pitchData]
        };
      case types.ADD_PITCH_FAILURE:
        return { ...state, addingPitch: false,  };  




        case types.ADD_PITCH_DOCUMENT_REQUEST:
            return {
              ...state,
              addingDocumentByPitchId: true,
              addingDocumentByPitchIdError: false,
            };
          case types.ADD_PITCH_DOCUMENT_SUCCESS:
            return {
              ...state,
              addingDocumentByPitchId: false,
              addingDocumentByPitchIdError: false,
            };
          case types.ADD_PITCH_DOCUMENT_FAILURE:
            return {
              ...state,
              addingDocumentByPitchId: false,
              addingDocumentByPitchIdError: true,
            };
        
        

        case types.SET_PITCH_EDIT:
            return { ...state, setEditingPitch: action.payload };

            case types.HANDLE_PITCH_OPPORTUNITY_MODAL:
              return { ...state, addPitchOpportunityModal: action.payload };


            case types.UPDATE_PITCH_BY_ID_REQUEST:
                return { ...state, updatePitchById: true };
              case types.UPDATE_PITCH_BY_ID_SUCCESS:
                return {
                  ...state,
                  updatePitchById: false,
                   updatePitchModal: false,
                   pitchData: state.pitchData.map((item) => {
                    if (item.investorleadsId === action.payload.investorleadsId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_PITCH_BY_ID_FAILURE:
                return {
                  ...state,
                  updatePitchById: false,
                  updatePitchByIdError: true,
                };




                case types.GET_PITCH_DETAILS_BY_ID_REQUEST:
                  return { ...state, fetchingPitchDetailsById: true };
                case types.GET_PITCH_DETAILS_BY_ID_SUCCESS:
                  return {
                    ...state,
                    fetchingPitchDetailsById: false,
                    pitch: action.payload,
                  };
                case types.GET_PITCH_DETAILS_BY_ID_FAILURE:
                  return {
                    ...state,
                    fetchingPitchDetailsById: false,
                    fetchingPitchDetailsByIdError: true,
                  };



                  case types.GET_PITCH_DOCUMENTS_REQUEST:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: true,
                      fetchingDocumentsByPitchIdError: false,
                    };
                  case types.GET_PITCH_DOCUMENTS_SUCCESS:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: false,
                      fetchingDocumentsByPitchIdError: false,
                      documentsByPitchId: action.payload,
                    };
                  case types.GET_PITCH_DOCUMENTS_FAILURE:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: false,
                      fetchingDocumentsByPitchIdError: true,
                    };



                  case types.ADD_PITCH_OPPORTUNITY_REQUEST:
                    return { ...state, addingPitchOpportunity: true };
                  case types.ADD_PITCH_OPPORTUNITY_SUCCESS:
                    return {
                      ...state,
                      addingPitchOpportunity: false,
                      addPitchOpportunityModal: false,
                      // clearbit: null,
                    };
                  case types.ADD_PITCH_OPPORTUNITY_FAILURE:
                    return {
                      ...state,
                      addingPitchOpportunity: false,
                      addingPitchOpportunityError: true,
                      // addLeadsOpportunityModal: false,
                    };



                case types.UPDATE_TYPE_FOR_PITCH_REQUEST:
                    return { ...state,updateTypePitch: true };
                  case types.UPDATE_TYPE_FOR_PITCH_SUCCESS:
                    return {
                      ...state,
                      updateTypePitch: false,
                      pitchData: state.pitchData.map((item) => {
                        if (item.investorLeadsId === action.payload.investorLeadsId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                    };
                  case types.UPDATE_TYPE_FOR_PITCH_FAILURE:
                    return { ...state, updateTypePitch: false,updateTypePitchError:true, };




                    case types.GET_PITCH_OPPORTUNITY_REQUEST:
                      return { ...state, fetchingPitchOpportunity: true };
                    case types.GET_PITCH_OPPORTUNITY_SUCCESS:
                      return {
                        ...state,
                        fetchingPitchOpportunity: false,
                        opportunityByPitchId: action.payload,
                      };
                    case types.GET_PITCH_OPPORTUNITY_FAILURE:
                      return {
                        ...state,
                        fetchingPitchOpportunity: false,
                        fetchingPitchOpportunityError: true,
                      };
        




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
