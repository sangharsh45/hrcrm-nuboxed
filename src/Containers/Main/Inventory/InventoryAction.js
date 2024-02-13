import * as types from "./InventoryActionType";
import { base_url } from "../../../Config/Auth";
import { base_url2 } from "../../../Config/Auth";

import axios from "axios";
import moment from "moment";
import { message } from "antd";

export const setInventoryViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_INVENTORY_VIEW_TYPE, payload: viewType });

export const handleInventoryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_MODAL,
    payload: modalProps,
  });
};
export const handleAddDispatchModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_DISPATCH_MODAL,
    payload: modalProps,
  });
};
//add Inventory
export const addInventory = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_INVENTORY_REQUEST,
  });

  axios
    .post(`${base_url}/`, data, {})
    .then((res) => {
      console.log(res);
      // dispatch(getINVENTORY());
      dispatch({
        type: types.ADD_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

//get inventory data

export const getInventory = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_REQUEST,
  });
  axios
    .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

//INVENTORY Details
export const getInventoryById = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/locationDetails/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a inventory output
 */
export const addInventoryOutput = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_INVENTORY_OUTPUT_REQUEST,
  });

  axios
    .post(`${base_url}/inventory/production/productLink`, data)
    .then((res) => {
      console.log(res);
      dispatch(getInventoryOutputList(locationDetailsId));
      console.log(locationDetailsId);
      dispatch({
        type: types.ADD_INVENTORY_OUTPUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_OUTPUT_FAILURE,
        payload: err,
      });
    });
};

//OUTPUT TABLE
export const getInventoryOutputList = (locationDetailsId) => (dispatch) => {
  console.log(locationDetailsId);
  dispatch({
    type: types.GET_ALL_INVENTORY_OUTPUT_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/production/product/${locationDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_INVENTORY_OUTPUT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_INVENTORY_OUTPUT_LIST_FAILURE,
        payload: err,
      });
    });
};

//add inventory Consumption

export const addInventoryConsumption = (data, locationDetailsId) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_INVENTORY_CONSUMPTION_REQUEST,
  });

  axios
    .post(`${base_url2}/inventory/inventorySuppliesLink`, data)
    .then((res) => {
      console.log(res);

      dispatch(getInventoryConsumptionList(locationDetailsId));

      dispatch({
        type: types.ADD_INVENTORY_CONSUMPTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_CONSUMPTION_FAILURE,
        payload: err,
      });
    });
};

//Consumption TABLE
export const getInventoryConsumptionList = (locationDetailsId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/supplies/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_FAILURE,
        payload: err,
      });
    });
};
//particularRow edit or update
export const setEditInventory = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY,
    payload: name,
  });
};

export const handleReceivedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_MODAL,
    payload: modalProps,
  });
};
export const handleCreateAWB = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_AWB_MODAL,
    payload: modalProps,
  });
};
export const setInventoryDetailViewType = (inventoryViewType) => (dispatch) =>
  dispatch({ type: types.SET_INVENTORY_DETAIL_VIEW_TYPE, payload: inventoryViewType });

export const handleAddAWB = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_AWB_MODAL,
    payload: modalProps,
  });
};
//add received
export const createAwbNo = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_RECEIVED_REQUEST,
  });

  axios
    .post(`${base_url2}/orderAwb/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(id))
      dispatch({
        type: types.ADD_RECEIVED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECEIVED_FAILURE,
        payload: err,
      });
    });
};

//get received user list
export const getReceivedUserList = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_RECEIVED_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/get-all/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECEIVED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECEIVED_FAILURE,
        payload: err,
      });
    });
};

//get material receive table data

export const getMaterialReceivedList = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_RECEIVED_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/getPolist/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_RECEIVED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_RECEIVED_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleFileDamagedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FILE_DAMAGED_MODAL,
    payload: modalProps,
  });
};

//add dispatch
export const addDispatch = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_DISPATCH_REQUEST,
  });

  axios
    .post(`${base_url}/dispatch/dispatchSuppliesLink`, data)
    .then((res) => {
      console.log(res);
      dispatch(getDispatch(res.data));
      // dispatch(getDispatchList(locationDetailsId));
      dispatch({
        type: types.ADD_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISPATCH_FAILURE,
        payload: err,
      });
    });
};

//get Dispatch first table

export const getDispatch = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_REQUEST,
  });
  axios
    .get(`${base_url}/dispatch/dispatchSuppliesLink/${dispatchId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_FAILURE,
        payload: err,
      });
    });
};

//shipper contact checkbox
export const completeShipperContact = (data, dispatchId) => (dispatch) => {
  dispatch({
    type: types.COMPLETE_SHIPPER_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/saveDispatchShipperDetails`, data)
    .then((res) => {
      dispatch(getDispatchShipperListInUpdate(dispatchId));
      dispatch({
        type: types.COMPLETE_SHIPPER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.COMPLETE_SHIPPER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};

//store one row data in seconsteptable
// export const setEditShipperContactData = (contact) => (dispatch) => {
//   dispatch({
//     type: types.SET_EDIT_SHIPPER_CONTACT_DATA,
//     payload: contact,
//   });
// };

//get dispatch list
export const getDispatchList = (locationId) => (dispatch) => {
  // const dispatchId = getState().inventory.dispatch.dispatchId;
  dispatch({
    type: types.GET_DISPATCH_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/get-dispatchData/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_LIST_FAILURE,
        payload: err,
      });
    });
};

//get received details list
export const getReceivedDetailsList = (dispatchId) => (dispatch, getState) => {
  // const dispatchId = getState().inventory.allDispatchList
  //   .dispatchId;
  console.log(dispatchId);
  dispatch({
    type: types.GET_RECEIVED_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/plant/dispatchSupplies/${dispatchId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECEIVED_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECEIVED_DETAILS_FAILURE,
        payload: err,
      });
    });
};
//dispatch Update
export const setEditDispatch = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_DISPATCH,
    payload: name,
  });
};

export const getDispatchUpdateList = (orderPhoneId) => (dispatch, getState) => {

  dispatch({
    type: types.GET_DISPATCH_UPDATE_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/dispatchPhoneDetail/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const handleDispatchModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISPTCH_MODAL,
    payload: modalProps,
  });
};

export const addReceivedItem = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_TOTAL_RECEIVED_ITEM_REQUEST,
  });
  axios
    .post(`${base_url2}/recieved`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_TOTAL_RECEIVED_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOTAL_RECEIVED_ITEM_FAILURE,
        payload: err,
      });
    });
};
export const addDamagedItem = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_TOTAL_DAMAGED_ITEM_REQUEST,
  });
  axios
    .post(`${base_url}/damaged`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_TOTAL_DAMAGED_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOTAL_DAMAGED_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const handlePickupDateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PICKUP_DATE_MODAL,
    payload: modalProps,
  });
};

//thirdStep url
export const addFinalDispatchData = (data, orderId, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_FINAL_DATA_IN_THIRDSTEP_REQUEST,
  });
  axios
    .put(`${base_url2}/dispatchData/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(locationDetailsId));
      dispatch({
        type: types.ADD_FINAL_DATA_IN_THIRDSTEP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_FINAL_DATA_IN_THIRDSTEP_FAILURE,
        payload: err,
      });
    });
};

export const handleOutputReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OUTPUT_REASON_MODAL,
    payload: modalProps,
  });
};
export const setEditInventoryOutput = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY_OUTPUT,
    payload: name,
  });
};
//post reason

export const addOutputReason = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_REASON_REQUEST,
  });
  axios
    .post(`${base_url}/inventory/saveInventoryOutputSale`, data)
    .then((res) => {
      dispatch(getInventoryOutputList(locationDetailsId));
      dispatch({
        type: types.ADD_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getOutputReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_OUTPUT_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/inventoryReason`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OUTPUT_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OUTPUT_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

///CONSUMPTION
export const handleConsumptionReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONSUMPTION_REASON_MODAL,
    payload: modalProps,
  });
};
export const setEditInventoryConsumption = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY_CONSUMPTION,
    payload: name,
  });
};
//post reason

export const addConsumptionReason = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_CONSUMPTION_REASON_REQUEST,
  });
  axios
    .post(`${base_url2}/inventory/saveConsumptionSale`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_CONSUMPTION_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CONSUMPTION_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getConsumptionReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_CONSUMPTION_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/consumptionReason`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONSUMPTION_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONSUMPTION_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleAddOutputReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_OUTPUT_REASON_MODAL,
    payload: modalProps,
  });
};
//output tab reason
export const addOutputPlusReason = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_OUTPUT_PLUS_REASON_REQUEST,
  });
  axios
    .post(`${base_url}/`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_OUTPUT_PLUS_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_OUTPUT_PLUS_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getOutputPlusReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_OUTPUT_PLUS_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OUTPUT_PLUS_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OUTPUT_PLUS_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

//pickup date

export const addPickupDate = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_PICKUP_DATE_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/dispatch/confirm/receive`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(id))
      dispatch({
        type: types.ADD_PICKUP_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PICKUP_DATE_FAILURE,
      });
    });
};

//received Delivery Date

export const setEditReceivedDetails = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_RECEIVED_DETAILS,
    payload: name,
  });
};

export const addDeliveryDate = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProductionLocationLink/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getReceivedUserList(locationDetailsId))
      dispatch({
        type: types.ADD_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_DELIVERY_DATE_FAILURE,
      });
    });
};
export const getShipperDetailsList = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_DETAILS_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/shipper/dispatch/${shipperId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_DETAILS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_DETAILS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleDeliveryDateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DELIVERY_DATE_MODAL,
    payload: modalProps,
  });
};

export const setEditReceiveInventory = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_RECEIVE_INVENTORY,
    payload: name,
  });
};

export const getInventoryReports = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_REPORTS_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/getInventoryOutputSale/${locationDetailsId}`)
    .then((res) => {
      dispatch({
        type: types.GET_INVENTORY_REPORTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_INVENTORY_REPORTS_FAILURE,
        payload: err,
      });
    });
};

export const deleteDispatchProduct = (dispatchSuppliesDetailsId, dispatchId) => (dispatch) => {
  dispatch({
    type: types.DELETE_DISPATCH_PRODUCT_LIST_REQUEST,
  });
  axios
    .delete(`${base_url}/dispatch/deleteDispatchProduct/${dispatchSuppliesDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch(getDispatch(dispatchId));
      dispatch({
        type: types.DELETE_DISPATCH_PRODUCT_LIST_SUCCESS,
        payload: dispatchSuppliesDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DISPATCH_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    });
};


export const updateDipatchshipping = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_DISPATCH_SHIPPING_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/updateDispatchShippingLocation`, data)
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(locationDetailsId))
      dispatch({
        type: types.UPDATE_DISPATCH_SHIPPING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_DISPATCH_SHIPPING_FAILURE,
      });
    });
};

export const getDispatchShipperList = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_SHIPPER_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatch/dispatchShipper/${dispatchId} `)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_FAILURE,
        payload: err,
      });
    });
};

export const getInventoryDispatchProduct = (locationDetailsId) => (dispatch) => {
  console.log(locationDetailsId);
  dispatch({
    type: types.GET_INVENTORY_DISPATCH_PRODUCT_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/dispatchProductItem/${locationDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_DISPATCH_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_DISPATCH_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const updateShipperContact = (data, dispatchId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SHIPPER_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/updateDispatchShipper `, data)
    .then((res) => {
      dispatch(getDispatchShipperListInUpdate(dispatchId));
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};
export const searchDispatchItem = (data) => (dispatch) => {
  dispatch({ type: types.SEARCH_DISPATCH_ITEM_REQUEST });
  axios
    .post(`${base_url}/shipper/contact-person-list-report`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SEARCH_DISPATCH_ITEM_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SEARCH_DISPATCH_ITEM_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const getDispatchShipperListInUpdate = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_SHIPPER_UPDATE_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatch/dispatchShipper/${dispatchId} `)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const addAirwayBillInShipper = (data, dispatchShipperId) => (dispatch) => {
  dispatch({ type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_REQUEST });
  axios
    .put(`${base_url}/dispatch/updateAirwayBill/${dispatchShipperId}`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const handleReceivedOrderIdModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_ORDERID_MODAL,
    payload: modalProps,
  });
};
export const handleInventoryReceivedNoteOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_RECEIVED_NOTE_ORDER_MODAL,
    payload: modalProps,
  })
};
export const handleReceivedOrderIdPhoneNoteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_ORDERID_PHONE_NOTE_MODAL,
    payload: modalProps,
  })
};

export const handleInventoryRoomRackModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_ROOM_RACK_MODAL,
    payload: modalProps,
  });
};

export const addRoomAndRackInInventory = (data) => (dispatch) => {
  dispatch({ type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_REQUEST });
  axios
    .post(`${base_url}/roomrack`, data)
    .then((res) => {
      console.log(res);
      dispatch(getInventory())
      dispatch({
        type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

export const updateValidationInReceive = (data, phoneId, id) => (dispatch) => {
  dispatch({ type: types.UPDATE_VALIDATION_IN_RECEIVE_REQUEST });
  axios
    .put(`${base_url2}/phone/receivePhoneToggle/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPhonelistByOrderId(id))
      dispatch({
        type: types.UPDATE_VALIDATION_IN_RECEIVE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_VALIDATION_IN_RECEIVE_FAILURE,
        payload: err,
      });
    });
};

export const handlereceivePhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVE_PHONE_MODAL,
    payload: modalProps,
  });
};

export const handleDispatchreceivePhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISPATCH_RECEIVE_PHONE_MODAL,
    payload: modalProps,
  });
};
export const updateInspection = (data, orderPhoneId, locationId) => (dispatch) => {
  dispatch({ type: types.UPDATE_INSPECTION_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/inspectionIndStatus/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getReceivedUserList(locationId))
      dispatch({
        type: types.UPDATE_INSPECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_INSPECTION_FAILURE,
        payload: err,
      });
    });
};

export const getPhonelistByOrderId = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneDetail/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getChoosenCurrencyId(contactPersonId));
      dispatch({
        type: types.GET_PHONE_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PHONE_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditPhoneData = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PHONELIST_EDIT,
    payload: name,
  });
};
export const setEditDispacthPhoneData = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DISPATCH_PHONELIST_EDIT,
    payload: name,
  });
};
export const updateDispatchInspectionButton = (data, orderPhoneId, locationId) => (dispatch) => {
  dispatch({ type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/dispatchInspectionIndStatus/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(locationId))
      dispatch({
        type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_FAILURE,
        payload: err,
      });
    });
};

export const updateDispatchReceivePhone = (data, phoneId, orderPhoneId) => (dispatch) => {
  dispatch({ type: types.UPDATE_DISPATCH_RECEIVE_PHONE_REQUEST });
  axios
    .put(`${base_url2}/phone/dispatchPhoneToggle/${phoneId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchUpdateList(orderPhoneId))
      dispatch({
        type: types.UPDATE_DISPATCH_RECEIVE_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISPATCH_RECEIVE_PHONE_FAILURE,
        payload: err,
      });
    });
};

export const handlePickupModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PICKUP_MODAL,
    payload: modalProps,
  });
};


export const getProductRepurbish = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_REFURBISH_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/getProductRepurbish/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getChoosenCurrencyId(contactPersonId));
      dispatch({
        type: types.GET_PRODUCT_REFURBISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_REFURBISH_FAILURE,
        payload: err,
      });
    });
};