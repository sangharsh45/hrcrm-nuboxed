import * as types from "./RequirementActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";


export const setRequirementViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_REQUIREMENT_VIEW_TYPE,
      payload: viewType,
    });
  };

 

  export const getRequirementRecord = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_REQUIREMENT_RECORD_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/record/today/${userId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },   
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REQUIREMENT_RECORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REQUIREMENT_RECORD_FAILURE,
          payload: err,
        });
      });
  };


  export const getAllRequirementTable = (orgId) => (dispatch) => {
    dispatch({ type: types.GET_ALL_REQUIREMENT_TABLE_REQUEST });
  
    axios
      .get(`${base_url}/link/recruitment/all/recruitment/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        // dispatch(getDeliveryUser());
        console.log(res);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_SUCCESS ,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_FAILURE ,
        });
      });
  };