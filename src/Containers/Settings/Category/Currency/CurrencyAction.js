import * as types from "./CurrencyActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

  export const getCurrencyList = () => (dispatch) => {
    dispatch({
      type: types.GET_CURRENCY_LIST_REQUEST,
    });
    axios
    .get(`${base_url}/countries/currency/list`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CURRENCY_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CURRENCY_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const linkCountryToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_COUNTRY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/mandatory/${countryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const linkCountrySalesToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_COUNTRY_SALES_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/salesInd/${countryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_COUNTRY_SALES_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_COUNTRY_SALES_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const allCurrencyMandatory = (currencyId) => (dispatch) => {

    dispatch({
      type: types.ALL_CURRENCY_MANDATORY_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/mandatory/${currencyId}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ALL_CURRENCY_MANDATORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ALL_CURRENCY_MANDATORY_FAILURE,
          payload: err,
        });
      })
  };


