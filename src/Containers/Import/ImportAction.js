import * as types from "./ImportActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

/**
 * import excel file and get excelfileId
 */
export const importExcel = (file, importType, cb) => (dispatch) => {
  console.log("import type..............", importType);
  const formData = new FormData();
  formData.append("file", file);
  dispatch({
    type: types.EXCEL_IMPORT_REQUEST,
  });
  axios
    .post(`${base_url}/excel/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.EXCEL_IMPORT_REQUEST,
      });
      if (importType === "account") {
        dispatch(getExcelHeaders(res.data));
        dispatch(getAccountMatchingFields()); 
      }
      //  else if (importType === "contact") {
      //   dispatch(getExcelHeaders(res.data));
      //   dispatch(getContactMatchingFields());
      // } else if (importType === "product") {
      //   dispatch(getExcelHeaders(res.data));
      //   dispatch(getProductMatchingFields());
      // } else if (importType === "service") {
      //   dispatch(getExcelHeaders(res.data));
      //   dispatch(getServiceMatchingFields());
      // } else if (importType === "leadscontact") {
      //   dispatch(getExcelHeaders(res.data));
      //   dispatch(getLeadsContactMatchingFields());
      // } else if (importType === "leadsaccount") {
      //   dispatch(getExcelHeaders(res.data));
      //   dispatch(getLeadsAccountMatchingFields());
      // } 
      else {
        return;
      }
      dispatch({
        type: types.EXCEL_IMPORT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.EXCEL_IMPORT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get excel header columns with excel file id
 */
export const getExcelHeaders = (excelId) => (dispatch) => {
  console.log("inside getExcelHeaders()", excelId);
  dispatch({
    type: types.GET_EXCEL_HEADERS_REQUEST,
  });
  axios
    .get(`${base_url}/excel-header?excelId=${excelId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXCEL_HEADERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_EXCEL_HEADERS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get contact matching fields
 */
export const getContactMatchingFields = () => (dispatch) => {
  console.log("inside getContactMatchingFields()");
  dispatch({
    type: types.GET_CONTACT_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get account matching fields
 */
export const getAccountMatchingFields = () => (dispatch) => {
  console.log("inside getAccountMatchingFields()");
  dispatch({
    type: types.GET_ACCOUNT_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/account-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACCOUNT_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ACCOUNT_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};

export const getProductMatchingFields = () => (dispatch) => {
  console.log("inside getProductMatchingFields()");
  dispatch({
    type: types.GET_PRODUCT_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/product-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCT_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};

export const getServiceMatchingFields = () => (dispatch) => {
  console.log("inside getServiceMatchingFields()");
  dispatch({
    type: types.GET_SERVICE_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/service-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SERVICE_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SERVICE_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};
export const getLeadsContactMatchingFields = () => (dispatch) => {
  console.log("inside getLeadsContactMatchingFields()");
  dispatch({
    type: types.GET_LEADS_CONTACT_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact-leads-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEADS_CONTACT_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_LEADS_CONTACT_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};

export const getLeadsAccountMatchingFields = () => (dispatch) => {
  console.log("inside getLeadsAccountMatchingFields()");
  dispatch({
    type: types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_REQUEST,
  });
  axios
    .get(`${base_url}/leads-account-fields`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_FAILURE,
        payload: err,
      });
    });
};
/**
 * map excel to contact
 */
export const mapExcelToContact = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToContact()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/contact-excel-mapping?excelId=${excelId}`, fields, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // message.success(
      //   `You have successfully imported ${res.data} Contact data.`
      // );
      dispatch({
        type: types.MAP_EXCEL_TO_CONTACT_SUCCESS,
        payload: res.data,
      });
      cb(res.data);
      // history.push('/contact')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_CONTACT_FAILURE,
        payload: err,
      });
    });
};

/**
 * map excel to account
 */
export const mapExcelToAccount = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToAccount()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_ACCOUNT_REQUEST,
  });
  axios
    .post(`${base_url}/account-excel-mapping?excelId=${excelId}`, fields, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MAP_EXCEL_TO_ACCOUNT_SUCCESS,
        payload: res.data,
      });
      cb(res.data);
      // history.push('/account')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_ACCOUNT_FAILURE,
        payload: err,
      });
    });
};

export const mapExcelToProduct = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToProduct()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_PRODUCT_REQUEST,
  });
  axios
    .post(`${base_url}/product-excel-mapping?excelId=${excelId}`, fields, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MAP_EXCEL_TO_PRODUCT_SUCCESS,
        payload: res.data,
      });
      cb();
      // history.push('/account')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const mapExcelToService = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToService()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_SERVICE_REQUEST,
  });
  axios
    .post(`${base_url}/service-excel-mapping?excelId=${excelId}`, fields, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MAP_EXCEL_TO_SERVICE_SUCCESS,
        payload: res.data,
      });
      cb();
      // history.push('/account')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_SERVICE_FAILURE,
        payload: err,
      });
    });
};

export const mapExcelToLeadsContact = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToLeadsContact()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_LEADS_CONTACT_REQUEST,
  });
  axios
    .post(
      `${base_url}/leads/contact-excel-mapping?excelId=${excelId}`,
      fields,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MAP_EXCEL_TO_LEADS_CONTACT_SUCCESS,
        payload: res.data,
      });
      cb(res.data);
      // history.push('/account')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_LEADS_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const mapExcelToLeadsAccount = (fields, excelId, history, cb) => (
  dispatch
) => {
  console.log("inside mapExcelToLeadsAccount()", fields, excelId);
  dispatch({
    type: types.MAP_EXCEL_TO_LEADS_ACCOUNT_REQUEST,
  });
  axios
    .post(
      `${base_url}/leads/account-excel-mapping?excelId=${excelId}`,
      fields,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MAP_EXCEL_TO_LEADS_ACCOUNT_SUCCESS,
        payload: res.data,
      });
      cb(res.data);
      // history.push('/account')
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.MAP_EXCEL_TO_LEADS_ACCOUNT_FAILURE,
        payload: err,
      });
    });
};
