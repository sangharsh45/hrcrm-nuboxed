import * as types from "./ContactInvestActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setContactInvetViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_CONTACT_INVEST_VIEW_TYPE, payload: viewType });

export const handleContactInvestModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CONTACT_INVEST_MODAL,
      payload: modalProps,
    });
  }
  
 export const addContactInvest = (contact) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_CONTACT_INVEST_REQUEST,
    });
    axios
      .post(`${base_url}/contact`, contact, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getRecords(userId,0));
        dispatch({
          type: types.ADD_CONTACT_INVEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CONTACT_INVEST_FAILURE,
          payload: err,
        });
      });
  };

  export const getContactInvestByUserId = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_CONTACTS_INVEST_REQUEST,
    });
    axios
      .get(`${base_url}/contact/user/${userId}/${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CONTACTS_INVEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CONTACTS_INVEST_FAILURE,
          payload: err,
        });});};

export const emptyContactInvest = () => (dispatch) => {
    dispatch({ type: types.EMPTY_CONTACT_INVEST_LIST,});};

export const handleUpdateContactInvestModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_CONTACT_INVEST_MODAL,
      payload: modalProps,});};
  
export const updateContactInvest=(data,contactId)=>(dispatch)=>{
  dispatch({ type: types.UPDATE_CONTACT_INVEST_REQUEST });
  axios
    .put(`${base_url}/contact/${contactId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_INVEST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CONTACT_INVEST_FAILURE,
        payload: err,
      });
    });
}

export const getContactInvestByContactId = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_REQUEST,
  });
  axios
    .get(`${base_url}/contact/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_FAILURE,
        payload: err,
      });
    });
};

export const getContactInvest = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACTINVEST_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investor/contact/record/count/investor/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACTINVEST_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACTINVEST_RECORDS_FAILURE,
        payload: err,
      });
    });
};
