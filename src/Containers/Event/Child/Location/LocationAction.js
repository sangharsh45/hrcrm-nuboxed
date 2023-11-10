import * as types from "./LocationActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2 } from "../../../../Config/Auth";
import Swal from 'sweetalert2';

export const handleLocationModal = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_LOCATION_MODAL, payload: modalProps });
};

export const setLocationViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_LOCATION_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const getlocation = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_LOCATION_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_LOCATION_DATA_FAILURE,
          payload: err,
        });
      });
  };
  
  export const addLocation = (save,orgId) => (dispatch) => {
    dispatch({
      type: types.ADD_LOCATION_REQUEST,
    });
  
    axios
      .post(`${base_url}/locationDetails/save`,save,  {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getlocation(orgId));
        dispatch({
          type: types.ADD_LOCATION_SUCCESS,
          payload: res.data,
        });
       // cb && cb("Success");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LOCATION_FAILURE,
          payload: err,
        });
        //cb && cb("error");
      });
  };

  export const handleLocationShiftDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_LOCATION_SHIFT_DRAWER, payload: modalProps });
  };
  
  export const handleUpdateLocationDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_UPDATE_LOCATION_DRAWER, payload: modalProps });
  };

  
  export const updateLocation = (data,locationDetailsId, cb) => (dispatch) => {
    dispatch({ type: types.UPDATE_LOCATIONS_REQUEST });
    axios
      .put(
        `${base_url}/locationDetails/${locationDetailsId}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LOCATIONS_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LOCATIONS_FAILURE,
          payload: err,
        });
      });
  };
  export const deleteLocation = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.DELETE_LOCATIONS_REQUEST,
    });
    axios
      .delete(`${base_url}/locationDetails/deleteLocationDetails/${locationDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_LOCATIONS_SUCCESS,
          payload: locationDetailsId,
        });
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 4000
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LOCATIONS_FAILURE,
          payload: err,
        });
      });
  };

  export const getShiftlocs = () => (dispatch) => {
    dispatch({
      type: types.GET_SHIFT_LOCATION_REQUEST,
    });
    axios
      .get(`${base_url2}/shift/all-shift`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_SHIFT_LOCATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_SHIFT_LOCATION_FAILURE,
          payload: err,
        });
      });
  };
  