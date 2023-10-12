import * as types from "./InvestorActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setInvestorViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_INVESTOR_VIEW_TYPE,
      payload: viewType,
    });
};

export const getInvestorsbyId = (userId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const emptyInvestor = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_INVESTOR_LIST, 
    });
  };

  export const AddInvestor = (investor) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_INVESTOR_REQUEST,
    });
    axios
      .post(`${base_url}/investor`, investor, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getRecords(userId));
        dispatch({
          type: types.ADD_INVESTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVESTOR_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_MODAL,
      payload: modalProps,
    });
  };
  export const handleUpdateInvestorModal=(modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_UPDATE_MODAL,
      payload: modalProps,
    });
  };
  export const UpdateInvestor = (data, investorId) => (dispatch) => {
    dispatch({ type: types.UPDATE_INVESTOR_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investor/${investorId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
export const getInvestorDetailsById = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getContactListByInvestorId = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_CONTACT_REQUEST,
    });
    axios
      .get(`${base_url}/investor/contacts/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_FAILURE,
          payload: err,
        });
      });
  };