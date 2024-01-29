import * as types from "./LibraryActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingLibrarys: false,
    fetchingLibrarysError: false,
    librarys: [],

    fetchingLibraryByOrgId: false,
    fetchingLibraryByOrgIdError: false,
    libraryRecordData:{},

    fetchingCertificationByOrgId: false,
    fetchingCertificationByOrgIdError: false,
    certificationRecordData:{},

    removingSkills: false,
    removingSkillsError: false,

    addingLibrarys: false,
    addingLibrarysError: false,

    // removingLibrarys: false,
    // removingLibrarysError: false,
    updatingLibrarys: false,
    updatingLibrarysError: false,

    fetchingLibrarySearchData:false,
    fetchingLibrarySearchDataError:false,
   
};

export const librarysReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_LIBRARYS_REQUEST:
        return { ...state, fetchingLibrarys: true };
      case types.GET_LIBRARYS_SUCCESS:
        return { ...state, fetchingLibrarys: false, librarys: action.payload };
      case types.GET_LIBRARYS_FAILURE:
        return { ...state, fetchingLibrarys: false, fetchingLibrarysError: true };


         /**
     * add a new document 
     */
    case types.ADD_LIBRARYS_REQUEST:
        return { ...state, addingLibrarys: true };
      case types.ADD_LIBRARYS_SUCCESS:
        return {
          ...state,
          addingLibrarys: false,
          librarys:[action.payload,...state.librarys]
          // librarys: [...state.librarys, action.payload],
        };
      case types.ADD_LIBRARYS_FAILURE:
        return { ...state, addingLibrarys: false, addingLibrarysError: true };


         /**
     * remove an existing LIBRARYS
     */
    case types.REMOVE_LIBRARYS_REQUEST:
        return { ...state, removingLibrarys: true };
      case types.REMOVE_LIBRARYS_SUCCESS:
        return {
          ...state,
          removingLibrarys: false,
          librarys: state.librarys.filter(
            (library) => library.libraryTypeId !== action.payload
          ),
        };
      case types.REMOVE_LIBRARYS_FAILURE:
        return { ...state, removingLibrarys: false, removingLibrarysError: true };



         /**
     * update an existing LIBRARYS
     */
    case types.UPDATE_LIBRARYS_REQUEST:
        return { ...state, updatingLibrarys: true };
      case types.UPDATE_LIBRARYS_SUCCESS:
        // return { ...state, updatingLibrarys: false, Librarys: [...state.Librarys, action.payload] };
        return {
          ...state,
          updatingLibrarys: false,
          librarys: state.librarys.map((library) =>
          library.definationId === action.payload.definationId
              ? action.payload
              : library
          ),
        };
      case types.UPDATE_LIBRARYS_FAILURE:
        return { ...state, updatingLibrarys: false, updatingLibrarysError: true };

        case types.GET_LIBRARY_SEARCH_REQUEST:
          return { ...state, fetchingLibrarySearchData: true };
        case types.GET_LIBRARY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingLibrarySearchData: false,
            librarys: action.payload,
          };
        case types.GET_LIBRARY_SEARCH_FAILURE:
          return { ...state, fetchingLibrarySearchDataError: true };
          case types.REMOVE_SKILLS_REQUEST:
            return { ...state, removingSkills: true };
          case types.REMOVE_SKILLS_SUCCESS:
            return {
              ...state,
              removingSkills: false,
              librarys: state.librarys.filter(
                (item) => item.definationId !== action.payload
            ), 
            };
          case types.REMOVE_SKILLS_FAILURE:
            return {
              ...state,
              removingSkills: false,
              removingSkillsError: true,
            };

            case types.HANDLE_CLAER_REDUCER_DATA_LIBRARY:
              return { ...state, 
                librarys: [], 
                // deletedTruck: [] 
              };


              case types.GET_LIBRARY_RECORDS_REQUEST:
                return { ...state, fetchingLibraryByOrgId: true };
              case types.GET_LIBRARY_RECORDS_SUCCESS:
                return {
                  ...state,
                  fetchingLibraryByOrgId: false,
                  libraryRecordData: action.payload,
                };
              case types.GET_LIBRARY_RECORDS_FAILURE:
                return {
                  ...state,
                  fetchingLibraryByOrgId: false,
                  fetchingLibraryByOrgIdError: true,
                };

                case types.GET_CERTIFICATION_RECORDS_REQUEST:
                  return { ...state, fetchingCertificationByOrgId: true };
                case types.GET_CERTIFICATION_RECORDS_SUCCESS:
                  return {
                    ...state,
                    fetchingCertificationByOrgId: false,
                    certificationRecordData: action.payload,
                  };
                case types.GET_CERTIFICATION_RECORDS_FAILURE:
                  return {
                    ...state,
                    fetchingCertificationByOrgId: false,
                    fetchingCertificationByOrgIdError: true,
                  };



        default:
            return state;
        }
      };
