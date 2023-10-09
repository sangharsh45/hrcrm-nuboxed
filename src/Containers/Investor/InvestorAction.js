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

export const getInvestorsbyId = (investorId,page) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/contacts/${investorId}/${page}`, {
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