import * as types from "./CourseActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { asses_url} from "../../Config/Auth";
import { message } from "antd";

export const setCourseViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_COURSE_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const handleCourseModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_COURSE_MODAL,
      payload: modalProps,
    });
  };

  export const addCourse = (course) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add course");
    dispatch({
      type: types.ADD_COURSE_REQUEST,
    });
  
    axios
      .post(`${asses_url}/course/saveCourse`, course, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getCourse());
        dispatch({
          type: types.ADD_COURSE_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_COURSE_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };

  export const getCourse = () => (dispatch) => {
    dispatch({
     type: types.GET_COURSE_REQUEST,
   });
   axios
     .get(`${asses_url}/course/getCourseDetails`, {
       headers: {
         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
       },
     })
     .then((res) => {
       console.log(res);

       dispatch({
         type: types.GET_COURSE_SUCCESS,
         payload: res.data,
       });
     // }
     })
     .catch((err) => {
       console.log(err.response);
       dispatch({
         type: types.GET_COURSE_FAILURE,
         payload: err,
       });
     });
     
 };


 export const getCourseDetailsById = (courseId) => (dispatch) => {
  dispatch({
    type: types.GET_COURSE_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${asses_url}/course/${courseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COURSE_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COURSE_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};





export const addTopic = (topic,courseId, cb) => (dispatch) => {
  dispatch({ type: types.ADD_TOPIC_REQUEST });

  axios
    .post(`${asses_url}/topic/saveTopic`, topic, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTopics(courseId));
      dispatch({
        type: types.ADD_TOPIC_SUCCESS,
        payload: { ...topic, topicId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const getTopics = (courseId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_TOPICS_REQUEST,
  });
  axios
    .get(`${asses_url}/topic/getTopics/${courseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_FAILURE,
        payload: err,
      });
    });
};

export const handleTestDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEST_DRAWER_MODAL,
    payload: modalProps,
  });
};