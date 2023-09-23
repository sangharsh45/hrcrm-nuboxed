import * as types from "./LevelActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"



/**
* add a new LEVELS
*/
export const addLevels = (levels, cb) => (dispatch) => {
    console.log(levels);
    dispatch({
      type: types.ADD_LEVELS_REQUEST,
    });
    axios
      .post(`${base_url}/level/saveLevel`, levels, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLevels());
        message.success("Level has been added successfully!");
       
        console.log(res);
        dispatch({
          type: types.ADD_LEVELS_SUCCESS,
          payload: {
            ...levels,
            // leadDocumentId: res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEVELS_FAILURE,
        });
        cb();
      });
  };

  export const getLevels = () => (dispatch) => {
    dispatch({
        type: types.GET_LEVELS_REQUEST,
    });
    axios
    .get(`${base_url}/level/getAllLevel`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEVELS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEVELS_FAILURE,
          payload: err,
        });
      });
  };







  
