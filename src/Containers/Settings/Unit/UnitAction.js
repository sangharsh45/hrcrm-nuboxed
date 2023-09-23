import * as types from "./UnitActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getUnits = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_UNITS_REQUEST,
  });
  axios
    .get(`${base_url}/unit/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_UNITS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_UNITS_FAILURE,
        payload: err,
      });
    });
};

export const addUnits = (unit, cb) => (dispatch,getState) => {
  const orgId = getState().auth.userDetails.organizationId;
  console.log(unit);
  dispatch({
    type: types.ADD_UNITS_REQUEST,
  });
  axios
    .post(`${base_url}/unit/save`, unit, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Unit has been added successfully!");
       dispatch(getUnits(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_UNITS_SUCCESS,
        payload: { ...unit },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_UNITS_FAILURE,
      });
    });
};

export const updateUnits = (unitId, unitName, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_UNITS_REQUEST,
  });
  axios
    .put(
      `${base_url}/unit`,
      { unitName, unitId ,editInd:"true" 
    },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      message.success("Unit has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_UNITS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_UNITS_FAILURE,
      });
    });
};


export const removeUnits = ( unitId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_UNITS_REQUEST,
  });
  axios
    .delete(`${base_url}/unit/${unitId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Unit has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_UNITS_SUCCESS,
        payload:unitId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_UNITS_FAILURE,
      });
    });
};
export const searchUnitName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_UNIT_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/search/unitDetails/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // const actualData = res.data;
      // const filteredData = actualData.filter((item) => { return item.name !== null })
      message.success(res.data.message);
    
    
      dispatch({
        type: types.GET_UNIT_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_UNIT_SEARCH_FAILURE,
        payload: err,
      });
    });
}; 