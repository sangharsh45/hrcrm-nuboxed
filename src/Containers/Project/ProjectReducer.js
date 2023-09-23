import * as types from "./ProjectActionTypes";

const initialState = {
    addProjectModal: false,

    addingProject: false,
    addingProjectError: false,
    updatingProject: false,
    updatingProjectError: false,
   
  };
  export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.HANDLE_PROJECT_MODAL:
        return { ...state, addProjectModal: action.payload };
    case types.ADD_PROJECT_REQUEST:
      return { ...state, addingProject: true };
    case types.ADD_PROJECT_SUCCESS:
      return { ...state, addingProject: false, addProjectModal:false };
    case types.ADD_PROJECT_FAILURE:
      return {
        ...state,
        addingProject: false,
        addingProjectError: false,
        addProjectModal: false,
      };

       /**
     * update a project
     */
    case types.UPDATE_PROJECT_BY_ID_REQUEST:
      return { ...state, updatingProject: true };
    case types.UPDATE_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingProject: false,
        // eventListRangeByUserId: state.eventListRangeByUserId.map((item, i) => {
        //   //debugger;
        //   if (
        //     item.eventId === action.payload.eventId

        //   ) {
        //     //debugger;
        //     return action.payload;
        //   } else {
        //     //debugger;
        //     return item;
        //   }
        // })
      };
    case types.UPDATE_PROJECT_BY_ID_FAILURE:
      return { ...state, updatingProject: false, updatingProjectError: false };
      default:
        return state;
    }
    return state;
  };
