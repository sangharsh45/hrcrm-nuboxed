import * as types from "./InvoiceActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url} from "../../Config/Auth";
import { message } from "antd";

export const getCandidatesTotalBillingsForInvoice = (customerId,projectId,month,year) => (dispatch) => {
    console.log("inside add candidate");
    dispatch({
      type: types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_REQUEST,
    });
    axios
      .get(`${base_url}/hour/candidate/billings/invoice/${customerId}/${projectId}/${month}/${year}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_FAILURE,
          payload: err,
        });
      });
  };

  export const setInvoiceViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_INVOICE_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const handleInvoiceModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVOICE_MODAL,
      payload: modalProps,
    });
  };

  export const updateInvoiceData = (data, analysisId, cb) => (dispatch) => {
    dispatch({
      type: types.UPDATE_INVOICE_DATA_REQUEST,
    });
    axios
      .post(`${base_url}/hour/invoice/save `, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        // dispatch(getUsedItemsOfAanalysisForPO(analysisId))
        // dispatch(getCheckedItemsFromApprovedAnalysis(res.data))
        dispatch({
          type: types.UPDATE_INVOICE_DATA_SUCCESS,
          payload: res.data,
        });
        cb && cb("success");
      })
      .catch((err) => {
        dispatch({
          type: types.UPDATE_INVOICE_DATA_FAILURE,
        });
        cb && cb();
      });
  };

  export const getListOfInvoice = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_INVOICE_REQUEST,
    });
    axios
      .get(`${base_url}/hour/invoice/get-All/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVOICE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVOICE_FAILURE,
          payload: err,
        });
      });
  };