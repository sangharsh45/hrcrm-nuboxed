
import * as types from "./PitchActionTypes";
import dayjs from "dayjs"; 

const initialState = {
    fetchingPitch:false,
    fetchingPitchError:false,
    pitchData:[],

    fetchingNotesListByPitchId: false,
          fetchingNotesListByPitchIdError: false,
          notesListByPitchId:[],

    addingDocumentByPitchId:false,
    addingDocumentByPitchIdError:false,

    linkingPitchStatus:false,
    linkingPitchStatusError:false,

    fetchingPitchRecords: false,
    fetchingPitchRecordsError: false,
    pitchRecord:[],

    fetchingPitchStatus: false,
    fetchingPitchStatusError: false,
    pitchStatus:[],


    updateTypePitch:false,
    updateTypePitchError:false,

    addDrawerPitchNotesModal:false,


    fetchingDocumentsByPitchId:false,
    fetchingDocumentsByPitchIdError:false,
    documentsByPitchId:[],


    updatePitchById:false,
    updatePitchByIdError:false,

    fetchingPitchSearchData:false,
    fetchingPitchSearchDataError:false,

    addingNotesByPitchId: false,
    addingNotesByPitchIdError: false,


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

  openASSImodal:false,

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
                    if (item.investorLeadsId === action.payload.investorLeadsId) {
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



                case types.CONVERT_PITCH_STATUS_REQUEST:
                  return { ...state, linkingPitchStatus: true };
                case types.CONVERT_PITCH_STATUS_SUCCESS:
                  return {
                    ...state,
                    linkingPitchStatus: false,
                   
                  };
                case types.CONVERT_PITCH_STATUS_FAILURE:
                  return {
                    ...state,
                    linkingPitchStatus: false,
                    linkingPitchStatusError: true,
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

            case types.GET_PITCH_RECORDS_REQUEST:
              return { ...state, fetchingPitchRecords: true };
            case types.GET_PITCH_RECORDS_SUCCESS:
              return {
                ...state,
                fetchingPitchRecords: false,
                pitchRecord: action.payload,
              };
            case types.GET_PITCH_RECORDS_FAILURE:
              return {
                ...state,
                fetchingPitchRecords: false,
                fetchingPitchRecordsError: true,
              };
  
              case types.HANDLE_ASSI_MODAL:
                return { ...state, openASSImodal: action.payload };


                case types.GET_PITCH_TIMELINE_REQUEST:
                  return { ...state, fetchingPitchStatus: true };
              case types.GET_PITCH_TIMELINE_SUCCESS:
                  return {
                      ...state,
                      fetchingPitchStatus: false,
                      pitchStatus: action.payload,
                  };
              case types.GET_PITCH_TIMELINE_FAILURE:
                  return {
                      ...state,
                      fetchingPitchStatus: false,
                      fetchingPitchStatusError: true,
                  };

                  case types.GET_PITCH_SEARCH_REQUEST:
                    return { ...state, fetchingPitchSearchData: true };
                  case types.GET_PITCH_SEARCH_SUCCESS:
                    return {
                      ...state,
                      fetchingPitchSearchData: false,
                      pitchData: action.payload,
                      // serachedData: action.payload,
                    };
                  case types.GET_PITCH_SEARCH_FAILURE:
                    return { ...state, fetchingPitchSearchDataError: true };

                    case types.HANDLE_PITCH_NOTES_DRAWER_MODAL:
                      return { ...state, addDrawerPitchNotesModal: action.payload };

                      case types.ADD_PITCH_NOTES_REQUEST:
                        return {
                          ...state,
                          addingNotesByPitchId: true,
                        };
                      case types.ADD_PITCH_NOTES_SUCCESS:
                        return {
                          ...state,
                          addingNotesByPitchId: false,
                          addingNotesByPitchId: false,
                          addDrawerPitchNotesModal: false,
                        };
                      case types.ADD_PITCH_NOTES_FAILURE:
                        return {
                          ...state,
                          addingNotesByPitchId: false,
                          addingNotesByPitchIdError: true,
                        };

                        
      case types.GET_NOTES_LIST_BY_PITCH_ID_REQUEST:
        return { ...state, fetchingNotesListByPitchId: true };
      case types.GET_NOTES_LIST_BY_PITCH_ID_SUCCESS:
        return {
          ...state,
          fetchingNotesListByPitchId: false,
          notesListByPitchId: action.payload,
        };
      case types.GET_NOTES_LIST_BY_PITCH_ID_FAILURE:
        return {
          ...state,
          fetchingNotesListByPitchId: false,
          fetchingNotesListByPitchIdError: true,
        };
              
                

    default:
return state;
}
};
