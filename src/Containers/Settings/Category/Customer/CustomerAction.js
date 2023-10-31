import * as types from "./CustomerActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getCustomer = () => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_REQUEST,
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
          type: types.GET_CUSTOMER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CUSTOMER_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addCustomer = (sectors, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_CUSTOMER_REQUEST,
    });
    axios
      .post(`${base_url}/sector`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCustomer());
        {res.data.message?  
          message.success(res.data.message):
        message.success("CUSTOMER has been added successfully!");
        }
        console.log(res);
        dispatch({
          type: types.ADD_CUSTOMER_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_CUSTOMER_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeCustomer = ( sectorId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_CUSTOMER_REQUEST,
    });
    axios
      .delete(`${base_url}/sector/${sectorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("CUSTOMER has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_CUSTOMER_SUCCESS,
          payload:sectorId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_CUSTOMER_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateCustomer = ( sectorId,sectorName,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_CUSTOMER_REQUEST,
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
        
        message.success("CUSTOMER has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_CUSTOMER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_CUSTOMER_FAILURE,
        });
      });
  };
  
  export const searchCustomerName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/sector/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 