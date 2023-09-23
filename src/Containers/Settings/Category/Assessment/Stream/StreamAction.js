import * as types from "./StreamActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../../Config/Auth";
import { message } from "antd"



export const addStreams = (stream, cb) => (dispatch) => {
    console.log(stream);
    dispatch({
      type: types.ADD_STREAM_REQUEST,
    });
    axios
      .post(`${base_url}/stream/saveStream`, stream, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("stream has been added successfully!");
        dispatch(getStreams());
        console.log(res);
        dispatch({
          type: types.ADD_STREAM_SUCCESS,
          payload: { ...stream },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_STREAM_FAILURE,
        });
      });
  };

  export const getStreams = () => (dispatch) => {
    dispatch({
      type: types.GET_STREAM_REQUEST,
    });
    axios
      .get(`${base_url}/stream/getStream`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_STREAM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_STREAM_FAILURE,
          payload: err,
        });
      });
  };






  
