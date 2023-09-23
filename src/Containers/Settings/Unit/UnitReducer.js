import * as types from "./UnitActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingUnits: false,
    fetchingUnitsError: false,
    units: [],

    addingUnits: false,
    addingUnitsError: false,

    fetchingUnitSearchData: false,
    fetchingUnitSearchDataError: false,

    // fetchingTaskInputSearchData:false,
    // fetchingTaskInputSearchDataError:false,


    removingUnits: false,
    removingUnitsError: false,

    updatingUnits: false,
    updatingUnitsError: false,

   
};

export const unitsReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_UNITS_REQUEST:
    return { ...state, fetchingUnits: true };
  case types.GET_UNITS_SUCCESS:
    return {
      ...state,
      fetchingUnits: false,
      units: action.payload,
    };
  case types.GET_UNITS_FAILURE:
    return {
      ...state,
      fetchingUnits: false,
      fetchingUnitsError: true,
    };

    case types.ADD_UNITS_REQUEST:
    return { ...state, addingUnits: true };
  case types.ADD_UNITS_SUCCESS:
    return {
      ...state,
      addingUnits: false,
      units: [...state.units, action.payload],
      
    };
  case types.ADD_UNITS_FAILURE:
    return {
      ...state,
      addingUnits: false,
      addingUnitsError: true,
    };

    case types.UPDATE_UNITS_REQUEST:
      return { ...state, updatingUnits: true };
    case types.UPDATE_UNITS_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingUnits: false,
        units: state.units.map((unit) =>
        unit.unitId === action.payload.unitId
            ? action.payload
            : unit
        ),
      };
    case types.UPDATE_UNITS_FAILURE:
      return {
        ...state,
        updatingUnits: false,
        updatingUnitsError: true,
      };


      
     case types.REMOVE_UNITS_REQUEST:
      return { ...state, removingUnits: true };
    case types.REMOVE_UNITS_SUCCESS:
      return {
        ...state,
        removingUnits: false,
        units: state.units.filter(
          (item) => item.unitId !== action.payload
      ), 
      };
    case types.REMOVE_UNITS_FAILURE:
      return {
        ...state,
        removingUnits: false,
        removingUnitsError: true,
      };

      case types.GET_UNIT_SEARCH_REQUEST:
        return { ...state, fetchingUnitSearchData: true };
      case types.GET_UNIT_SEARCH_SUCCESS:
        return {
          ...state,
          fetchingUnitSearchData: false,
          units: action.payload,
          // serachedData: action.payload,
        };
      case types.GET_UNIT_SEARCH_FAILURE:
        return { ...state, fetchingUnitSearchDataError: true };


    
    default:
        return state;
    }
  };