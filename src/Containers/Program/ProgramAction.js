import * as types from "./ProgramActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { asses_url} from "../../Config/Auth";
import { message } from "antd"



export const addPrograms = (program, cb) => (dispatch) => {
    console.log(program);
    dispatch({
      type: types.ADD_PROGRAM_REQUEST,
    });
    axios
      .post(`${asses_url}/program/saveProgram`, program,
       {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("program has been added successfully!");
        // dispatch(getPrograms());
        console.log(res);
        dispatch({
          type: types.ADD_PROGRAM_SUCCESS,
          payload: { ...program },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PROGRAM_FAILURE,
        });
      });
  };


  export const setProgramViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PROGRAM_VIEW_TYPE, payload: viewType });


  export const handleProgramModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PROGRAM_MODAL,
      payload: modalProps,
    });
  };

  export const getPrograms = () => (dispatch) => {
    dispatch({
      type: types.GET_PROGRAM_REQUEST,
    });
    axios
      .get(`${asses_url}/program/getProgramDetails`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROGRAM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROGRAM_FAILURE,
          payload: err,
        });
      });
  };


  export const getProgramDetailsById = (programDetailsId) => (dispatch) => {
    dispatch({
      type: types.GET_PROGRAM_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${asses_url}/program/${programDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROGRAM_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROGRAM_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };






  
