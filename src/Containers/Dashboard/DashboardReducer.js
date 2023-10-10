import * as types from "./DashboardActionTypes";
import dayjs from "dayjs";
import moment from "moment";

const initialState = {
  fetchingSkillsCloud: false,
  fetchingSkillsCloudError: false,
  skillsCloud: [],

  fetchingdashboardTable: false,
  fetchingdashboardTableError: false,
  tableDashboard: [],

  updatingCall: false,
  updatingCallError: false,

  fetchingDashBoardIndicator: false,
  fetchingDashBoardIndicatorError: false,
  dashboardIndicator: [],

  fetchingalldashBoardClosureRatio: false,
  fetchingalldashBoardClosureRatioError: false,
  dashBoardallClosureRatio: [],

  addjobDetailModal: false,

  fetchingRecruiterDashboardList: false,
  fetchingRecruiterDashboardListError: false,
  listRecruiterDashboard: [],

  fetchingTodos: false,
  fetchingTodosError: false,
  todos: [],

  fetchingTodosCount: false,
  fetchingTodosCountError: false,
  todosCount: {},

  fetchingAvgHour: false,
  fetchingAvgHourError: false,
  avgHour: {},

  fetchingdashBoardCommissionTable: false,
  fetchingdashBoardCommissionTableError: false,
  tableDashBoardCommission: [],

  fetchingActionSteps: false,
  fetchingActionStepsError: false,
  actionSteps: [],

  fetchingalldashboardTable2: false,
  fetchingalldashboardTable2Error: false,
  tableallDashboard2: [],

  fetchingdashboardTable2: false,
  fetchingdashboardTable2Error: false,
  tableDashboard2: [],

  fetchingDashBoardFunnel: false,
  fetchingDashBoardFunnelError: false,
  dashboardFunnel: [],

  fetchingUpcomingEvents: false,
  fetchingUpcomingEventsError: false,
  upcomingEvents: [],

  fetchingdashBoardCustomerChart: false,
  fetchingdashBoardCustomerChartError: false,
  dashBoardCustomerChart: [],

  fetchingCandidateTotalBillableAmount: false,
  fetchingCandidateTotalBillableAmountError: false,
  candidatesBillableAmount: [],

  fetchingAllSalesDatewiseReport: false,
  fetchingAllSalesDatewiseReportError: false,
  showAllSalesDatelist: [],

  fetchingdashBoardClosureRatio: false,
  fetchingdashBoardClosureRatioError: false,
  dashBoardClosureRatio: [],

  fetchingalldashBoardCustomerChart: false,
  fetchingalldashBoardCustomerChartError: false,
  dashBoardallCustomerChart: [],

  addDrawerActionModal: false,

  fetchingActionNotifications: false,
  fetchingActionNotificationsError: false,
  actionNotifications: [],

  fetchingTaskper: false,
  fetchingTaskperError: false,
  taskperCount: {},

  addingActionNotifications: false,
  addingActionNotificationsError: false,

  updatingTodoTask: false,
  updatingTodoTaskError: false,

  fetchingallDashBoardFunnel: false,
  fetchingallDashBoardFunnelError: false,
  alldashboardFunnel: [],

  // updatingReqStage:false,
  fetchingDetails: false,
  fetchingDetailsError: false,
  detail: [],

  fetchingdashBoardSummaryChart: false,
  fetchingdashBoardSummaryChartError: false,
  dashBoardSummaryChart: [],

  fetchingSalesDatewiseReport: false,
  fetchingSalesDatewiseReportError: false,
  showSalesDatelist: [],

  viewType: "test",
  isCustomSelected: false,
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),

  dateRangeList: [
    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: true,
      isSelected: true,
      startDate: dayjs().toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 3,
      type: "Last7days",
      value: "Last 7 days",
      starter: false,
      isSelected: false,
      endDate: dayjs()
        .subtract(7, "days")

        .toISOString(),
      startDate: dayjs().toISOString(),
    },

    {
      id: 4,
      type: "Last30days",
      value: "Last 30 days",
      starter: false,
      isSelected: false,
      endDate: dayjs().subtract(30, "days").toISOString(),
      startDate: dayjs().toISOString(),
    },
    {
      id: 5,
      type: "Thismonth",
      value: "This month",
      starter: false,
      isSelected: false,
      endDate: dayjs().startOf("week").toISOString(),
      startDate: dayjs().toISOString(),
    },
    {
      id: 6,
      type: "Lastmonth",
      value: "Last month",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().toISOString(),
    },
  ],
  type: "All",

  fetchingOrderListByOrderId: false,
  fetchingOrderListByOrderIdError: false,
  showDatelist: [],

  fetchingStageActionNotifications: false,
  fetchingStageActionNotificationsError: false,
  stageactionNotifications: [],

  billableCandidateModal: false,

  fetchingAllDatewiseReport: false,
  fetchingAllDatewiseReportError: false,
  showAllDatelist: [],

  updatingTodoEvent: false,
  updatingTodoEventError: false,

  reportType: ["dashboard"],
  selectedReportType: "dashboard",
  selectedSubReportType: "dashboard",

  fetchingDatewiseReport: false,
  fetchingDatewiseReportError: false,
  dateDashboardReport: [],

  fetchingJumpstartBulb: false,
  fetchingJumpstartBulbError: false,
  jumpstartBulbCount: [],
  fetchingJumpstartBulb2: false,
  fetchingJumpstartBulb2Error: false,
  jumpstartBulb2Count: [],
  fetchingJumpstartBulb3: false,
  fetchingJumpstartBulb3Error: false,
  jumpstartBulb3Count: [],

  dateRangeList: [
    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: false,
      isSelected: true,
      startDate: dayjs()
        // .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 2,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: moment().startOf("quarter").toISOString(),
      endDate: moment().endOf("quarter").toISOString(),
    },
    {
      id: 3,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: moment().startOf("month").toISOString(),
      endDate: moment().endOf("month").toISOString(),
    },
    {
      id: 4,
      type: "week",
      value: "1W",
      starter: false,
      isSelected: false,
      startDate: moment().startOf("week").toISOString(),
      endDate: moment().endOf("week").toISOString(),
    },
  ],
  isCustomSelected: false,
  // startDate: dayjs()
  //     .startOf("year")
  //     .toISOString(),
  // endDate: dayjs()
  //     .endOf("year")
  //     .toISOString(),

  reportTypes: ["Requirement", "Selected"],
  reportType: ["Requirement", "Selected"],
  selectedReportType: "Select Report",

  selectedSubReportType: "Select",

  fetchingDashboardUserList: false,
  fetchingDashboardUserListError: false,
  dashboardUserlist: [],

  gettingHotColdWarm: false,
  gettingHotColdWarmError: false,
  showHotColdWarm: [],

  fetchingJumpstartCustolist: false,
  fetchingJumpstartCustolistError: false,
  jumpstrtCUSTOCount:{},
  fetchingJumpstartCusto2list: false,
  fetchingJumpstartCusto2listError: false,
  jumpstrtCUSTO2Count:{},

  fetchingdashCustoLeadsAdded: false,
  fetchingdashCustoLeadsAddedError: false,
  dashCustoLeadsAdded:{},

  fetchingJumpstartTasklist: false,
  fetchingJumpstartTasklistError: false,
  jumpstartTasklistCount:{},
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DASHBOARD_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_SKILLS_CLOUD_REQUEST:
      return { ...state, fetchingSkillsCloud: true };
    case types.GET_SKILLS_CLOUD_SUCCESS:
      return {
        ...state,
        fetchingSkillsCloud: false,
        skillsCloud: action.payload,
      };
    case types.GET_SKILLS_CLOUD_FAILURE:
      return {
        ...state,
        fetchingSkillsCloud: false,
        fetchingSkillsCloudError: true,
      };
    case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
      return {
        ...state,
        dateRangeList: newDateRange(state.dateRangeList, action.payload),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        type: action.payload.type,
      };

    case types.SET_TIME_INTERVAL_REPORT:
      return {
        ...state,
        isCustomSelected: true,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST:
      return { ...state, fetchingOrderListByOrderId: true };
    case types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        fetchingOrderListByOrderId: false,
        orderListByOrderId: action.payload,
      };
    case types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE:
      return {
        ...state,
        fetchingOrderListByOrderId: false,
        fetchingOrderListByOrderIdError: true,
      };

    case types.SET_SELECTED_REPORT_TYPE:
      return {
        ...state,
        selectedReportType: action.payload,
        // selectedSubReportType: "order",
      };

    case types.GET_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingDatewiseReport: true };
    case types.GET_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingDatewiseReport: false,
        fetchingDatewiseReportError: false,
        showDatelist: action.payload,
      };
    case types.GET_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingDatewiseReport: false,
        fetchingDatewiseReportError: true,
        selectedReportType: "dashboard",
      };

    case types.GET_DASHBOARD_TABLE_REQUEST:
      return { ...state, fetchingdashboardTable: true };
    case types.GET_DASHBOARD_TABLE_SUCCESS:
      return {
        ...state,
        fetchingdashboardTable: false,
        tableDashboard: action.payload,
      };
    case types.GET_DASHBOARD_TABLE_FAILURE:
      return {
        ...state,
        fetchingdashboardTable: false,
        fetchingdashboardTableError: true,
      };

    case types.GET_RECRUITER_DASHBOARD_LIST_REQUEST:
      return { ...state, fetchingRecruiterDashboardList: true };
    case types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        fetchingRecruiterDashboardList: false,
        listRecruiterDashboard: action.payload,
      };
    case types.GET_RECRUITER_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        fetchingRecruiterDashboardList: false,
        fetchingRecruiterDashboardListError: true,
      };

    case types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST:
      return { ...state, fetchingdashboardTable2: true };
    case types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS:
      return {
        ...state,
        fetchingdashboardTable2: false,
        tableDashboard2: action.payload,
      };
    case types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE:
      return {
        ...state,
        fetchingdashboardTable2: false,
        fetchingdashboardTable2Error: true,
      };

    case types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST:
      return { ...state, fetchingdashBoardCommissionTable: true };
    case types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS:
      return {
        ...state,
        fetchingdashBoardCommissionTable: false,
        tableDashBoardCommission: action.payload,
      };
    case types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE:
      return {
        ...state,
        fetchingdashBoardCommissionTable: false,
        fetchingdashBoardCommissionTableError: true,
      };

    case types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST:
      return { ...state, fetchingdashBoardCustomerChart: true };
    case types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS:
      return {
        ...state,
        fetchingdashBoardCustomerChart: false,
        dashBoardCustomerChart: action.payload,
      };
    case types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE:
      return {
        ...state,
        fetchingdashBoardCustomerChart: false,
        fetchingdashBoardCustomerChartError: true,
      };

    case types.GET_DASHBOARD_CLOSURE_RATIO_REQUEST:
      return { ...state, fetchingdashBoardClosureRatio: true };
    case types.GET_DASHBOARD_CLOSURE_RATIO_SUCCESS:
      return {
        ...state,
        fetchingdashBoardClosureRatio: false,
        dashBoardClosureRatio: action.payload,
      };
    case types.GET_DASHBOARD_CLOSURE_RATIO_FAILURE:
      return {
        ...state,
        fetchingdashBoardClosureRatio: false,
        fetchingdashBoardClosureRatioError: true,
      };

    case types.GET_DASHBOARD_SUMMARY_CHART_REQUEST:
      return { ...state, fetchingdashBoardSummaryChart: true };
    case types.GET_DASHBOARD_SUMMARY_CHART_SUCCESS:
      return {
        ...state,
        fetchingdashBoardSummaryChart: false,
        dashBoardSummaryChart: action.payload,
      };
    case types.GET_DASHBOARD_SUMMARY_CHART_FAILURE:
      return {
        ...state,
        fetchingdashBoardSummaryChart: false,
        fetchingdashBoardSummaryChartError: true,
      };

    // case types.CHANGE_SELECTED_TODO_TIME_INTERVAL_REPORT:
    //   return {
    //     ...state,
    //     dateTodoRangeList: newDateRange(state.dateTodoRangeList, action.payload),
    //    // isCustomSelected: false,
    //     startDate: action.payload.startDate,
    //     endDate: action.payload.endDate,
    //     type: action.payload.type
    //   };

    case types.GET_TODOS_REQUEST:
      return { ...state, fetchingTodos: true, fetchingTodosError: false };
    case types.GET_TODOS_SUCCESS:
      return {
        ...state,
        fetchingTodos: false,
        fetchingTodosError: false,
        todos: action.payload,
      };
    case types.GET_TODOS_FAILURE:
      return { ...state, fetchingTodos: false, fetchingTodosError: true };

    case types.GET_TODOS_COUNT_REQUEST:
      return {
        ...state,
        fetchingTodosCount: true,
        fetchingTodosCountError: false,
      };
    case types.GET_TODOS_COUNT_SUCCESS:
      return {
        ...state,
        fetchingTodosCount: false,
        fetchingTodosCountError: false,
        todosCount: action.payload,
      };
    case types.GET_TODOS_COUNT_FAILURE:
      return {
        ...state,
        fetchingTodosCount: false,
        fetchingTodosCountError: true,
      };

    case types.GET_AVG_HOUR_REQUEST:
      return { ...state, fetchingAvgHour: true, fetchingAvgHourError: false };
    case types.GET_AVG_HOUR__SUCCESS:
      return {
        ...state,
        fetchingAvgHour: false,
        fetchingAvgHourError: false,
        avgHour: action.payload,
      };
    case types.GET_AVG_HOUR__FAILURE:
      return { ...state, fetchingAvgHour: false, fetchingAvgHourError: true };

    case types.GET_DASHBOARD_FUNNEL_REQUEST:
      return { ...state, fetchingDashBoardFunnel: true };
    case types.GET_DASHBOARD_FUNNEL_SUCCESS:
      return {
        ...state,
        fetchingDashBoardFunnel: false,
        dashboardFunnel: action.payload,
      };
    case types.GET_DASHBOARD_FUNNEL_FAILURE:
      return {
        ...state,
        fetchingDashBoardFunnel: false,
        fetchingDashBoardFunnelError: true,
      };

    case types.GET_DASHBOARD_INDICATOR_REQUEST:
      return { ...state, fetchingDashBoardIndicator: true };
    case types.GET_DASHBOARD_INDICATOR_SUCCESS:
      return {
        ...state,
        fetchingDashBoardIndicator: false,
        dashboardIndicator: action.payload,
      };
    case types.GET_DASHBOARD_INDICATOR_FAILURE:
      return {
        ...state,
        fetchingDashBoardIndicator: false,
        fetchingDashBoardIndicatorError: true,
      };

    case types.GET_SALES_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingSalesDatewiseReport: true };
    case types.GET_SALES_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingSalesDatewiseReport: false,
        fetchingSalesDatewiseReportError: false,
        showSalesDatelist: action.payload,
      };
    case types.GET_SALES_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingSalesDatewiseReport: false,
        fetchingSalesDatewiseReportError: true,
        selectedReportType: "dashboard",
      };

    case types.UPDATE_TODO_CALL_BY_ID_REQUEST:
      return { ...state, updatingTodoCall: true };
    case types.UPDATE_TODO_CALL_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoCall: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.taskId === action.payload.taskId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_CALL_BY_ID_FAILURE:
      return { ...state, updatingCall: false, updatingCallError: false };

    case types.UPDATE_TODO_EVENT_BY_ID_REQUEST:
      return { ...state, updatingTodoEvent: true };
    case types.UPDATE_TODO_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoEvent: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.eventId === action.payload.eventId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        updatingTodoEvent: false,
        updatingTodoEventError: false,
      };

    case types.UPDATE_TODO_TASK_BY_ID_REQUEST:
      return { ...state, updatingTodoTask: true };
    case types.UPDATE_TODO_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoTask: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.taskId === action.payload.taskId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_TASK_BY_ID_FAILURE:
      return {
        ...state,
        updatingTodoTask: false,
        updatingTodoTaskError: false,
      };

    case types.GET_ALL_SALES_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingAllSalesDatewiseReport: true };
    case types.GET_ALL_SALES_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingAllSalesDatewiseReport: false,
        fetchingAllSalesDatewiseReportError: false,
        showAllSalesDatelist: action.payload,
      };
    case types.GET_ALL_SALES_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingAllSalesDatewiseReport: false,
        fetchingAllSalesDatewiseReportError: true,
        // selectedReportType: "dashboard"
      };

    case types.GET_ALL_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingAllDatewiseReport: true };
    case types.GET_ALL_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingAllDatewiseReport: false,
        fetchingAllDatewiseReportError: false,
        showAllDatelist: action.payload,
      };
    case types.GET_ALL_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingAllDatewiseReport: false,
        fetchingAllDatewiseReportError: true,
        // selectedReportType: "dashboard"
      };

    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_REQUEST:
      return { ...state, fetchingalldashBoardClosureRatio: true };
    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_SUCCESS:
      return {
        ...state,
        fetchingalldashBoardClosureRatio: false,
        dashBoardallClosureRatio: action.payload,
      };
    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_FAILURE:
      return {
        ...state,
        fetchingalldashBoardClosureRatio: false,
        fetchingalldashBoardClosureRatioError: true,
      };

    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_REQUEST:
      return { ...state, fetchingalldashBoardCustomerChart: true };
    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_SUCCESS:
      return {
        ...state,
        fetchingalldashBoardCustomerChart: false,
        dashBoardallCustomerChart: action.payload,
      };
    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_FAILURE:
      return {
        ...state,
        fetchingalldashBoardCustomerChart: false,
        fetchingalldashBoardCustomerChartError: true,
      };

    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_REQUEST:
      return { ...state, fetchingalldashboardTable2: true };
    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_SUCCESS:
      return {
        ...state,
        fetchingalldashboardTable2: false,
        tableallDashboard2: action.payload,
      };
    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_FAILURE:
      return {
        ...state,
        fetchingalldashboardTable2: false,
        fetchingalldashboardTable2Error: true,
      };

    case types.GET_ALL_DASHBOARD_FUNNEL_REQUEST:
      return { ...state, fetchingallDashBoardFunnel: true };
    case types.GET_ALL_DASHBOARD_FUNNEL_SUCCESS:
      return {
        ...state,
        fetchingallDashBoardFunnel: false,
        alldashboardFunnel: action.payload,
      };
    case types.GET_ALL_DASHBOARD_FUNNEL_FAILURE:
      return {
        ...state,
        fetchingallDashBoardFunnel: false,
        fetchingallDashBoardFunnelError: true,
      };

    case types.GET_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingActionNotifications: true };
    case types.GET_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingActionNotifications: false,
        actionNotifications: action.payload,
      };
    case types.GET_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingActionNotifications: false,
        fetchingActionNotificationsError: true,
      };

    case types.HANDLE_ADD_JOB_DETAIL_MODAL:
      return { ...state, addjobDetailModal: action.payload };

    case types.ADD_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, addingActionNotifications: true };
    case types.ADD_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        addingActionNotifications: false,
        // actionNotifications: action.payload
      };
    case types.ADD_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        addingActionNotifications: false,
        addingActionNotificationsError: true,
      };

    case types.GET_STAGE_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingStageActionNotifications: true };
    case types.GET_STAGE_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingStageActionNotifications: false,
        stageactionNotifications: action.payload,
      };
    case types.GET_STAGE_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingStageActionNotifications: false,
        fetchingStageActionNotificationsError: true,
      };

    case types.HANDLE_ACTION_DRAWER_MODAL:
      return { ...state, addDrawerActionModal: action.payload };

    case types.GET_ACTION_STEPS_REQUEST:
      return { ...state, fetchingActionSteps: true };
    case types.GET_ACTION_STEPS_SUCCESS:
      return {
        ...state,
        fetchingActionSteps: false,
        actionSteps: action.payload,
      };
    case types.GET_ACTION_STEPS_FAILURE:
      return {
        ...state,
        fetchingActionSteps: false,
        fetchingActionStepsError: true,
      };

    // case types.UPDATE_REQUIREMENT_STAGE_REQUEST:
    //   return {
    //     ...state,
    //     updatingReqStage: true,
    //     //opportunities: updatedOpportunity(state.opportunities, action.payload),
    //   };
    // case types.UPDATE_REQUIREMENT_STAGE_SUCCESS:
    //   return { ...state, updatingReqStage: false };
    // case types.UPDATE_REQUIREMENT_STAGE_FAILURE:
    //   return { ...state };

    case types.GET_DETAILS_LIST_REQUEST:
      return { ...state, fetchingDetails: true };
    case types.GET_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        fetchingDetails: false,
        detail: action.payload,
      };
    case types.GET_DETAILS_LIST_FAILURE:
      return {
        ...state,
        fetchingDetails: false,
        fetchingDetailsError: true,
      };
    case types.HANDLE_BILLABLE_CANDIDATE_MODAL:
      return {
        ...state,
        billableCandidateModal: action.payload,
        candidatesBillableAmount: [],
      };

    case types.GET_CANDIDATES_BILLABLE_AMOUNT_REQUEST:
      return { ...state, fetchingCandidateTotalBillableAmount: true };
    case types.GET_CANDIDATES_BILLABLE_AMOUNT_SUCCESS:
      return {
        ...state,
        fetchingCandidateTotalBillableAmount: false,
        candidatesBillableAmount: action.payload,
      };
    case types.GET_CANDIDATES_BILLABLE_AMOUNT_FAILURE:
      return {
        ...state,
        fetchingCandidateTotalBillableAmount: false,
        fetchingCandidateTotalBillableAmountError: true,
      };

    case types.GET_UPCOMING_EVENTS_REQUEST:
      return {
        ...state,
        fetchingUpcomingEvents: true,
        fetchingUpcomingEventsError: false,
      };
    case types.GET_UPCOMING_EVENTS_SUCCESS:
      return {
        ...state,
        fetchingUpcomingEvents: false,
        fetchingUpcomingEventsError: false,
        upcomingEvents: action.payload,
      };
    case types.GET_UPCOMING_EVENTS_FAILURE:
      return {
        ...state,
        fetchingUpcomingEvents: false,
        fetchingUpcomingEventsError: true,
      };

    case types.GET_TASK_PER_REQUEST:
      return { ...state, fetchingTaskper: true, fetchingTaskperError: false };
    case types.GET_TASK_PER_SUCCESS:
      return {
        ...state,
        fetchingTaskper: false,
        fetchingTaskperError: false,
        taskperCount: action.payload,
      };
    case types.GET_TASK_PER_FAILURE:
      return { ...state, fetchingTaskper: false, fetchingTaskperError: true };

    case types.GET_JUMPSTART_BULB_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb: true,
        fetchingJumpstartBulbError: false,
      };
    case types.GET_JUMPSTART_BULB_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb: false,
        fetchingJumpstartBulbError: false,
        jumpstartBulbCount: action.payload,
      };
    case types.GET_JUMPSTART_BULB_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb: false,
        fetchingJumpstartBulbError: true,
      };

    case types.GET_JUMPSTART_BULB2_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb2: true,
        fetchingJumpstartBulb2Error: false,
      };
    case types.GET_JUMPSTART_BULB2_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb2: false,
        fetchingJumpstartBulb2Error: false,
        jumpstartBulb2Count: action.payload,
      };
    case types.GET_JUMPSTART_BULB2_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb2: false,
        fetchingJumpstartBulb2Error: true,
      };
    case types.GET_JUMPSTART_BULB3_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb3: true,
        fetchingJumpstartBulb3Error: false,
      };
    case types.GET_JUMPSTART_BULB3_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb3: false,
        fetchingJumpstartBulb3Error: false,
        jumpstartBulb3Count: action.payload,
      };
    case types.GET_JUMPSTART_BULB3_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb3: false,
        fetchingJumpstartBulb3Error: true,
      };

    case types.GET_DASHBOARD_USER_LIST_REQUEST:
      return { ...state, fetchingDashboardUserList: true };
    case types.GET_DASHBOARD_USER_LIST_SUCCESS:
      return {
        ...state,
        fetchingDashboardUserList: false,
        dashboardUserlist: action.payload,
      };
    case types.GET_DASHBOARD_USER_LIST_FAILURE:
      return {
        ...state,
        fetchingDashboardUserList: false,
        fetchingDashboardUserListError: true,
      };

    case types.GET_HOT_COLD_WARM_REQUEST:
      return { ...state, gettingHotColdWarm: true };

    case types.GET_HOT_COLD_WARM_SUCCESS:
      return {
        ...state,
        gettingHotColdWarm: false,
        showHotColdWarm: action.payload,
      };

    case types.GET_HOT_COLD_WARM_FAILURE:
      return {
        ...state,
        gettingHotColdWarm: false,
        gettingHotColdWarmError: true,
      };

      case types.GET_JUMPSTART_CUSTOMER_LIST_REQUEST:
        return { ...state, fetchingJumpstartCustolist: true,
          fetchingJumpstartCustolistError: false };
      case types.GET_JUMPSTART_CUSTOMER_LIST_SUCCESS:
        return {
          ...state,
          fetchingJumpstartCustolist: false,
          fetchingJumpstartCustolistError: false,
          jumpstrtCUSTOCount: action.payload,
        };
      case types.GET_JUMPSTART_CUSTOMER_LIST_FAILURE:
        return { ...state,
          fetchingJumpstartCustolist: false,
          fetchingJumpstartCustolistError: true };

case types.GET_JUMPSTART_CUSTOMER2_LIST_REQUEST:
        return { ...state, fetchingJumpstartCusto2list: true,
          fetchingJumpstartCusto2listError: false };
      case types.GET_JUMPSTART_CUSTOMER2_LIST_SUCCESS:
        return {
          ...state,
          fetchingJumpstartCusto2list: false,
          fetchingJumpstartCusto2listError: false,
          jumpstrtCUSTO2Count: action.payload,
        };
      case types.GET_JUMPSTART_CUSTOMER2_LIST_FAILURE:
        return { ...state,
          fetchingJumpstartCusto2list: false,
          fetchingJumpstartCusto2listError: true };

          case types.GET_DASH_CUSTOMER_ADDED_LEADS_REQUEST:
            return { ...state, fetchingdashCustoLeadsAdded: true };
          case types.GET_DASH_CUSTOMER_ADDED_LEADS_SUCCESS:
            return {
              ...state,
              fetchingdashCustoLeadsAdded: false,
              dashCustoLeadsAdded: action.payload,
            };
          case types.GET_DASH_CUSTOMER_ADDED_LEADS_FAILURE:
            return {
              ...state,
              fetchingdashCustoLeadsAdded: false,
              fetchingdashCustoLeadsAddedError: true,
            };

            case types.GET_JUMPSTART_TASK_LIST_REQUEST:
              return {
                ...state,
                fetchingJumpstartTasklist: true,
                fetchingJumpstartTasklistError: false,
              };
            case types.GET_JUMPSTART_TASK_LIST_SUCCESS:
              return {
                ...state,
                fetchingJumpstartTasklist: false,
                fetchingJumpstartTasklistError: false,
                jumpstartTasklistCount: action.payload,
              };
            case types.GET_JUMPSTART_TASK_LIST_FAILURE:
              return {
                ...state,
                fetchingJumpstartTasklist: false,
                fetchingJumpstartTasklistError: true,
              };

    default:
      return state;
  }
};

const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    console.log(newDate);
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });
