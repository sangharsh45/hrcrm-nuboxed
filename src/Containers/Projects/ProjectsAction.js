import * as types from "./ProjectsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url} from "../../Config/Auth";
import { message } from "antd";

export const setProjectsViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_PROJECTS_VIEW_TYPE,
      payload: viewType,
    });
  };
  export const updateProjects = (data, opportunityId) => (
    dispatch,
    getState
  ) => {
     const userId = getState().auth.userDetails.userId;
    dispatch({ type: types.UPDATE_PROJECTS_REQUEST });
    axios
      .put(`${base_url}/project/update`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        //  dispatch(getOpportunityListByUserId(userId,0));
        dispatch({
          type: types.UPDATE_PROJECTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_PROJECTS_FAILURE,
          payload: err,
        });
      });
  };
  

  export const setEditProjects = (name) => (dispatch) => {
    dispatch({
      type: types.SET_PROJECT_EDIT,
      payload: name,
    });
  };

  export const handleUpdateProjectsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_PROJECTS_MODAL,
      payload: modalProps,
    });
  };

  export const handleProjectsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_PROJECTS_MODAL,
      payload: modalProps,
    });
  };

  export const handleInvoiceProjectModal =(modalProps)=>(dispatch)=>{
    dispatch({
      type:types.HANDLE_INVOICE_PROJECT_MODAL,
      payload:modalProps,
    })
  }


  export const addProjectsData = (project,orgId) => (dispatch, getState) => {
    const orgId = getState().auth.userDetails.organizationId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add project");
    dispatch({
      type: types.ADD_PROJECTS_DATA_REQUEST
    });
  
    axios
    .post(`${base_url}/project/save`, project, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Project has been added successfully!");
       dispatch(getProjectsData(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_PROJECTS_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PROJECTS_DATA_FAILURE,
          payload: err,
        });
      });
  };


  export const getProjectsData = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_PROJECTS_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/project/all/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROJECTS_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROJECTS_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const removeProjectData = ( projectId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_PROJECTS_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/project/${projectId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Project has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_PROJECTS_DATA_SUCCESS,
          payload:projectId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_PROJECTS_DATA_FAILURE,
        });
      });
  };

  export const getProjectDetailById = (ProjectId) => (dispatch) => {
    dispatch({
      type: types.GET_PROJECTS_DETAIL_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/ProjectDetails/${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROJECTS_DETAIL_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROJECTS_DETAIL_BY_ID_FAILURE,
          payload: err,
        });
      });
  };


  export const getProjectsTaskListById = (ProjectId, startDate, endDate) => (
    dispatch
  ) => {
    dispatch({
      type: types.GET_PROJECTS_TASK_ID_REQUEST,
    });
    axios
    .get(`${base_url}/task/task-list/${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        ////debugger;
        console.log(res);
        dispatch({
          type: types.GET_PROJECTS_TASK_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        ////debugger;
        console.log(err);
        dispatch({
          type: types.GET_PROJECTS_TASK_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getProjectsTeamListById = (ProjectId, startDate, endDate) => (
    dispatch
  ) => {
    dispatch({
      type: types.GET_PROJECTS_TEAM_ID_REQUEST,
    });
    axios
    .get(`${base_url}/recriutment/candidateList/${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        ////debugger;
        console.log(res);
        dispatch({
          type: types.GET_PROJECTS_TEAM_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        ////debugger;
        console.log(err);
        dispatch({
          type: types.GET_PROJECTS_TEAM_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getCandidateTotalBilling = (candidateId,projectId,startDate,endDate) => (dispatch) => {
    console.log("inside add candidate");
    dispatch({
      type: types.GET_CANDIDATE_TOTAL_BILLING_REQUEST,
    });
    axios
      .get(`${base_url}/hour/candidate/hour-details/project/${candidateId}/${projectId}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATE_TOTAL_BILLING_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CANDIDATE_TOTAL_BILLING_FAILURE,
          payload: err,
        });
      });
  };

  export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
    console.log(selectedTime);
    dispatch({
      type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
      payload: selectedTime,
    });
  };


  export const handleCreateInvoiceDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CREATE_INVOICE_DRAWER,
      payload: modalProps,
    });
  };
  




