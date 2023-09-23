import * as types from "./LevelActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingLevels: false,
    fetchingLevelsError: false,
    levels: [],

    addingLevels: false,
    addingLevelsError: false,

    // removingSectors: false,
    // removingSectorsError: false,

    // updatingSectors: false,
    // updatingSectorsError: false,

    // fetchingSectorSearchData:false,
    // fetchingSectorSearchDataError:false,
   
};

export const levelsReducer = (state = initialState, action) => {
    switch (action.type) {

// add sector

case types.ADD_LEVELS_REQUEST:
    return { ...state, addingLevels: true };
  case types.ADD_LEVELS_SUCCESS:
    return {
      ...state,
      addingLevels: false,
      levels: [...state.levels, action.payload],
      
    };
  case types.ADD_LEVELS_FAILURE:
    return {
      ...state,
      addingLevels: false,
      addingLevelsError: true,
    };

    case types.GET_LEVELS_REQUEST:
        return { ...state, fetchingLevels: true };
      case types.GET_LEVELS_SUCCESS:
        return {
          ...state,
          fetchingLevels: false,
          levels: action.payload,
        };
      case types.GET_LEVELS_FAILURE:
        return {
          ...state,
          fetchingLevels: false,
          fetchingLevelsError: true,
        };


    
    default:
        return state;
    }
  };