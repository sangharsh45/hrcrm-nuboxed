import * as types from "./OrderActionTypes";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";

export const setOrderViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_ORDER_VIEW_TYPE, payload: viewType });

export const handleOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_MODAL,
    payload: modalProps,
  });
};

export const getOrderList = () => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/order/allContactOrderListBy`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorList = () => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/order/allDistributorOrderListBy`,)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getCustomerList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/contact/orderList/${userId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorOrderList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/distributor/orderList/${userId}`,)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const DistributorDeliveryDate = (payment) => (dispatch) => {
  dispatch({
    type: types.DISTRIBUTOR_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url}/report/today-dateWise-orderList`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_DELIVERY_DATE_FAILURE,
        payload: err,
      });
    });
};

export const CustomerDeliveryDate = (payment) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url}/report/today-dateWise-orderList`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.CUSTOMER_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CUSTOMER_DELIVERY_DATE_FAILURE,
        payload: err,
      });
    });
};

export const handleOrderProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PRODUCT_MODAL,
    payload: modalProps,
  });
};

export const SubmitCustomerOrderId = (payment) => (dispatch) => {
  dispatch({
    type: types.SUBMIT_CUSTOMER_ORDER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/order/productSummary`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SUBMIT_CUSTOMER_ORDER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SUBMIT_CUSTOMER_ORDER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getAllOrderList = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/phoneOrder/allphoneOrders`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};