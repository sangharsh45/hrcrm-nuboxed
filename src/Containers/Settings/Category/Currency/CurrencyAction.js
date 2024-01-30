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

  export const linkCurrencyToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_CURRENCY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/mandatory/${currencyId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_CURRENCY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_CURRENCY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

 

  export const allCurrencyMandatory = (currencyId) => (dispatch) => {

    dispatch({
      type: types.ALL_CURRENCY_MANDATORY_REQUEST,
    });
    axios
    .put(`${base_url}/`,{}, {
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


