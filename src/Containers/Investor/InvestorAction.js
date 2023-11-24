import * as types from "./InvestorActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setInvestorViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_INVESTOR_VIEW_TYPE,
      payload: viewType,
    });
};

export const getInvestorsbyId = (userId,pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorsFilterData = (userId,pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_FILTER_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_FILTER_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_FILTER_DATA_FAILURE,
          payload: err,
        });
      });
  };


  export const emptyInvestor = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_INVESTOR_LIST, 
    });
  };

  export const AddInvestor = (investor) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_INVESTOR_REQUEST,
    });
    axios
      .post(`${base_url}/investor`, investor, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getInvestor(userId));
        dispatch(getOpportunityRecord(userId));
        dispatch({
          type: types.ADD_INVESTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVESTOR_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_MODAL,
      payload: modalProps,
    });
  };
  export const handleUpdateInvestorModal=(modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_UPDATE_MODAL,
      payload: modalProps,
    });
  };
  export const UpdateInvestor = (data, investorId) => (dispatch) => {
    dispatch({ type: types.UPDATE_INVESTOR_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investor/${investorId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
export const getInvestorDetailsById = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getContactListByInvestorId = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_CONTACT_REQUEST,
    });
    axios
      .get(`${base_url}/investor/contacts/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_FAILURE,
          payload: err,
        });
      });
  };
  export const getInvestorDocument = (investorId) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_DOCUMENTS_REQUEST });
    axios
      .get(`${base_url}/investor/document/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };
  export const getNotesListByInvestorId = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_INVESTOR_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/note/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_BY_INVESTOR_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_INVESTOR_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const addNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_INVESTOR_NOTES_REQUEST });
    axios
      .post(`${base_url}/investor/notes`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_INVESTOR_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_INVESTOR_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };
  
  export const getInvoiceListByInvestorId = (investorId) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_INVOICE_REQUEST });
    axios
      .get(`${base_url}/investor/invoice/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_INVOICE_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_INVOICE_FAILURE,
          payload: err,
        });
      });
  };
  export const handleInvestorContactModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const createInvestorContact = (contact) => (dispatch) => {
    dispatch({
      type: types.ADD_INVESTOR_CONTACT_REQUEST,
    });
  
    axios
      .post(`${base_url}/investor/contact`, contact, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        dispatch({
          type: types.ADD_INVESTOR_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVESTOR_CONTACT_FAILURE,
          payload: err,
        });
      });
  };
  
  export const handleInvestorDocumentUploadModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_DOCUMENT_UPLOAD_MODAL,
      payload: modalProps,
    });
  };
  export const createInvestorDocument = (data, cb) => (dispatch) => {
    dispatch({ type: types.CREATE_INVESTOR_DOCUMENT_REQUEST });
    axios
      .post(`${base_url}/investor/document`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.CREATE_INVESTOR_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_INVESTOR_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };
    export const handleUpdateInvestorContactModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_INVESTOR_CONTACT_MODAL,
      payload: modalProps,
    });
  };
  export const updateInvestorContact = (data, contactId) => (dispatch) => {
    dispatch({ type: types.UPDATE_INVESTOR_CONTACT_BY_ID_REQUEST });
    axios
      .put(`${base_url}/contact/${contactId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_CONTACT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_CONTACT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const getInvestorData = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investor/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestor = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investor/record/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const searchInvestorName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/investor/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        // message.success(res.data.message);
        // message.success("Data has been updated successfully!");
    
      
      
        dispatch({
          type: types.GET_INVESTOR_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_INVESTOR_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const handleInvestorNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getAllEmployeelist = () => (dispatch) => {
    dispatch({
      type: types.GET_ALL_EMPLOYEE_LIST_REQUEST,
    });
    axios
       .get(`${base_url}/employee/user-list/drop-down/im`, {
       headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_EMPLOYEE_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_EMPLOYEE_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const handleActivityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ACTIVITY_MODAL,
      payload: modalProps,
    });
  };

  export const getAllInvestorsbyId = (pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/list/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_INVESTORS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_INVESTORS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorTimeline = (investorId) => (dispatch) => {
    dispatch({
        type: types.GET_INVEST_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/investor/activity/list/${investorId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_INVEST_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_INVEST_TIMELINE_FAILURE,
                payload: err,
            });
        });
  };

  
  export const getOpportunityRecord = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_OPPORTUNITY_RECORD_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/record/today/${userId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_OPPORTUNITY_RECORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_OPPORTUNITY_RECORD_FAILURE,
          payload: err,
        });
      });
  };

  export const addInvestActivityCall = (call,contactId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.ADD_INVEST_ACTIVITY_CALL_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/call/save`, call, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Call has been added successfully!");
        ////debugger;
        console.log(res);
        //  dispatch(getContactInvestTimeline(contactId));
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };
  
  export const addinvestActivityEvent = (event,contactId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_INVEST_ACTIVITY_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/event/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Meeting has been added successfully!");
        console.log(res);
        // dispatch(getContactInvestTimeline(contactId));
        // dispatch(getEventListRangeByUserId(userId,0));
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
        // cb();
      });
  };
  
  export const addinvestActivityTask = (task,contactId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_INVEST_ACTIVITY_TASK_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/task/create`, task, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Task has been added successfully!");
        console.log(res);
        // dispatch(getContactInvestTimeline(contactId));
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const getTeamInvestor = (userId,pageNo,filter) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_INVESTOR_REQUEST,
    });
    axios
      .get(`${base_url}/investor/team/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_INVESTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_INVESTOR_FAILURE,
          payload: err,
        });
      });
  };
  