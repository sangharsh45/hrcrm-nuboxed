import * as types from "./KPIActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getKpis = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_KPI_REQUEST,
    });
    axios
    .get(`${base_url}/performanceManagement/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_KPI_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_KPI_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addKpi = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_KPI_REQUEST,
    });
    axios
      .post(`${base_url}/performanceManagement`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getKpis(orgId));
        // {res.data.message?  
        //   message.success(res.data.message):
        message.success("KPI has been added successfully!");
        // }
        console.log(res);
        dispatch({
          type: types.ADD_KPI_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_KPI_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeKpi = ( performanceManagementId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_KPI_REQUEST,
    });
    axios
      .delete(`${base_url}/performanceManagement/${performanceManagementId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("KPI has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_KPI_SUCCESS,
          payload:performanceManagementId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_KPI_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateKpi = ( performanceManagementId,kpi,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_KPI_REQUEST,
    });
    axios
      .put(
        `${base_url}/performanceManagement/${performanceManagementId}`,
        { kpi,performanceManagementId,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        message.success("KPI has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_KPI_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_KPI_FAILURE,
        });
      });
  };
  
  export const searchKpiName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_KPI_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/paymentCategory/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_KPI_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_KPI_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfKpi = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_KPI,
    });
  };

  