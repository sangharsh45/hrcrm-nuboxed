import * as types from "./ProjectActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingProjectsData: false,
    fetchingProjectsDataError: false,
    projectsData: [],

    addingProjectsData: false,
    addingProjectsDataError: false,

    fetchingProjectInputSearchData:false,
    fetchingProjectInputSearchDataError:false,


    removingProjectsData: false,
    removingProjectsDataError: false,

    updatingProjectsData: false,
    updatingProjectsDataError: false,

   
};

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_PROJECTS_DATA_REQUEST:
    return { ...state, fetchingProjectsData: true };
  case types.GET_PROJECTS_DATA_SUCCESS:
    return {
      ...state,
      fetchingProjectsData: false,
      projectsData: action.payload,
    };
  case types.GET_PROJECTS_DATA_FAILURE:
    return {
      ...state,
      fetchingProjectsData: false,
      fetchingProjectsDataError: true,
    };

    case types.ADD_PROJECTS_DATA_REQUEST:
    return { ...state, addingProjectsData: true };
  case types.ADD_PROJECTS_DATA_SUCCESS:
    return {
      ...state,
      addingProjectsData: false,
      projectsData: [...state.projectsData, action.payload],
      
    };
  case types.ADD_PROJECTS_DATA_FAILURE:
    return {
      ...state,
      addingProjectsData: false,
      addingProjectsDataError: true,
    };

    case types.UPDATE_PROJECTS_DATA_REQUEST:
      return { ...state, updatingProjectsData: true };
    case types.UPDATE_PROJECTS_DATA_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingProjectsData: false,
        projectsData: state.projectsData.map((project) =>
        project.projectId === action.payload.projectId
            ? action.payload
            : project
        ),
      };
    case types.UPDATE_PROJECTS_DATA_FAILURE:
      return {
        ...state,
        updatingProjectsData: false,
        updatingProjectsDataError: true,
      };


      
     case types.REMOVE_PROJECTS_DATA_REQUEST:
      return { ...state, removingProjectsData: true };
    case types.REMOVE_PROJECTS_DATA_SUCCESS:
      return {
        ...state,
        removingProjectsData: false,
        projectsData: state.projectsData.filter(
          (item) => item.projectId !== action.payload
      ), 
      };
    case types.REMOVE_PROJECTS_DATA_FAILURE:
      return {
        ...state,
        removingProjectsData: false,
        removingProjectsDataError: true,
      };


      // case types.GET_PROJECT_SEARCH_REQUEST:
      //   return { ...state, fetchingProjectInputSearchData: true };
      // case types.GET_PROJECT_SEARCH_SUCCESS:
      //   return {
      //     ...state,
      //     fetchingProjectInputSearchData: false,
      //     projectsData: action.payload,
      //     // serachedData: action.payload,
      //   };
      // case types.GET_PROJECT_SEARCH_FAILURE:
      //   return { ...state, fetchingProjectInputSearchDataError: true };

   

    default:
        return state;
    }
  };