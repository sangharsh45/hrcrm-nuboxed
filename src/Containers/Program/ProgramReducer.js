import * as types from "./ProgramActionTypes";
import dayjs from "dayjs";
// import { asses_url} from "../../Config/Auth";

const initialState = {

    fetchingPrograms: false,
    fetchingProgramsError: false,
    programs: [],

    viewType: "table",


    addProgramModal:false,

    addingPrograms: false,
    addingProgramsError: false,


    fetchingProgramDetailsById: false,
    fetchingProgramDetailsByIdError: false,
    program: [],

  
   
};

export const programsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.ADD_PROGRAM_REQUEST:
            return { ...state, addingPrograms: true };
          case types.ADD_PROGRAM_SUCCESS:
            return {
              ...state,
              addingPrograms: false,
              addProgramModal:false,
              programs: [action.payload,...state.programs],
            };
          case types.ADD_PROGRAM_FAILURE:
            return {
              ...state,
              addingStreams: false,
              addingStreamsError: true,
            };


            case types.GET_PROGRAM_REQUEST:
    return { ...state, fetchingPrograms: true };
  case types.GET_PROGRAM_SUCCESS:
    return {
      ...state,
      fetchingPrograms: false,
      programs: action.payload,
    };
  case types.GET_PROGRAM_FAILURE:
    return {
      ...state,
      fetchingPrograms: false,
      fetchingProgramsError: true,
    };


  
      case types.SET_PROGRAM_VIEW_TYPE:
        return { ...state, viewType: action.payload };


        case types.HANDLE_PROGRAM_MODAL:
          return { ...state, addProgramModal: action.payload };
  
       
          case types.GET_PROGRAM_DETAILS_BY_ID_REQUEST:
            return { ...state, fetchingProgramDetailsById: true };
          case types.GET_PROGRAM_DETAILS_BY_ID_SUCCESS:
            return {
              ...state,
              fetchingProgramDetailsById: false,
              program: action.payload,
            };
          case types.GET_PROGRAM_DETAILS_BY_ID_FAILURE:
            return {
              ...state,
              fetchingProgramDetailsById: false,
              fetchingProgramDetailsByIdError: true,
            };    


    
    default:
        return state;
    }
  };