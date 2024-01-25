import * as types from "./CourseActionTypes";
import dayjs from "dayjs"; 
const initialState = {
  viewType: "table",

  addCourseModal:false,

  setEditingCourse:{},


  addingTopic: false,
  addingTopicError: false,

  addEditDrawerModal:false,


  addTestDrawerModal:false,

  updatingCourse: false,
  updatingCourseError: false,


  fetchingCourseDetailsById: false,
  fetchingCourseDetailsByIdError: false,
  course: {},


  addingCourse:false,
  addingCourseError:false,

  fetchingCourse:false,
  fetchingCourseError:false,
  courseById:[],


  fetchingTopic: false,
  fetchingTopicError: false,
  topicsData: [],


};
export const courseReducer = (state = initialState, action) => {
    switch (action.type) {

      case types.HANDLE_COURSE_MODAL:
        return { ...state, addCourseModal: action.payload };

case types.SET_COURSE_VIEW_TYPE:
  return {
      ...state,
      viewType: action.payload,
    
  };



  case types.ADD_COURSE_REQUEST:
      return { ...state, addingCourse: true };
    case types.ADD_COURSE_SUCCESS:
      return { ...state, 
        addingCourse: false, 
        addCourseModal: false,
        addTestDrawerModal:false,
          courseById:[action.payload,...state.courseById]
      
      };
    case types.ADD_COURSE_FAILURE:
      return { ...state, addingCourse: false, addCourseModal: false };

      
      case types.GET_COURSE_REQUEST:
                return { ...state, fetchingCourse: true };
              case types.GET_COURSE_SUCCESS:
                return {
                  ...state,
                  fetchingCourse: false,
                  courseById: action.payload,
                };
                case types.GET_COURSE_FAILURE:
                  return {
                    ...state,
                    fetchingCourse: false,
                    fetchingCourseError: true,
                  };

                  case types.GET_COURSE_DETAILS_BY_ID_REQUEST:
                    return { ...state, fetchingCourseDetailsById: true };
                  case types.GET_COURSE_DETAILS_BY_ID_SUCCESS:
                    return {
                      ...state,
                      fetchingCourseDetailsById: false,
                      course: action.payload,
                    };
                  case types.GET_COURSE_DETAILS_BY_ID_FAILURE:
                    return {
                      ...state,
                      fetchingCourseDetailsById: false,
                      fetchingCourseDetailsByIdError: true,
                    };



                    case types.ADD_TOPIC_REQUEST:
                      return { ...state, addingTopic: true };
                    case types.ADD_TOPIC_SUCCESS:
                      return {
                        ...state,
                        addingTopic: false,
                        // recruitProcessStages: [...state.recruitProcessStages, action.payload],
                      };
                    case types.ADD_TOPIC_FAILURE:
                      return {
                        ...state,
                        addingTopic: false,
                        addingTopicError: true,
                      };

                      case types.GET_TOPICS_REQUEST:
                        return {
                          ...state,
                          fetchingTopic: true,
                          fetchingTopicError: false,
                        };
                      case types.GET_TOPICS_SUCCESS:
                        return {
                          ...state,
                          fetchingTopic: false,
                          fetchingTopicError: false,
                          topicsData: action.payload,
                        };
                      case types.GET_TOPICS_FAILURE:
                        return {
                          ...state,
                          fetchingTopic: false,
                          fetchingTopicError: true,
                        };

                        case types.HANDLE_TEST_DRAWER_MODAL:
                          return { ...state, addTestDrawerModal: action.payload };

                          case types.HANDLE_EDIT_DRAWER_MODAL:
                            return { ...state, addEditDrawerModal: action.payload };
  


                          case types.UPDATE_COURSE_REQUEST:
                            return { ...state, updatingCourse: true };
                          case types.UPDATE_COURSE_SUCCESS:
                            return {
                              ...state,
                              updatingCourse: false,
                              addEditDrawerModal: false,
                              courseById: state.courseById.map((item) => {
                                if (item.courseId === action.payload.courseId) {
                                  return action.payload;
                                } else {
                                  return item;
                                }
                              }),
                            };
                          case types.UPDATE_COURSE_FAILURE:
                            return {
                              ...state,
                              updatingCourse: false,
                              updatingCourseError: true,
                            };

                            case types.SET_COURSE_EDIT:
      return { ...state, setEditingCourse: action.payload };

                    


default:
return state;
}
};
