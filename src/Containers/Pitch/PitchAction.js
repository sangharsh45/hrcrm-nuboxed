import * as types from "./PitchActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { asses_url } from "../../Config/Auth";
import { message } from "antd";





export const getPitch = (userId) => (dispatch) => {
 
    dispatch({
      type: types.GET_PITCH_REQUEST,
    });
    axios
      .get(`${base_url}/investorleads/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PITCH_FAILURE,
          payload: err,
        });
      });
  };


  export const addPitch = (leads) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add leads");
    dispatch({
      type: types.ADD_PITCH_REQUEST,
    });
  
    axios
      .post(`${base_url}/leads`, leads, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getLeads(userId));
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getRecords(userId));
  
        dispatch({
          type: types.ADD_PITCH_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PITCH_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };

  export const setEditPitch = (name) => (dispatch) => {
    dispatch({
      type: types.SET_PITCH_EDIT,
      payload: name,
    });
  };


  export const deletePitchData = (investorleadsId,orgId) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // console.log("inside deleteCall", callId);
    dispatch({
      type: types.DELETE_PITCH_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/investorleads/${investorleadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        //  dispatch(getScheduler(orgId));
        dispatch({
          type: types.DELETE_PITCH_DATA_SUCCESS,
          payload: investorleadsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_PITCH_DATA_FAILURE,
          payload: err,
        });
      });
  };


  export const handlePitchModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PITCH_MODAL,
      payload: modalProps,
    });
  };

  export const handleUpdatePitchModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_PITCH_MODAL,
      payload: modalProps,
    });
  };


  export const updatePitch = (data, investorleadsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_PITCH_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investorleads/${investorleadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_PITCH_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_PITCH_BY_ID_FAILURE,
          payload: err,
        });
      });
  };


  export const updateTypeForPitch = (investorleadsId,type,data) => (dispatch) => {
    dispatch({ type: types.UPDATE_TYPE_FOR_PITCH_REQUEST });
    axios
      .put(
        `${base_url}/investorLeads/type/update/${investorleadsId}/${type}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_PITCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_PITCH_FAILURE,
          payload:err
        });
      });
  };