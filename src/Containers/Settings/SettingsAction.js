import * as types from "./SettingsActionTypes";
import { base_url } from "../../Config/Auth";
import axios from "axios";
import { ActionIcon } from "../../Components/Utils";
import { UPDATE_RECRUITMENT_ADVANCE_SUCCESS } from "../Auth/AuthTypes";
import { message } from "antd";

/**
 * goal modal action
 */

export const handleEditProcessModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_EDIT_PROCESS_MODAL,
    payload: modalProps,
  });
};

export const handleCAndidateSequenceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_SEQUENCE_MODAL,
    payload: modalProps,
  });
};

export const LinkStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/recruitment/stages/unpublish `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};



export const LinkOpportunityStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/opportunityStages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const handleProcessModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_MODAL,
    payload: modalProps,
  });
};

export const handleTaskDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_DRAWER,
    payload: modalProps,
  });
};
export const handleProcessHiringModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_HIRING_MODAL,
    payload: modalProps,
  });
};
export const handleRulesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RULES_MODAL,
    payload: modalProps,
  });
};
export const handleProcessTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_TASK_MODAL,
    payload: modalProps,
  });
};

export const LinkProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/recruitment/process/unpublish `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const addTaskForRecruiter = (data, taskTypeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_TASK_FOR_RECRUIT_REQUEST,
  });

  axios
    .post(`${base_url}/category/task/checklist/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
       dispatch(getTaskForWorkflow(taskTypeId));
      dispatch({
        type: types.ADD_TASK_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TASK_FOR_RECRUIT_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};


export const getTaskForRecruit = (organizationId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/taskcheckList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addProcess = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_PROCESS_REQUEST,
  });

  axios
    .post(`${base_url}/process`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcess());
      dispatch({
        type: types.ADD_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FAILURE,
        payload: err,
      });
    });
};
// get default process
export const getDefaultProcess = () => (dispatch) => {
  dispatch({
    type: types.GET_DEFAULT_PROCESS_REQUEST,
  });
  axios
    .get(`${base_url}/defaultprocess`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEFAULT_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEFAULT_PROCESS_FAILURE,
        payload: err,
      });
    });
};

export const getProcess = () => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_REQUEST,
  });
  axios
    .get(`${base_url}/processes`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FAILURE,
        payload: err,
      });
    });
};

export const updateStage = (stageId, stageName, probability, days, cb) => (
  dispatch
) => {
  console.log(stageId, stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_REQUEST,
  });
  axios
    .put(
      `${base_url}/stage/${stageId}`,
      { stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FAILURE,
      });
      cb && cb("error");
    });
};

export const getAllProcessStages = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCESS_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/allProcessStages`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FAILURE,
        payload: err,
      });
    });
};

export const getOppoStages = () => (dispatch) => {
  dispatch({
    type: types.GET_OPPO_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/oppoStages`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPO_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPO_STAGES_FAILURE,
        payload: err,
      });
    });
};
export const getProcessStages = (processId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/process/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FAILURE,
        payload: err,
      });
    });
};
export const removeStage = (stageId, cb) => (dispatch) => {
  console.log(stageId);
  dispatch({
    type: types.REMOVE_STAGE_REQUEST,
  });
  axios
    .delete(`${base_url}/stage/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.REMOVE_STAGE_SUCCESS,
        payload: stageId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_STAGE_FAILURE,
      });
    });
};

export const addProcessStage = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_REQUEST });

  axios
    .post(`${base_url}/process/stage`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateProcessName = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROCESS_NAME_REQUEST });

  axios
    .put(`${base_url}/updateProcess`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addProcessTask = (data, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_PROCESS_TASK_REQUEST,
  });

  axios
    .post(`${base_url}/stage/task`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_TASK_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_TASK_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};

export const getProcessTask = (stageId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/stage/task/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_TASK_FAILURE,
        payload: err,
      });
    });
};

/**
 * get department
 */
export const getDepartments = () => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENTS_REQUEST,
  });
  axios
    .get(`${base_url}/departments`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEPARTMENTS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get levels
 */
export const getLevels = () => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_LEVELS_REQUEST,
  });
  axios
    .get(`${base_url}/level`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEVELS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEVELS_FAILURE,
        payload: err,
      });
    });
};
export const updateTask = (id, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_TASK_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/task/${id}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const deleteTask = (taskId) => (dispatch, getState) => {
  console.log("inside deleteTask", taskId);
  dispatch({
    type: types.DELETE_TASK_REQUEST,
  });

  axios
    .delete(`${base_url}/globalTask/${taskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TASK_SUCCESS,
        payload: taskId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_FAILURE,
        payload: err,
      });
    });
};
export const updateTaskResuffel = (task) => (dispatch) => {
  console.log(task);

  const final = task.map((task, i) => {
    return { ...task, sequence: (i += 1) };
  });
  console.log(final);

  // const object1 = task[0];
  // const object2 = task[1];
  // const finalData = [
  //   { ...object1, sequence: object2.sequence },
  //   { ...object2, sequence: object1.sequence },
  // ];

  dispatch({
    type: types.UPDATE_TASK_RESUFFEL_BY_ID_REQUEST,
  });
  axios
    .post(`${base_url}/tasksuffle`, final, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_RESUFFEL_BY_ID_SUCCESS,
        payload: final,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_RESUFFEL_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateTaskData = (taskId, data, cb) => (dispatch) => {
  //debugger
  console.log("inside updateTaskData");
  dispatch({
    type: types.UPDATE_PROCESS_TASK_REQUEST,
  });

  axios
    .put(`${base_url}/update/globalTask/${taskId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_TASK_SUCCESS,
        payload: taskId,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};
export const handleTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_MODAL,
    payload: modalProps,
  });
};
export const setEditTask = (name) => (dispatch) => {
  dispatch({
    type: types.SET_TASK_EDIT,
    payload: name,
  });
};

//recruiter
export const addProcessForRecruiter = (data, organizationId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_RECRUIT_REQUEST,
  });

  axios
    .post(`${base_url}/recruitment/process`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForRecruit(organizationId));
      dispatch({
        type: types.ADD_PROCESS_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_RECRUIT_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};



export const getProcessForRecruit = (organizationId) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/admin/setting/process/${organizationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const getProcessStagesForRecruit = (processId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/process/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForRecruit = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_REQUEST });

  axios
    .post(`${base_url}/recruitment/process/stage`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateProcessNameForRecruit = (process, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_REQUEST });

  axios
    .put(`${base_url}/employee/recruitment-details`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateStageForRecruit = (
  stageId,
  responsible,
  stageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_RECRUIT_REQUEST,
  });
  axios
    .put(
      `${base_url}/employee/recriutment-stage`,
      { stageId,responsible, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("error");
    });
};

export const getAllProcessStagesForRecruit = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/all/process`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addLeaves = (data,countryId) => (dispatch) => {
  dispatch({ type: types.ADD_LEAVES_REQUEST });

  axios
    .put(`${base_url}/rule/leaves`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getLeavesDetails(countryId));
      message.success("Data has been Updated successfully!");
      dispatch({
        type: types.ADD_LEAVES_SUCCESS,
        payload: res.data,
      });
  
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LEAVES_FAILURE,
      });
      // cb && cb("Failure");
    });
};
//GET LEAVES DETAILS
export const getLeavesDetails = (countryId) => (dispatch) => {
  dispatch({ type: types.GET_LEAVES_DETAIL_REQUEST });

  axios
    .get(`${base_url}/rule/leaves/${countryId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAVES_DETAIL_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEAVES_DETAIL_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const getSignatureInd = () => (dispatch) => {
  dispatch({ type: types.GET_SIGNATURE_REQUEST });

  axios
    .get(`${base_url}/check/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SIGNATURE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SIGNATURE_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const handleEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMAIL_MODAL,
    payload: modalProps,
  });
};

export const handleWebsiteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_WEBSITE_MODAL,
    payload: modalProps,
  });
};
export const handleUpdateEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EMAIL_MODAL,
    payload: modalProps,
  });
};
export const setEditEmail = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EMAIL_EDIT,
    payload: name,
  });
};

export const dataClear = () => (dispatch) => {
  dispatch({ type: types.DATA_CLEAR });
};

export const enableRecruitmentAdvance = (organizationId) => (dispatch) => {
  console.log("print organization Id ...........", organizationId);
  dispatch({
    type: types.ENABLE_RECRUITMENT_ADVANCE_REQUEST,
  });
  axios
    .post(
      `${base_url}/advance/recruitment/enable/${organizationId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log("inside then");
      dispatch({
        type: types.ENABLE_RECRUITMENT_ADVANCE_SUCCESS,
        payload: { organizationId },
      });
      dispatch({
        type: UPDATE_RECRUITMENT_ADVANCE_SUCCESS,
        payload: res.data.advanceRecruitmentInd,
      });
    })
    .catch((err) => {
      console.log("inside catch");
      console.log(err);
      dispatch({
        type: types.ENABLE_RECRUITMENT_ADVANCE_FAILURE,
        payload: err,
      });
    });
};

//GET LEAVES DETAILS
export const getMileageDetails = (orgId) => (dispatch) => {
  dispatch({ type: types.GET_MILEAGE_DETAIL_REQUEST });

  axios
    .get(`${base_url}/mileage/rate/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MILEAGE_DETAIL_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_DETAIL_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const updateMileage = (data,orgId) => (dispatch, getState) => {
  // const orgId = getState().auth.userDetails.orgId;
  dispatch({ type: types.UPDATE_MILEAGE_REQUEST });

  axios
    .post(`${base_url}/mileage/rate`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getMileageDetails(orgId));
      dispatch({
        type: types.UPDATE_MILEAGE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_MILEAGE_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const handleApprovalModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_APPROVAL_MODAL,
    payload: modalProps,
  });
};


export const addApproval = (data,) => (dispatch) => {
  dispatch({ type: types.ADD_APPROVAL_REQUEST });
  axios
    .post(`${base_url}/approve/save/processName/subProcessName`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getApprovalData());
      dispatch({
        type: types.ADD_APPROVAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_APPROVAL_FAILURE,
      });
    });
};

export const getApprovalData = (stageId) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVAL_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/approve/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVAL_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVAL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addCommission = (data, orgId, type) => (dispatch) => {
  dispatch({ type: types.ADD_COMMISSION_REQUEST });
  axios
    .post(`${base_url}/commission`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCommissionTable(orgId, type));
      dispatch({
        type: types.ADD_COMMISSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_COMMISSION_FAILURE,
      });
    });
};

export const getCommission = () => (dispatch) => {
  dispatch({
    type: types.GET_COMMISSION_REQUEST,
  });
  axios
    .get(`${base_url}/employee/all-sales`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMISSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMISSION_FAILURE,
        payload: err,
      });
    });
};
//GET COMMISSION TABLE
export const getCommissionTable = (orgId, type) => (dispatch) => {
  dispatch({
    type: types.GET_COMMISSION_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/commission/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMISSION_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMISSION_TABLE_FAILURE,
        payload: err,
      });
    });
};


export const updateCommission = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_COMMISSION_REQUEST });

  axios
    .put(`${base_url}/updateProcess`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_COMMISSION_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_COMMISSION_FAILURE,
      });
      cb && cb("Failure");
    });
};
export const setEditCommission = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_COMMISSION,
    payload: name,
  })
}

export const handleCommission = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_COMMISSION_MODAL,
    payload: modalProps,
  });
};

export const addRecruiter = (data, orgId, type) => (dispatch) => {
  dispatch({ type: types.ADD_RECRUITER_REQUEST });
  axios
    .post(`${base_url}/commission`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getRecruiterTable(orgId, type));
      dispatch({
        type: types.ADD_RECRUITER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECRUITER_FAILURE,
      });
    });
};

export const getRecruiter = () => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_REQUEST,
  });
  axios
    .get(`${base_url}/employee/all-recruiter`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITER_FAILURE,
        payload: err,
      });
    });
};


//GET RECRUITER TABLE
export const getRecruiterTable = (orgId, type) => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/commission/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITER_TABLE_FAILURE,
        payload: err,
      });
    });
};

// add website
export const addWebsite = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_WEBSITE_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/website`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getWebsite(orgId));
      dispatch({
        type: types.ADD_WEBSITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_WEBSITE_FAILURE,
        payload: err,
      });
    });
};
// get  website
export const getWebsite = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_WEBSITE_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/website/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WEBSITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WEBSITE_FAILURE,
        payload: err,
      });
    });
};

// get Scheduler
export const getScheduler = (departmentId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_BY_ORG_ID_REQUEST,
  });
  axios
    .get(`${base_url}/ruleEngine/report/scheduling/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_SCHEDULER_BY_ORG_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_BY_ORG_ID_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler
export const addScheduler = (data, departmentId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_BY_ORG_ID_REQUEST,
  });
  axios
    .post(`${base_url}/ruleEngine/report/scheduling`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getScheduler(departmentId));
      dispatch({
        type: types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_BY_ORG_ID_FAILURE,
        payload: err,
      });
    });
};
// get Scheduler customer
export const getSchedulerCustomer = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_CUSTOMER_REQUEST,
  });
  axios
    .get(`${base_url}/customer/all-customer`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_SCHEDULER_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler Customer
export const addSchedulerCustomer = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_CUSTOMER_REQUEST,
  });
  axios
    .post(`${base_url}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSchedulerCustomer(orgId));
      dispatch({
        type: types.ADD_SCHEDULER_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

// get Scheduler Vendor
export const getSchedulerVendor = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_VENDOR_REQUEST,
  });
  axios
    .get(`${base_url}/partner/all-partner`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_SCHEDULER_VENDOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_VENDOR_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler Vendor
export const addSchedulerVendor = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_VENDOR_REQUEST,
  });
  axios
    .post(`${base_url}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSchedulerVendor(orgId));
      dispatch({
        type: types.ADD_SCHEDULER_VENDOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_VENDOR_FAILURE,
        payload: err,
      });
    });
};

export const addingThirdPartyAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_THIRD_PARTY_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/engagement/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getThirdPartyAccess(orgId))

      // dispatch(getThirdPartyMonetizeAccess(orgId))
      //dispatch(getThirdPartyMonetizeAccess(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_FAILURE,
        payload: err,
      });
    })
};
export const getThirdPartyAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_ACCESS_REQUEST });
  axios
    .get(`${base_url}/engagement/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const addingThirdPartyVendorAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/third_party/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getThirdPartyVendorAccess(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getThirdPartyVendorAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_VENDOR_ACCESS_REQUEST });
  axios
    .get(`${base_url}/third_party/patner/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_VENDOR_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_VENDOR_ACCESS_FAILURE,
        payload: err,
      });
    });
};



export const addDepartmentAccess = (data, roleTypeId) => (dispatch) => {
  //console.log(permissions, userId);
  dispatch({
    type: types.ADDING_DEPARTMENT_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/access/department`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getDepartmentAccess(roleTypeId))
      dispatch({
        type: types.ADDING_DEPARTMENT_ACCESS_SUCCESS,
        payload: res.data,
      });
      message.success("Privileges have been updated Successfully!!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_DEPARTMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const getDepartmentAccess = (roleTypeId) => (dispath) => {
  dispath({ type: types.GET_DEPARTMENT_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/access/department/${roleTypeId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_DEPARTMENT_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_DEPARTMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};



export const getDepartmentList = () => (dispath) => {
  dispath({ type: types.GET_DEPARTMENT_LIST_REQUEST });
  axios
    .get(`${base_url}/department/accesss`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_DEPARTMENT_LIST_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_DEPARTMENT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getThirdPartyMonetizeAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_MONETIZE_REQUEST });
  axios
    .get(`${base_url}/third_party/monitize/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_MONETIZE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_MONETIZE_FAILURE,
        payload: err,
      });
    });
};
export const addingComplianceGdpr = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_COMPLIANCE_GDPR_REQUEST,
  });
  axios
    .post(`${base_url}/permission/candidate/access/compliance`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getComplianceGdpr(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_COMPLIANCE_GDPR_FAILURE,
        payload: err,
      });
    });
};

export const getComplianceGdpr = (orgId) => (dispath) => {
  dispath({ type: types.GET_COMPLIANCE_GDPR_REQUEST });
  axios
    .get(`${base_url}/compliance/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_COMPLIANCE_GDPR_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_COMPLIANCE_GDPR_FAILURE,
        payload: err,
      });
    });
};

export const addingUpWorkAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_UP_WORK_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/upwork`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getUpWorkAccess(orgId))
      dispatch({
        type: types.ADDING_UP_WORK_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_UP_WORK_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getUpWorkAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_UP_WORK_ACCESS_REQUEST });
  axios
    .get(`${base_url}/recruitment/upwork/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_UP_WORK_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_UP_WORK_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const addingCommunicationAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_COMMUNICATION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/communication/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getCommunicationAccess(orgId))
      dispatch({
        type: types.ADDING_COMMUNICATION_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_COMMUNICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getCommunicationAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_COMMUNICATION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/communication/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_COMMUNICATION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_COMMUNICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const addingSourcingAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_SOURCING_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/sourcing/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getSourcingAccess(orgId))
      dispatch({
        type: types.ADDING_SOURCING_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_SOURCING_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getSourcingAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_SOURCING_ACCESS_REQUEST });
  axios
    .get(`${base_url}/sourcing/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_SOURCING_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_SOURCING_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const handleSequenceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SEQUENCE_MODAL,
    payload: modalProps,
  });
};
export const addingPermissionAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_PERMISSION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/candidate`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getPermissionAccess(orgId))
      dispatch({
        type: types.ADDING_PERMISSION_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_PERMISSION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getPermissionAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_PERMISSION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/candidate/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

// add website
export const addPartner = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_PARTNER_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/partner/website`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPartner(orgId));
      dispatch({
        type: types.ADD_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_FAILURE,
        payload: err,
      });
    });
};
export const getPartner = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/partner/website/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PARTNER_FAILURE,
        payload: err,
      });
    });
};
export const addSequence = (sequence, orgId) => (dispatch) => {


  console.log("inside addSequence");
  dispatch({
    type: types.ADD_SEQUENCE_REQUEST,
  });

  axios
    .post(`${base_url}/sequence`, sequence, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSequence(orgId));
      dispatch({
        type: types.ADD_SEQUENCE_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SEQUENCE_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};
export const getSequence = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SEQUENCE_REQUEST,
  });
  axios
    .get(`${base_url}/sequence/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEQUENCE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEQUENCE_FAILURE,
        payload: err,
      });
    });
};
export const addMonster = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_MONSTER_REQUEST,
  });
  axios
    .post(`${base_url}/monster/credentials`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getMonster(orgId));
      dispatch({
        type: types.ADD_MONSTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MONSTER_FAILURE,
        payload: err,
      });
    });
};
export const getMonster = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_MONSTER_REQUEST,
  });
  axios
    .get(`${base_url}/monster/credentials/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MONSTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MONSTER_FAILURE,
        payload: err,
      });
    });
};

export const getSequenceDetail = (SequenceId) => (dispatch) => {
  dispatch({
    type: types.GET_SEQUENCE_DETAIL_REQUEST,
  });
  axios
    .get(`${base_url}/sequence/rule/${SequenceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEQUENCE_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEQUENCE_DETAIL_FAILURE,
        payload: err,
      });
    });
};
export const getNotifications = (orgId) => (dispath) => {
  dispath({ type: types.GET_NOTIFICATIONS_REQUEST });
  axios
    .get(`${base_url}/notification/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};
export const addingNotifications = (data,orgId ) => (dispatch, getState) => {
  //console.log(permissions, userId);
   const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADDING_NOTIFICATIONS_REQUEST,
  });
  axios
    .put(`${base_url}/notification/rule/update`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
       dispatch(getNotifications(orgId))
      dispatch({
        type: types.ADDING_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};
export const getRequirementsDuration = (orgId) => (dispath) => {
  dispath({ type: types.GET_REQUIREMENTS_DURATION_REQUEST });
  axios
    .get(`${base_url}/recruit/close/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_REQUIREMENTS_DURATION_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_REQUIREMENTS_DURATION_FAILURE,
        payload: err,
      });
    });
};
export const updateRequirement = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_REQUIREMENT_REQUEST });

  axios
    .put(`${base_url}/recruit/close/rule`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
      
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REQUIREMENT_FAILURE,
      });
     
    });
};

export const updateOpportunity = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_OPPORTUNITIES_REQUEST });

  axios
    .put(`${base_url}/opportunity/close/rule`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_OPPORTUNITIES_SUCCESS,
        payload: res.data,
      });
      
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_OPPORTUNITIES_FAILURE,
      });
     
    });
};


export const getOpportunitiesDuration = (orgId) => (dispath) => {
  dispath({ type: types.GET_OPPORTUNITIES_DURATION_REQUEST });
  axios
    .get(`${base_url}/opportunity/close/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_OPPORTUNITIES_DURATION_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_OPPORTUNITIES_DURATION_FAILURE,
        payload: err,
      });
    });
};
export const addNotificationAccess = (data, userId) => (dispatch) => {
  //console.log(permissions, userId);
  dispatch({
    type: types.ADDING_NOTIFICATION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/access/notification`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
       dispatch(getNotificationAccess(userId))
      dispatch({
        type: types.ADDING_NOTIFICATION_ACCESS_SUCCESS,
        payload: res.data,
      });
      message.success("Privileges have been updated Successfully!!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_NOTIFICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const getNotificationAccess = (userId) => (dispath) => {
  dispath({ type: types.GET_NOTIFICATION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/access/notification/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_NOTIFICATION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_NOTIFICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const deleteReportSchedulerInternalData = (reportSchedulingId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/ruleEngine/report-scheduling/${reportSchedulingId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_SUCCESS,
        payload: reportSchedulingId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const deleteSequenceData = (sequenceId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_SEQUENCE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/sequence/${sequenceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_SEQUENCE_DATA_SUCCESS,
        payload: sequenceId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SEQUENCE_DATA_FAILURE,
        payload: err,
      });
    });
};
export const addProcessForOpportunity = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_OPPORTUNITY_REQUEST,
  });

  axios
    .post(`${base_url}/workflow/opportunityWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
       dispatch(getProcessForOpportunity(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};
export const getProcessForOpportunity = (orgId) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunityWorkflow/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const deleteWorkflowData = (processId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_WORKFLOW_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/recruit/delete/workFlow/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_WORKFLOW_DATA_SUCCESS,
        payload: processId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_WORKFLOW_DATA_FAILURE,
        payload: err,
      });
    });
};


export const deleteTaskData = (taskChecklistId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_TASK_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/category/task/checklist/delete/${taskChecklistId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_TASK_DATA_SUCCESS,
        payload: taskChecklistId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_DATA_FAILURE,
        payload: err,
      });
    });
};


export const deleteOpportunityProcessData = (opportunityWorkflowDetailsId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_OPPORTUNITY_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/opportunityWorkflow/${opportunityWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_OPPORTUNITY_PROCESS_DATA_SUCCESS,
        payload: opportunityWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateSequenceTableData= (data,sequenceId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SEQUENCE_TABLE_DATA_REQUEST,
  });


  axios
    .put(`${base_url}/sequence/${sequenceId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    //  dispatch(getExperienceByCandidateId(candidateId));
      dispatch({
        type: types.UPDATE_SEQUENCE_TABLE_DATA_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SEQUENCE_TABLE_DATA_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};
export const updateProcessNameForOpportunity = (process,opportunityWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/opportunityWorkflow/${opportunityWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addProcessStageForOpportunity = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_REQUEST });

  axios
    .post(`${base_url}/workflow/opportunityStages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForOpportunity = (oppworkFlowId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunityStages/${oppworkFlowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const addingAssessmentAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_ASSESSMENT_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/assessment`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getAssessmentAccess(orgId))
      dispatch({
        type: types.ADDING_ASSESSMENT_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_ASSESSMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getAssessmentAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_ASSESSMENT_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/assessment/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_ASSESSMENT_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_ASSESSMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const addingRemoteAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_REMOTE_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/engagement/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getRemoteAccess(orgId))
      dispatch({
        type: types.ADDING_REMOTE_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_REMOTE_ACCESS_FAILURE,
        payload: err,
      });
    })
};

export const getRemoteAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_REMOTE_ACCESS_REQUEST });
  axios
    .get(`${base_url}/engagement/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_REMOTE_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_REMOTE_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForOpportunity = (
  opportunityStagesId,
  responsible,
  stageName,
  
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .put(
      `${base_url}/opportunityStages/${opportunityStagesId}`,
      { opportunityStagesId,responsible, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteHiringStagesData = (stageId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_HIRING_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/recuitment/delete/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_HIRING_STAGES_DATA_SUCCESS,
        payload: stageId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_HIRING_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const deleteOpportunityStagesData = (opportunityStagesId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_OPPORTUNITY_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/opportunityStages/${opportunityStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_OPPORTUNITY_STAGES_DATA_SUCCESS,
        payload: opportunityStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};
export const handleRecruitmentDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUITMENT_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const LinkOpportunityProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/opportunityWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateSequence = (data,cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SEQUENCE_REQUEST,
  });

  axios
    .put(`${base_url}/sequence/rule`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
     // dispatch(getNotificationTemplate());

      dispatch({
        type: types.UPDATE_SEQUENCE_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_SEQUENCE_FAILURE,
        payload: err,
      });
    });
};


export const addingWeekendAccess = (data, countryName) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_WEEKEND_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/holiday/weekends/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
       dispatch(getWeekendAccess(countryName))
      dispatch({
        type: types.ADDING_WEEKEND_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_WEEKEND_ACCESS_FAILURE,
        payload: err,
      });
    })
};


export const getWeekendAccess = (countryName) => (dispath) => {
  dispath({ type: types.GET_WEEKEND_ACCESS_REQUEST });
  axios
    .get(`${base_url}/holiday/weekends/${countryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_WEEKEND_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_WEEKEND_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const updateTaskNameForRecruit = (process, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_TASK_NAME_FOR_RECRUIT_REQUEST });

  axios
    .put(`${base_url}/category/task/checklist/update`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_NAME_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_NAME_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addTaskStageForRecruit = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_TASK_STAGE_FOR_RECRUIT_REQUEST });

  axios
    .post(`${base_url}/category/task/checklist/stage/save`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_TASK_STAGE_FOR_RECRUIT_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TASK_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getTaskStagesForRecruit = (taskChecklistId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_TASK_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/category/task/checklist/stage/link/all/${taskChecklistId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};


export const deleteTaskStagesData = (taskChecklistStagelinkId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_TASK_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/category/task/checklist/stage/delete/${taskChecklistStagelinkId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_TASK_STAGES_DATA_SUCCESS,
        payload: taskChecklistStagelinkId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};


export const updateTaskStageForRecruit = (
  taskChecklistStagelinkId,
  taskChecklistStageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(taskChecklistStagelinkId);
  dispatch({
    type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_REQUEST,
  });
  axios
    .put(
      `${base_url}/category/task/checklist/stage/update`,
      { taskChecklistStagelinkId, taskChecklistStageName, probability,days},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("error");
    });
};


export const addApprove = (data,subProcessName) => (dispatch) => {
  dispatch({ type: types.ADD_APPROVE_REQUEST });
  axios
    .post(`${base_url}/approve/save/processName/subProcessName`, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getIndentApprovalData("Indent", "IndentApproval"))
      dispatch(getApproveData("Leave"))
      dispatch(getApproveData("Mileage"))
      dispatch(getApproveData("Expense"))
      dispatch({
        type: types.ADD_APPROVE_SUCCESS,
        payload: res.data,
      });
      message.success("Level For Approval Added Successfully !!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_APPROVE_FAILURE,
      });
    });
};

export const getApproveData = (subProcessName, IndentApproval) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVE_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/approve/${subProcessName}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVE_DATA_SUCCESS,
        payload: res.data,
      });
      // message.success("Level For Approval Added Successfully !!")

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVE_DATA_FAILURE,
        payload: err,
      });
    });
};


export const getDepartmentRoleData = (departmentId,page) => (dispatch) => {

  dispatch({
    type: types.GET_DEPARTMENT_ROLE_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/roleType/department/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENT_ROLE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEPARTMENT_ROLE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getTaskForStages = (orgId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/taskcheckList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_STAGES_FAILURE,
        payload: err,
      });
    });
};


export const getTaskWorkflowStagesForRecruit = (taskId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/task/subTask/${taskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};


export const getTaskForWorkflow = (taskTypeId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_WORKFLOW_REQUEST,
  });
  axios
    .get(`${base_url}/category/task/allChecklist/${taskTypeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};

export const addTaskWorkflow = (included, cb) => (dispatch) => {
  // console.log(sectors);
  dispatch({
    type: types.ADD_TASK_WORKFLOW_REQUEST,
  });
  axios
    .post(`${base_url}/task/subTask`, {included}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getSectors());
      message.success("data has been added successfully!");
      console.log(res);
      dispatch({
        type: types.ADD_TASK_WORKFLOW_SUCCESS,
        payload:res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_TASK_WORKFLOW_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};

export const getTaskTeamList = (taskId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_TEAM_LIST_REQUEST,
  });
  axios
  .get(`${base_url}/task/teamList/${taskId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_TEAM_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_TEAM_LIST_FAILURE,
        payload: err,
      });
    });
};












