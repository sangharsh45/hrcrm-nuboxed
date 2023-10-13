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