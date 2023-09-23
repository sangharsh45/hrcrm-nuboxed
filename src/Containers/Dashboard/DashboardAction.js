import * as types from "./DashboardActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";

export const getSkillsCloud = () => (dispatch) => {
    dispatch({
      type: types.GET_SKILLS_CLOUD_REQUEST,
    });
    axios
      .get(`${base_url}/skill/word/cloud`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SKILLS_CLOUD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_SKILLS_CLOUD_FAILURE,
          payload: err,
        });
      });
  };

  export const handleAddJobDetailtModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ADD_JOB_DETAIL_MODAL,
      payload: modalProps,
    });
  };

export const setDashboardViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_DASHBOARD_VIEW_TYPE, payload: viewType });


 /**
 * set selected time range from time interval report
 */
  export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
    console.log(selectedTime);
    dispatch({
      type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
      payload: selectedTime,
    });
  };


  export const handleActionDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ACTION_DRAWER_MODAL,
      payload: modalProps,
    });
  };
  // export const setSelectedTodoTimeIntervalReport = (selectedTodoTime) => (dispatch) => {
  //   //console.log(selectedTime);
  //   dispatch({
  //     type: types.CHANGE_SELECTED_TODO_TIME_INTERVAL_REPORT,
  //     payload: selectedTodoTime,
  //   });
  // };
  /**
   * set current Time  report
   */
   export const setTimeRangeReport = (startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.SET_TIME_INTERVAL_REPORT,
      payload: {
        startDate: dayjs(startDate).toISOString(),
        endDate: dayjs(endDate).toISOString(),
      },
    });
  };

  // export const setDashboardType = (type) => (dispatch) =>
  // dispatch({
  //   type: types.SET_DASHBOARD_TYPE,
  //   payload: type,
  // });

  export const getListByOrderId = () => (dispatch) => {
    dispatch({
      type: types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST,
    });
    axios
      .get(`${base_url}/order/all-order`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getDateWiseList = (recruiterId,endDate,startDate,) => (dispatch) => {
    dispatch({
      type: types.GET_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/record/${recruiterId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

  export const setSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SELECTED_REPORT_TYPE,
    payload: type,
  });

export const setSubSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUB_SELECTED_REPORT_TYPE,
    payload: type,
  });


  export const getDashboardTable = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open-recruitment/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getRecruiterDashboardList = (recruiterId) => (dispatch) => {
    dispatch({
      type: types.GET_RECRUITER_DASHBOARD_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_RECRUITER_DASHBOARD_LIST_FAILURE,
          payload: err,
        });
      });
      
  };
  export const getDashboardTable2 = (orgId,) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/contacts/user/${userId}`;
    // } else {
    //   api_url = `/contacts`;
    // }
    dispatch({
      type: types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/org/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
        
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardCommissionTable = (recruiterId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardCustomerChart = (organizationId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/customer/org/${organizationId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardClosureRatio = (organisationId,endDate,startDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_CLOSURE_RATIO_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/org/closer/${organisationId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_CLOSURE_RATIO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_CLOSURE_RATIO_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardSummaryChart = (organizationId,endDate,startDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_SUMMARY_CHART_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/customer/sort/${organizationId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_SUMMARY_CHART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_SUMMARY_CHART_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getTodos = (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_TODOS_REQUEST });
   
    axios
      .get(`${base_url}/todo/${userId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_TODOS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_TODOS_FAILURE,
          payload: err,
        });
      });
  };

  export const getDashboardFunnelRecord = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_FUNNEL_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/funel/record/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_FUNNEL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DASHBOARD_FUNNEL_FAILURE,
          payload: err,
        });
      });
  };


  export const getDashboardIndicatorRecord = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_INDICATOR_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/speedo/record/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_INDICATOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DASHBOARD_INDICATOR_FAILURE,
          payload: err,
        });
      });
  };

  export const getSalesDateWiseList = (orgId,endDate,startDate,) => (dispatch) => {
    dispatch({
      type: types.GET_SALES_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/record/organisation/${orgId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_SALES_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SALES_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

  export const updateTodoCall = ( data,callId,type) => (dispatch, getState) => {
    // const { userId } = getState("auth").auth.userDetails;
    // console.log(data);
    dispatch({ type: types.UPDATE_TODO_CALL_BY_ID_REQUEST });
    axios
      .put(
        `${base_url}/todo/update/${callId}?type=${type}`,data,{
        
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.UPDATE_TODO_CALL_BY_ID_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_TODO_CALL_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const updateTodoEvent = ( data, eventId,type) => (dispatch, getState) => {
    ////debugger
    // const { userId } = getState("auth").auth.userDetails;
    console.log(data);
    dispatch({ type: types.UPDATE_TODO_EVENT_BY_ID_REQUEST });
    axios
      .put(
        `${base_url}/todo/update/${eventId}?type=${type}`,data,{
        
      
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.UPDATE_TODO_EVENT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        ////debugger
        console.log(err);
        dispatch({
          type: types.UPDATE_TODO_EVENT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const updateTodoTask = ( data,taskId,type) => (dispatch, getState) => {
    // const { userId } = getState("auth").auth.userDetails;
    // console.log(data);
    dispatch({ type: types.UPDATE_TODO_TASK_BY_ID_REQUEST });
    axios
      .put(
        `${base_url}/todo/update/${taskId}?type=${type}`,data,{
        
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.UPDATE_TODO_TASK_BY_ID_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_TODO_TASK_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllSalesDateWiseList = (userId,endDate,startDate,type) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_SALES_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/record/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_ALL_SALES_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_SALES_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

  export const getAllDateWiseList = (recruiterId,endDate,startDate,) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/record/${recruiterId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_ALL_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

  export const getAllDashBoardClosureRatio = (userId,endDate,startDate,type) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/user/closer/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getAllDashBoardCustomerChart = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/customer/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_FAILURE,
          payload: err,
        });
      });
      
  };


  export const getAllDashboardTable2 = (userId,type) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/contacts/user/${userId}`;
    // } else {
    //   api_url = `/contacts`;
    // }
    dispatch({
      type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${userId}?type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
        
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_FAILURE,
          payload: err,
        });
      });
      
  };


  export const getAllDashboardFunnelRecord = (userId,type) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DASHBOARD_FUNNEL_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/funnel/user/record/${userId}?type=${type}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DASHBOARD_FUNNEL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DASHBOARD_FUNNEL_FAILURE,
          payload: err,
        });
      });
  };

  export const addActionNotification = (profileId,data) => dispatch => {
    console.log("inside getPastNotifications()");
    dispatch({
      type: types.ADD_ACTION_NOTIFICATIONS_REQUEST
    });
 axios
      .put(`${base_url}/recruit/approve/action/${profileId}`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: types.ADD_ACTION_NOTIFICATIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.ADD_ACTION_NOTIFICATIONS_FAILURE,
          payload: err
        });
      });
  };

  export const getActionNotifications = (userId,type) => dispatch => {
    console.log("inside getPastNotifications()");
    dispatch({
      type: types.GET_ACTION_NOTIFICATIONS_REQUEST
    });
 axios
      .get(`${base_url}/recruit/action/${userId}?type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: types.GET_ACTION_NOTIFICATIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.GET_ACTION_NOTIFICATIONS_FAILURE,
          payload: err
        });
      });
  };


  export const getActionSteps = (userId,type) => dispatch => {
    console.log("inside getPastNotifications()");
    dispatch({
      type: types.GET_ACTION_STEPS_REQUEST
    });
 axios
      .get(`${base_url}/action/history/${userId}?type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: types.GET_ACTION_STEPS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.GET_ACTION_STEPS_FAILURE,
          payload: err
        });
      });
  };
  export const getStageActionNotifications = (orgId) => dispatch => {
    console.log("inside getPastNotifications()");
    dispatch({
      type: types.GET_STAGE_ACTION_NOTIFICATIONS_REQUEST
    });
 axios
      .get(`${base_url}/action/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: types.GET_STAGE_ACTION_NOTIFICATIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.GET_STAGE_ACTION_NOTIFICATIONS_FAILURE,
          payload: err
        });
      });
  };


  // export const updateRequirementStage = (
    
  //   sourceStageId,
  //   destinationStageId,
  //   opportunityId,
  //   cb
  // ) => (dispatch) => {
  //   console.log(sourceStageId, destinationStageId, opportunityId);
  //   if (destinationStageId === "won") {
  //     message.success("stage is won");
  //   }
  //   if (destinationStageId === "loss") {
  //     message.error("stage is loss");
  //   }
  //   dispatch({
  //     type: types.UPDATE_REQUIREMENT_STAGE_REQUEST,
  //     payload: {
  //       sourceStageId,
  //       destinationStageId,
  //       opportunityId,
  //     },
  //   });
  //   axios
  //     .put(
  //       `${base_url}/recriutment/canban/${opportunityId}/${destinationStageId}`,{}, {
  //         headers: {
  //           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       // if (res.data.stageName === "Won") {
  //       //   message.error("Won");
  //       // } else {
  //       //   message.error("Loss");
  //       // }
  
  //       dispatch({
  //         type: types.UPDATE_REQUIREMENT_STAGE_SUCCESS,
  //         payload: res.data,
  //       });
  //       cb && cb(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  
  //       dispatch({
  //         type: types.UPDATE_REQUIREMENT_STAGE_FAILURE,
  //         payload: err,
  //       });
  //       cb && cb("failure");
  //     });
  // };
  
  export const getDetailsList = (recruitmentId) => (dispatch) => {
    dispatch({
      type: types.GET_DETAILS_LIST_REQUEST,
    });
    axios
       .get(`${base_url}/recriutment/details/dashboard/${recruitmentId}`, {
       headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DETAILS_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DETAILS_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const handleBillableCandidateModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_BILLABLE_CANDIDATE_MODAL,
      payload: modalProps,
    });
  };

  export const getCandidatesBillableAmount = (userId,pageNo,month,year) => (dispatch) => {
    console.log("inside add candidate");
    dispatch({
      type: types.GET_CANDIDATES_BILLABLE_AMOUNT_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/billable/${userId}/${pageNo}/${month}/${year}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_BILLABLE_AMOUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CANDIDATES_BILLABLE_AMOUNT_FAILURE,
          payload: err,
        });
      });
  };


  export const getUpcomingEvents = (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_UPCOMING_EVENTS_REQUEST });
   
    axios
      .get(`${base_url}/todo/upcomingBirthdayAndAniversary`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_UPCOMING_EVENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_UPCOMING_EVENTS_FAILURE,
          payload: err,
        });
      });
  };