import * as types from "./ProcurementActionType";
import axios from "axios";
import { base_url } from "../../Config/Auth";


export const handleBOMdrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BOM_DRAWER,
    payload: modalProps,
  });
};


export const AddBOM = (bom) => (dispatch) => {
    dispatch({
      type: types.ADD_BOM_REQUEST,
    });  
    axios
      .post(`${base_url}/bom`, bom, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_BOM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_BOM_FAILURE,
          payload: err,
        });
      });
  };
  export const getBOM = (pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_BOM_REQUEST,
    });
  
    axios
    .get(`${base_url}/bom/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_BOM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_BOM_FAILURE,
          payload: err,
        });
      });
  };
  export const handleAddIndentModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ADD_INDENT__MODAL,
      payload: modalProps,
    });
  };
  export const handleProcDispatchModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PRO_DISPATCH_MODAL,
      payload: modalProps,
    });
  };
  