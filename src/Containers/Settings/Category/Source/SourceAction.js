import * as types from "./SourceActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getSources = () => (dispatch) => {
    dispatch({
      type: types.GET_SOURCE_REQUEST,
    });
    axios
    .get(`${base_url}/sector`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SOURCE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SOURCE_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addSources = (source, cb) => (dispatch) => {
    console.log(source);
    dispatch({
      type: types.ADD_SOURCE_REQUEST,
    });
    axios
      .post(`${base_url}/sector`, source, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getSources());
        message.success("Sector has been added successfully!");
        console.log(res);
        dispatch({
          type: types.ADD_SOURCE_SUCCESS,
          payload: { ...source, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_SOURCE_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeSource = ( sectorId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SOURCE_REQUEST,
    });
    axios
      .delete(`${base_url}/sector/${sectorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("source has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SOURCE_SUCCESS,
          payload:sectorId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SOURCE_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateSource = ( sectorId,sectorName,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_SOURCE_REQUEST,
    });
    axios
      .put(
        `${base_url}/sector/update`,
        { sectorName,sectorId,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        message.success("Sector has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SOURCE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SOURCE_FAILURE,
        });
      });
  };
  
