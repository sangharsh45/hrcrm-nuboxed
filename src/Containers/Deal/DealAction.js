import * as types from "./DealActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";
import { ActionHeader } from "../../Components/Utils";

export const setDealViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_DEAL_VIEW_TYPE,
      payload: viewType,
    });
  };
  
  export const getDealListbyUserId = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_DEAL_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/user/${userId}/${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEAL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DEAL_FAILURE,
          payload: err,
        });
      });
  };

  export const createDeals = (deal, cb) => (dispatch) => {
    dispatch({
      type: types.CREATE_DEAL_REQUEST,
    });
    axios
      .post(`${base_url}/investorOpportunity`, deal, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getOpportunityListByUserId(userId));
        // dispatch(getLatestOpportunities(userId, startDate, endDate));
        // dispatch(getOpportunitiesByPrice(userId));
        dispatch({
          type: types.CREATE_DEAL_SUCCESS,
          payload: res.data,
        });
      
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_DEAL_FAILURE,
          payload: err,
        });
      });
  };

  export const handleDealModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DEAL_MODAL,
      payload: modalProps,
    });
  };

  export const getDealDetailById = (invOpportunityId) => (dispatch) => {
    dispatch({
      type: types.GET_DEAL_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/${invOpportunityId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
        .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEAL_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DEAL_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  
  export const updateDeal = (data, invOpportunityId) => (dispatch) => {

    dispatch({ type: types.UPDATE_DEAL_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investorOpportunity/${invOpportunityId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res); 
        dispatch({
          type: types.UPDATE_DEAL_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DEAL_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleUpdateDealModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_DEAL_MODAL,
      payload: modalProps,
    });
  };
  
  export const getAllDealsbyUserId = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DEALS_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunities/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DEALS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DEALS_FAILURE,
          payload: err,
        });
      });
  };
  export const emptyDeals = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_DEALS_LIST, 
    });
  };

  export const getAllDealStages = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DEAL_STAGES_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunityWorkflow/opportunityStage/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DEAL_STAGES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DEAL_STAGES_FAILURE,
          payload: err,
        });
      });
  };