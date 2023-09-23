import * as types from "./StreamActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingStreams: false,
    fetchingStreamsError: false,
    streams: [],

    addingStreams: false,
    addingStreamsError: false,

  
   
};

export const streamsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.ADD_STREAM_REQUEST:
            return { ...state, addingStreams: true };
          case types.ADD_STREAM_SUCCESS:
            return {
              ...state,
              addingStreams: false,
              streams: [...state.streams, action.payload],
              
            };
          case types.ADD_STREAM_FAILURE:
            return {
              ...state,
              addingStreams: false,
              addingStreamsError: true,
            };


            case types.GET_STREAM_REQUEST:
    return { ...state, fetchingStreams: true };
  case types.GET_STREAM_SUCCESS:
    return {
      ...state,
      fetchingStreams: false,
      streams: action.payload,
    };
  case types.GET_STREAM_FAILURE:
    return {
      ...state,
      fetchingStreams: false,
      fetchingStreamsError: true,
    };
        
    
    default:
        return state;
    }
  };