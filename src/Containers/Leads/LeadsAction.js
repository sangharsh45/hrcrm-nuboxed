import * as types from "./LeadsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { asses_url } from "../../Config/Auth";
import { message } from "antd";

export const setLeadsViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_LEADS_VIEW_TYPE,
      payload: viewType,
    });
  };
  export const handleLeadsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_MODAL,
      payload: modalProps,
    });
  };

  export const addLeads = (leads) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add leads");
    dispatch({
      type: types.ADD_LEADS_REQUEST,
    });
  
    axios
      .post(`${base_url}/leads`, leads, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLeads(userId));
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getRecords(userId));
  
        dispatch({
          type: types.ADD_LEADS_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };
 
  export const getLeads = (userId) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/User/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_FAILURE,
          payload: err,
        });
      });
  };

  export const setClearbitData = (data) => (dispatch) => {
    dispatch({
      type: types.SET_CLEARBIT_DATA,
      payload: data,
    });
  };
  export const convertCustomerStatus = (data, leadsId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.CONVERT_CUSTOMER_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/leads/convert/${leadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLeads(userId));
        dispatch({
          type: types.CONVERT_CUSTOMER_STATUS_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CONVERT_CUSTOMER_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };
  export const deleteLeadsData = (leadsId,orgId) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // console.log("inside deleteCall", callId);
    dispatch({
      type: types.DELETE_LEADS_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/leads/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        //  dispatch(getScheduler(orgId));
        dispatch({
          type: types.DELETE_LEADS_DATA_SUCCESS,
          payload: leadsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadDetailsById = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEAD_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEAD_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEAD_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const setEditLeads = (name) => (dispatch) => {
    dispatch({
      type: types.SET_LEADS_EDIT,
      payload: name,
    });
  };

  export const handleUpdateLeadsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_MODAL,
      payload: modalProps,
    });
  };

  export const updateLeads = (data, leadsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_BY_ID_REQUEST });
    axios
      .put(`${base_url}/leads/${leadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleLeadsEmailDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_EMAIL_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleLeadsContactModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsContact = (contact) => (dispatch, getState) => {
    // const userId = getState().auth.userDetails.userId;
    const customerId = getState().customer.customer.customerId;
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add contact");
    dispatch({
      type: types.ADD_LEADS_CONTACT_REQUEST,
    });
  
    axios
      .post(`${base_url}/leads/contact`, contact, {
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
        
  
        dispatch({
          type: types.ADD_LEADS_CONTACT_SUCCESS,
          payload: res.data,
        });
        
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_CONTACT_FAILURE,
          payload: err,
        });
       
      });
  };

  export const getContactListByLeadsId = (leadsId) => (dispatch) => {
    console.log(leadsId);
    dispatch({
      type: types.GET_LEADS_CONTACT_REQUEST,
    });
    axios
      .get(`${base_url}/leads/contacts/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_CONTACT_FAILURE,
          payload: err,
        });
      });
  };
  export const handleUpdateLeadsContactModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const setEditLeadsContact = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_CONTACT,
      payload: name,
    });
  };

  export const updateLeadsContact = (data, contactId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_CONTACT_BY_ID_REQUEST });
    axios
      .put(`${base_url}/leads/contact/update/${contactId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_CONTACT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_CONTACT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleLeadsOpportunityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_OPPORTUNITY_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsOpportunity = (opportunity,leadsId, cb) => (
    dispatch,
    getState
  ) => {
    // const userId = getState().auth.userDetails.userId;
    //const customerId = getState().customer.customer.customerId;
    dispatch({
      type: types.ADD_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .post(`${base_url}/leads/opportunity`, opportunity, {
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
        dispatch(getOpportunityListByLeadsId(leadsId));
        dispatch({
          type: types.ADD_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };

  export const getOpportunityListByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .get(`${base_url}/leads/opportunity/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };

  export const handleUpdateLeadsOpportunityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_OPPORTUNITY_MODAL,
      payload: modalProps,
    });
  };

  export const setEditLeadsOpportunity = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_OPPORTUNITY,
      payload: name,
    });
  };

  export const handleLeadsDocumentUploadModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_DOCUMENT_UPLOAD_MODAL,
      payload: modalProps,
    });
  };

  export const handleLeadsReactSpeechModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_REACT_SPEECH_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsDocument = (data, cb) => (dispatch) => {
    console.log(data);
    dispatch({ type: types.ADD_LEADS_DOCUMENT_REQUEST });
    axios
      .post(`${base_url}/leads/document`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_LEADS_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsDocument = (leadsId) => (dispatch) => {
    dispatch({ type: types.GET_LEADS_DOCUMENTS_REQUEST });
    axios
      .get(`${base_url}/leads/document/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEADS_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };

  export const addInitiativeByLeadsId = (data,leadsId) => (dispatch) => {
    // console.log(customerId);
    dispatch({
      type: types.ADD_INITIATIVE_BY_LEADS_ID_REQUEST,
    });
    axios
      .post(`${base_url}/leads/innitiative`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getInitiativeByLeadsId(leadsId));
        dispatch({
          type: types.ADD_INITIATIVE_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
       // cb && cb("success")
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INITIATIVE_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getInitiativeByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_INITIATIVE_BY_LEADS_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/innitiative/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INITIATIVE_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INITIATIVE_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const deleteLeadsDocument = (documentId) => (dispatch, getState) => {
    console.log("inside deleteDocument", documentId);
    // const { opportunityId } = getState("opportunity").opportunity.opportunity;
    dispatch({
      type: types.DELETE_LEADS_DOCUMENT_REQUEST,
    });
  
    axios
      .delete(`${base_url}/leads/document/${documentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.DELETE_LEADS_DOCUMENT_SUCCESS,
          payload: documentId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };

  export const addLeadsNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_LEADS_NOTES_REQUEST });
    axios
      .post(`${base_url}/leads/notes`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_LEADS_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_LEADS_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };

  export const getNotesListByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_LEADS_ID_REQUEST,
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
          type: types.GET_NOTES_LIST_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const handleUpdateLeadsInitiativeModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_INITIATIVE_MODAL,
      payload: modalProps,
    });
  };
  export const setEditLeadsInitiative = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_INITIATIVE,
      payload: name,
    });
  };

  export const updateLeadsOpportunity = (data, opportunityId) => (dispatch) => {
    dispatch({
      type: types.UPDATE_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .put(`${base_url}/leads/opportunity/update/${opportunityId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getOpportunityListByLeadsId(leadsId));
        dispatch({
          type: types.UPDATE_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
      })
  
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };
  export const updateLeadsInitiative = (data, initiativeDetailsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_INITIATIVE_REQUEST });
    axios
      .put(`${base_url}/leads/initiative/update/${initiativeDetailsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_INITIATIVE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_INITIATIVE_FAILURE,
          payload: err,
        });
      });
  };

  export const addLeadsSkill = (data,leadsId) => (dispatch) => {
    // console.log(customerId);
    dispatch({
      type: types.ADD_LEADS_SKILL_REQUEST,
    });
    axios
      .post(`${base_url}/leads/skillSet`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getLeadsSkill(leadsId));
        dispatch({
          type: types.ADD_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
       // cb && cb("success")
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsSkill = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_SKILL_REQUEST,
    });
    axios
      .get(`${base_url}/leads/skillSet/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };

  export const deleteLeadsSkill = (leadsSkillLinkId, leadsId) => (
    dispatch
  ) => {
    dispatch({
      type: types.DELETE_LEADS_SKILL_REQUEST,
    });
    axios
      .delete(`${base_url}/leads/skillsset/${leadsSkillLinkId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
        dispatch(getLeadsSkill(leadsId));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };


  export const inputLeadsDataSearch =(name)=>(dispatch)=>{
    dispatch({
      type: types.INPUT_LEADS_SEARCH_DATA_REQUEST,
    });
    axios.get(`${base_url}/leads/search/${name}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res)=>{
      dispatch({
        type:types.INPUT_LEADS_SEARCH_DATA_SUCCESS,
        payload:res.data,
      });
    })
    .catch((err)=>{
      dispatch({
    type:types.INPUT_LEADS_SEARCH_DATA_FAILURE,
    payload:err,
      });
    });
  };
  
  export const getLeadsPermissionsList = () => (dispath) => {
    dispath({ type: types.GET_LEADS_PERMISSIONS_LIST_REQUEST });
    axios
      .get(`${base_url}/permission/type?type=${"leads"}`, 
      // {
      //   headers: {
      //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      //   },
      // }
      )
      .then((res) => {
        dispath({
          type: types.GET_LEADS_PERMISSIONS_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispath({
          type: types.GET_LEADS_PERMISSIONS_LIST_FAILURE,
          payload: err,
        });
      });
  };
  export const shareLeadsPermission = (data, userId,a) => (
    dispatch,
    getState
  ) => {
    // const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.ADD_SHARE_LEADS_PERMISSION_REQUEST,
    });
  
    axios
      .post(`${base_url}/permission/details`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        if (a === "All") {
          // dispatch(getAllOpportunityListByUserId());
          // dispatch(getRecords(userId));
          // dispatch(getAllRecords(userId));
        } else {
        dispatch(getLeads(userId));
        // dispatch(getRecords(userId));
        }
        dispatch({
          type: types.ADD_SHARE_LEADS_PERMISSION_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_SHARE_LEADS_PERMISSION_FAILURE,
          payload: err,
        });
        // cb && cb("failure");
      });
  };
  export const updateTypeForLead = (leadsId,type,data) => (dispatch) => {
    dispatch({ type: types.UPDATE_TYPE_FOR_LEAD_REQUEST });
    axios
      .put(
        `${base_url}/leads/type/update/${leadsId}/${type}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_LEAD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_LEAD_FAILURE,
          payload:err
        });
      });
  };

  export const getJunkedLeads = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_JUNKED_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/junked/list/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_JUNKED_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_JUNKED_LEADS_FAILURE,
          payload: err,
        });
      });
  };
  export const getLeadsRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/record/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const getJunkedLeadsRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_JUNKED_LEADS_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/junked/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_JUNKED_LEADS_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_JUNKED_LEADS_RECORDS_FAILURE,
          payload: err,
        });
      });
  };