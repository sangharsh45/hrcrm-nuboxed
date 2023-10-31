import * as types from "./PitchActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { asses_url } from "../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'

export const getPitch = (userId) => (dispatch) => {
 
    dispatch({
      type: types.GET_PITCH_REQUEST,
    });
    axios
      .get(`${base_url}/investorleads/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PITCH_FAILURE,
          payload: err,
        });
      });
  };



  export const handlePitchDocumentUploadModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PITCH_DOCUMENT_UPLOAD_MODAL,
      payload: modalProps,
    });
  };


  export const addPitch = (pitch) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add leads");
    dispatch({
      type: types.ADD_PITCH_REQUEST,
    });
  
    axios
      .post(`${base_url}/investorleads`, pitch, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getLeads(userId));
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getRecords(userId));
  
        dispatch({
          type: types.ADD_PITCH_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PITCH_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };

  export const setEditPitch = (name) => (dispatch) => {
    dispatch({
      type: types.SET_PITCH_EDIT,
      payload: name,
    });
  };


  export const deletePitchData = (investorleadsId,orgId) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // console.log("inside deleteCall", callId);
    dispatch({
      type: types.DELETE_PITCH_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/investorleads/${investorleadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        //  dispatch(getScheduler(orgId));
        dispatch({
          type: types.DELETE_PITCH_DATA_SUCCESS,
          payload: investorleadsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_PITCH_DATA_FAILURE,
          payload: err,
        });
      });
  };


  export const handlePitchModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PITCH_MODAL,
      payload: modalProps,
    });
  };

  export const handleUpdatePitchModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_PITCH_MODAL,
      payload: modalProps,
    });
  };


  export const updatePitch = (data, investorleadsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_PITCH_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investorleads/${investorleadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_PITCH_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_PITCH_BY_ID_FAILURE,
          payload: err,
        });
      });
  };


  export const convertPitchStatus = (data, investorLeadsId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.CONVERT_PITCH_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/investorLeads/convert/${investorLeadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
         dispatch(getPitch(userId));
        dispatch({
          type: types.CONVERT_PITCH_STATUS_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Qualifed Succefully',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CONVERT_PITCH_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };


  export const getPitchDetailsById = (investorLeadsId) => (dispatch) => {
    dispatch({
      type: types.GET_PITCH_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investorleads/${investorLeadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PITCH_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };



  export const addPitchDocument = (data, cb) => (dispatch) => {
    console.log(data);
    dispatch({ type: types.ADD_PITCH_DOCUMENT_REQUEST });
    axios
      .post(`${base_url}/investorLeads/document`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_PITCH_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PITCH_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };




  export const getPitchDocument = (investorLeadsId) => (dispatch) => {
    dispatch({ type: types.GET_PITCH_DOCUMENTS_REQUEST });
    axios
      .get(`${base_url}/investorLeads/document/${investorLeadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PITCH_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };


  export const updateTypeForPitch = (investorleadsId,type,data) => (dispatch) => {
    dispatch({ type: types.UPDATE_TYPE_FOR_PITCH_REQUEST });
    axios
      .put(
        `${base_url}/investorLeads/type/update/${investorleadsId}/${type}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_PITCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_PITCH_FAILURE,
          payload:err
        });
      });
  };



  export const addPitchOpportunity = (opportunity,investorleadsId, cb) => (
    dispatch,
    getState
  ) => {
    // const userId = getState().auth.userDetails.userId;
    //const customerId = getState().customer.customer.customerId;
    dispatch({
      type: types.ADD_PITCH_OPPORTUNITY_REQUEST,
    });
    axios
      .post(`${base_url}/investorLeads/opportunity`, opportunity, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        dispatch(getOpportunityListByPitchId(investorleadsId));
        dispatch({
          type: types.ADD_PITCH_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PITCH_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };



  export const handlePitchOpportunityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PITCH_OPPORTUNITY_MODAL,
      payload: modalProps,
    });
  };



  export const getOpportunityListByPitchId = (investorleadsId) => (dispatch) => {
    dispatch({
      type: types.GET_PITCH_OPPORTUNITY_REQUEST,
    });
    axios
      .get(`${base_url}/investorLeads/opportunity/${investorleadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PITCH_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };

  export const getPitchRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_PITCH_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investorLeads/record/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PITCH_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PITCH_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const handleAssimodal= (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ASSI_MODAL,
      payload: modalProps,
    });
  }

  export const getpichTimeline = (investorLeadsId) => (dispatch) => {
    dispatch({
        type: types.GET_PITCH_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/investorLeads/activity/list/${investorLeadsId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_PITCH_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_PITCH_TIMELINE_FAILURE,
                payload: err,
            });
        });
  };

  export const searchPitchName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_PITCH_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/investorLeads/search/${name}`, {
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
          type: types.GET_PITCH_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_PITCH_SEARCH_FAILURE,
          payload: err,
        });
      });
  };

  export const handlePitchNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PITCH_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const addPitchNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_PITCH_NOTES_REQUEST });
    axios
      .post(`${base_url}/pitch/notes`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_PITCH_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_PITCH_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };

  export const getNotesListByPitchId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_PITCH_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/note/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_BY_PITCH_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_PITCH_ID_FAILURE,
          payload: err,
        });
      });
  };