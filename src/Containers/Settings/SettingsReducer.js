import { stubTrue } from "lodash";
import * as types from "./SettingsActionTypes";

const initialState = {
  addProcessModal: false,
  addProcessHiringModal: false,
  addEditProcessModal: false,
  addRulesModal: false,
  addProcessTaskModal: false,
  candidateSequenceModal: false,

  deleteSupplierProcessData: false, 
  deleteSupplierProcessDataError: false,

  fetchingMatrixData:false,
  fetchingMatrixDataError:false,
  matrixData:[],

  fetchingProcessForOnboarding: false,
  fetchingProcessForOnboardingError: false,
  onboardingProcess: [],

  addingProcessForOnboarding: false,
  addingProcessForOnboardingError: false,

  fetchingDepartmentWiseUser: false, 
  fetchingDepartmentWiseUserError: false,
  departmentwiseUser:[],

  fetchingAllVat: false,
  fetchingAllVatError: false,
  allVat: [],

  addingRemoteAccess: false,
  addingRemoteAccessError: false,

  addSequenceModal: false,

  addEmailModal: false,
  addWebsiteModal: false,
  addUpdateEmailModal: false,

  addingSequence: false,
  addingSequenceError: false,

  fetchingSequence: false,
  fetchingSequenceError: false,
  sequence: [],

  updateProcessNameForProduction: false,
  updateProcessNameForProductionError: false,


  fetchingTaskForRecruit: false,
  fetchingTaskForRecruitError: false,
  recruitTask: [],

  fetchingTaskForWorkflow: false,
  fetchingTaskForWorkflowError: false,
  recruitWorkflowTask: [],

  fetchingTaskForStages: false,
  fetchingTaskForStagesError: false,
  stagesTask: [],

  linkingProcessPublish: false,
  linkingProcessPublishError: false,
  processPublish: [],

  fetchingWeekendAccess: false,
  fetchingWeekendAccessError: false,
  weekendAccess: [],

  linkingOpportunityProcessPublish: false,
  linkingOpportunityProcessPublishError: false,
  opportunityProcessPublish: [],

  addingAssessmentAccess: false,
  addingAssessmentAccessError: false,

  linkingStagesPublish: false,
  linkingStagesPublishError: false,
  stagesPublish: [],


  linkingOpportunityStagesPublish: false,
  linkingOpportunityStagesPublishError: false,
  opportunityStagesPublish: [],


  updatingSequenceDetails: false,
  updatingSequenceDetailsError: false,

  addingApproval: false,
  addingApprovalError: false,

  addingProcess: false,
  addingProcessError: false,

  addingProcessForSupplier: false,
  addingProcessForSupplierError: false,

  addingProcessTask: false,
  addingProcessTaskError: false,

  updateProcessNameForOpportunity: false,
  updateProcessNameForOpportunityError: false,

  fetchingProcess: false,
  fetchingProcessError: false,
  Process: [],

  fetchingDistributionAutomation: true,
  fetchingDistributionAutomationError: true,
  distributionAutomation:[],

  deletingSupplierStagesData: false,
   deletingSupplierStagesDataError: false,

  updatingTask: false,
  updatingTaskError: false,
  deleteTask: false,
  deleteTaskError: false,

  deleteTaskData: false,
  deleteTaskDataError: false,

  updatingStagesForSupplier: false,
  updatingStagesForSupplierError: false,

  updatingTaskResuffel: false,
  updatingTaskResuffelError: false,

  addTaskModal: false,
  setEditingTask: {},

  addingProcessStagesForSupplier: false,
  addingProcessStagesForSupplier: false,

  fetchingApproveData: false,
  fetchingApproveDataError: false,
  approvalData: [],

  addTaskDrawer: false,

  updatingProcessTask: false,
  updatingProcessTaskError: false,

  addingProcessStagesForOnboarding: false,
  addingProcessStagesForOnboardingError: false,

  addingTaskWorkflow: false,
  addingTaskWorkflowError: false,

  fetchingDefaultProcess: false,
  fetchingDefaultProcessError: false,
  defaultProcess: [],

  updatingStagesForOnboarding: false,
  updatingStagesForOnboardingError: false,

  fetchingDepartmentRoleData: false,
  fetchingDepartmentRoleDataError: false,
  departmentRoleData: [],

  addingProcessStagesForRepair: false,
  addingProcessStagesForRepair: false,

  deletingOnboardingStagesData: false, 
  deletingOnboardingStagesDataError: false,

  removingStages: false,
  removingStagesError: false,
  updatingStages: false,
  updatingStagesError: false,
  fetchingProcessStages: false,
  fetchingProcessStagesError: false,
  ProcessStages: [],

  fetchingProcessStagesForOnboarding: false,
  fetchingProcessStagesForOnboardingError: false,
  onboardingProcessStages: [],

  updateProcessNameForDeals: false,
  updateProcessNameForDealsError: false,

  fetchingWorkflowTaskStagesForRecruit: false,
  fetchingWorkflowTaskStagesForRecruitError: false,
  recruitTaskWorkflowStages: [],

  updateProcessName: false,
  updateProcessNameError: false,
  fetchingProcessTask: false,
  fetchingProcessTaskError: false,
  processTask: [],

  deletingDealsStagesData: false,
  deletingDealsStagesDataError: false,

  fetchingProcessForDeals: false,
  fetchingProcessForDealsError: false,
  dealsProcess: [],


  updateRequirement: false,
  updateRequirementError: false,

  updateOpportunity: false,
  updateOpportunityError: false,


  addingProcessStages: false,
  addingProcessStagesError: false,

  fetchingAllProcessStages: false,
  fetchingAllProcessStagesError: false,
  allProcessStages: [],

  fetchingOppoStages: false,
  fetchingOppoStagesError: false,
  oppoStages: [],

  linkingSupplierStagesPublish: false,
  linkingSupplierStagesPublishError: false,
  supplierStagesPublish:[],

  udatingSequence: false,
  udatingSequenceError: false,

  fetchingDepartments: false,
  fetchingDepartmentsError: false,
  departments: [],

  fetchingLevels: false,
  fetchingLevelsError: false,
  levels: [],

  linkingOnboardingStagesPublish: false,
  linkingOnboardingStagesPublishError: false,
  onboardingStagesPublish:[],

  //recruiter
  fetchingProcessForRecruit: false,
  fetchingProcessForRecruitError: false,
  recruitProcess: [],

  updateProcessNameForRepair: false,
  updateProcessNameForRepairError: false,

  deleteProductionProcessData: false,
   deleteProductionProcessDataError: false, 

  addingProcessForRecruit: false,
  addingProcessForRecruitError: false,

  fetchingProcessStagesForRecruit: false,
  fetchingProcessStagesForRecruitError: false,
  recruitProcessStages: [],

  updateProcessNameForRecruit: false,
  updateProcessNameForRecruitError: false,

  fetchingAllProcessStagesForRecruit: false,
  fetchingAllProcessStagesForRecruitError: false,
  allProcessStagesForRecruit: [],

  addingLeaves: false,
  addingLeavesError: false,

  updateWebsiteSingle: false,
  updateWebsiteSingleError: false,

  addingProcessForDeals: false,
  addingProcessForDealsError: false,

  fetchingThirdPartyMonetize: false,
  fetchingThirdPartyMonetizeError: false,
  thirdPartyMonetize: [],

  deleteDealsProcessData: false,
  deleteDealsProcessDataError: false,

  fetchingComplianceGdpr: false,
  fetchingComplianceGdprError: false,
  gdprCompliance: [],

  fetchingAssessmentAccess: false,
  fetchingAssessmentAccessError: false,
  assessmentAccess: [],

  fetchingNotifications: false,
  fetchingNotificationsError: false,
  notifications: [],

  updateProcessNameForSupplier: false,
  updateProcessNameForSupplierError: false,

  linkingDealsProcessPublish: false,
  linkingDealsProcessPublishError: false,
  dealsProcessPublish: [],

  fetchingLeaveDetails: false,
  fetchingOrganizationLeadsError: false,
  leaveData: [],

  deleteOnboardingProcessData: false,
   deleteOnboardingProcessDataError: false,

  addingApprove: false,
  addingApproveError: false,

  fetchingSignatureInd: false,
  fetchingSignatureIndError: false,
  signatureInd: {},

  linkingDealsStagesPublish: false,
  linkingDealsStagesPublishError: false,
  dealsStagesPublish: [],

  fetchingProcessStagesForProduction: false,
  fetchingProcessStagesForProductionError: false,
  productionProcessStages: [],

  linkingOnboardingProcessPublish: false,
  linkingOnboardingProcessPublishError: false,
  onboardingProcessPublish:[],

  addingTaskForRecruit: false,
  addingTaskForRecruitError: false,

  setEditingEmail: {},


  fetchingTaskStagesForRecruit: false,
  fetchingTaskStagesForRecruitError: false,
  recruitTaskStages: [],

  addingProcessForProduction: false,
  addingProcessForProductionError: false,

  fetchingTaskTeamList: false,
  fetchingTaskTeamListError: false,
  taskTeamList: [],

  enabalingRecruitProAdvance: false,
  enabalingRecruitProAdvanceError: false,

  fetchingMileageDetails: false,
  // fetchingOrganizationLeadsError: false,
  mileageData: [],

  fetchingProcessForProduction: false,
  fetchingProcessForProductionError: false,
  productionProcess: [],

  updatingMileage: false,
  updatingMileageError: false,

  addRecruitmentApprovalModal: false,

  fetchingApprovalData: false,
  fetchingApprovalDataError: false,
  aaprovalprocessData: {},

  addingPartner: false,
  addingPartnerError: false,

  addingMonster: false,
  addingMonsterError: false,

  fetchingMonster: false,
  fetchingMonsterError: false,
  monster: {},

  fetchingProcessForSupplier: false,
  fetchingProcessForSupplierError: false,
  supplierProcess:[],

  fetchingProcessStagesForDeals: false,
  fetchingProcessStagesForDealsError: false,
  dealsProcessStages: [],

  fetchingRemoteAccess: false,
  fetchingRemoteAccessError: false,
  remoteAccess: [],

  fetchingPartner: false,
  fetchingPartnerError: false,
  partner: [],

  addingCommission: false,
  addingCommissionError: false,


  updateTaskNameForRecruit: false,
  updateTaskNameForRecruitError: false,

  addingProcessStagesForProduction: false,
  addingProcessStagesForProduction: false,

  fetchingCommission: false,
  fetchingCommissionError: false,
  commissionData: [],

  fetchingCommissionTable: false,
  fetchingCommissionTableError: false,
  tableCommission: [],

  updatingCommission: false,
  updatingCommissionError: false,

  setEditingCommission: {},
  updateCommissionModal: false,

  addingRecruiter: false,
  addingRecruiterError: false,

  fetchingRecruiter: false,
  fetchingRecruiterError: false,
  recruiterData: [],

  fetchingProcessStagesForRepair: false,
  fetchingProcessStagesForRepairError: false,
  repairProcessStages: [],

  fetchingProcessStagesForSupplier: false,
  fetchingProcessStagesForSupplierError: false,
  supplierProcessStages: [],

  addingWeekendAccess: false,
  addingWeekendAccessError: false,

  fetchingRecruiterTable: false,
  fetchingRecruiterTableError: false,
  tableRecruiter: [],

  addingWebsite: false,
  addingWebsiteError: false,

  fetchingWebsite: false,
  fetchingWebsiteError: false,
  website: [],

  addingScheduler: false,
  addingSchedulerError: false,

  updatingStagesForProduction: false,
  updatingStagesForProductionError: false,

  fetchingScheduler: false,
  fetchingSchedulerError: false,
  scheduler: [],

  addingThirdPartyAccess: false,
  addingThirdPartyAccessError: false,

  addingThirdPartyVendorAccess: false,
  addingThirdPartyVendorAccessError: false,

  fetchingThirdPartyAccess: false,
  fetchingThirdPartyAccessError: false,
  thirdPartyAccess: [],

  linkingProductionStagesPublish: false,
  linkingProductionStagesPublishError: false,
  productionStagesPublish:[],

  addingUpWorkAccess: false,
  addingUpWorkAccessError: false,

  fetchingUpWorkAccess: false,
  fetchingUpWorkAccessError: false,
  upWorkAccess: [],

  fetchingSequenceDetail: false,
  fetchingSequenceDetailError: false,
  sequenceDetail: [],


  fetchingThirdPartyVendorAccess: false,
  fetchingThirdPartyVendorAccessError: false,
  thirdPartyVendorAccess: [],

  fetchingDepartmentList: false,
  fetchingDepartmentListError: false,
  departmentList: [],

  fetchingDepartmentAccess: false,
  fetchingDepartmentAccessError: false,
  departmentAcces: {},

  addingProcessForRepair: false,
  addingProcessForRepairError: false,
  // vendor: ['Read', 'Create', 'Update', 'Delete'],
  // customer: ['Read', 'Create', 'Update', 'Delete'],
  // opportunity: ['Read', 'Create', 'Update', 'Delete'],
  // talent: ['Read', 'Create', 'Update', 'Delete'],

  fetchingNotificationAccess: false,
  fetchingNotificationAccessError: false,
  notificationAcces: {},

  addingDepartmentAccess: false,
  addingDepartmentAccessError: false,

  deleteReportSchedulerInternalData: false,
  deleteReportSchedulerInternalDataError: false,

  deletingSequenceData: false,
  deletingSequenceDataError: false,

  deletingHiringStagesData: false,
  deletingHiringStagesDataError: false,


  deletingTaskStagesData: false,
  deletingTaskStagesDataError: false,

  deletingOpportunityStagesData: false,
  deletingOpportunityStagesDataError: false,

  deleteWorkflowData: false,
  deleteWorkflowDataError: false,

  deleteOpportunityProcessData: false,
  deleteOpportunityProcessDataError: false,

  addDrawerRecruitmentModal: false,

  fetchingProcessStagesForOpportunity: false,
  fetchingProcessStagesForOpportunityError: false,
  opportunityProcessStages: [],

  linkingSupplierProcessPublish: false,
  linkingSupplierProcessPublishError: false,
  supplierProcessPublish:[],

  linkingProductionProcessPublish: false,
  linkingProductionProcessPublishError: false,
  productionProcessPublish:[],

  addingNotificationAccess: false,
  addingNotificationAccessError: false,

  addingCommunicationAccess: false,
  addingCommunicationAccessError: false,

  addingPermissionAccess: false,
  addingPermissionAccessError: false,

  fetchingCommunicationAccess: false,
  fetchingCommunicationAccessError: false,
  communicationAccess: [],

  fetchingRequirementsDuration: false,
  fetchingRequirementsDurationError: false,
  requirementDuration: [],


  fetchingOpportunitiesDuration: false,
  fetchingOpportunitiesDurationError: false,
  opportunityDuration: [],

  deletingProductionStagesData: false,
   deletingProductionStagesDataError: false,

  fetchingPermissionAccess: false,
  fetchingPermissionAccessError: false,
  permissionAccess: [],

  addingSourcingAccess: false,
  addingSourcingAccessError: false,

  fetchingSourcingAccess: false,
  fetchingSourcingAccessError: false,
  sourcingAccess: [],

  addingProcessForOpportunity: false,
  addingProcessForOpportunityError: false,

  fetchingProcessForOpportunity: false,
  fetchingProcessForOpportunityError: false,
  opportunityProcess: [],


  addingSkillLevel:false,

  fetchingLeadAging: false,
  fetchingLeadAgingError: false,
  leadAging: [],
  addingLeadAging: false,
  addingLeadAgingError: false,

  addingNotificationConfig: false,
  addingNotificationConfigError:false,

  gettingNotificationConfig: false,
  gettingNotificationConfigError:false,
  notificationConfig:{},

  fetchingProcessForRepair: false,
  fetchingProcessForRepairError: false,
  repairProcess: [],

  creatingCurrencyConversion: false,
  creatingCurrencyConversionError: false,

  fetchingCurrencyConversion: false,
  fetchingCurrencyConversionError: false,
  conversionCurrencies:[]

};
export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_TASK_EDIT_PROCESS_MODAL:
      return { ...state, addEditProcessModal: action.payload };

    case types.HANDLE_TASK_MODAL:
      return { ...state, addTaskModal: action.payload };

    case types.HANDLE_PROCESS_MODAL:
      return { ...state, addProcessModal: action.payload };

    case types.HANDLE_TASK_DRAWER:
      return { ...state, addTaskDrawer: action.payload };

    case types.HANDLE_PROCESS_HIRING_MODAL:
      return { ...state, addProcessHiringModal: action.payload };
    case types.HANDLE_CANDIDATE_SEQUENCE_MODAL:
      return { ...state, candidateSequenceModal: action.payload };

    case types.HANDLE_RULES_MODAL:
      return { ...state, addRulesModal: action.payload };

    case types.HANDLE_PROCESS_TASK_MODAL:
      return { ...state, addProcessTaskModal: action.payload };

    case types.ADD_PROCESS_REQUEST:
      return { ...state, addingProcess: true, addingProcessError: false };
    case types.ADD_PROCESS_SUCCESS:
      return {
        ...state,
        addingProcess: false,
        addingProcessError: false,
        addProcessModal: false,
      };
    case types.ADD_PROCESS_FAILURE:
      return {
        ...state,
        addingProcess: false,
        addingProcessError: true,
        addProcessModal: false,
      };

    case types.GET_PROCESS_REQUEST:
      return { ...state, fetchingProcess: true, fetchingProcessError: false };
    case types.GET_PROCESS_SUCCESS:
      return {
        ...state,
        fetchingProcess: false,
        fetchingProcessError: false,
        Process: action.payload,
      };
    case types.GET_PROCESS_FAILURE:
      return { ...state, fetchingProcess: false, fetchingProcessError: true };

    case types.GET_ALL_PROCESS_STAGES_REQUEST:
      return {
        ...state,
        fetchingAllProcessStages: true,
        fetchingAllProcessStagesError: false,
      };
    case types.GET_ALL_PROCESS_STAGES_SUCCESS:
      return {
        ...state,
        fetchingAllProcessStages: false,
        fetchingAllProcessStagesError: false,
        allProcessStages: action.payload,
      };
    case types.GET_ALL_PROCESS_STAGES_FAILURE:
      return {
        ...state,
        fetchingAllProcessStages: false,
        fetchingAllProcessStagesError: true,
      };

    case types.GET_OPPO_STAGES_REQUEST:
      return {
        ...state,
        fetchingOppoStages: true,
        fetchingOppoStagesError: false,
      };
    case types.GET_OPPO_STAGES_SUCCESS:
      return {
        ...state,
        fetchingOppoStages: false,
        fetchingOppoStagesError: false,
        oppoStages: action.payload,
      };
    case types.GET_OPPO_STAGES_FAILURE:
      return {
        ...state,
        fetchingOppoStages: false,
        fetchingOppoStagesError: true,
      };

    case types.GET_DEFAULT_PROCESS_REQUEST:
      return {
        ...state,
        fetchingDefaultProcess: true,
        fetchingDefaultProcessError: false,
      };
    case types.GET_DEFAULT_PROCESS_SUCCESS:
      return {
        ...state,
        fetchingDefaultProcess: false,
        fetchingDefaultProcessError: false,
        defaultProcess: action.payload,
      };
    case types.GET_DEFAULT_PROCESS_FAILURE:
      return {
        ...state,
        fetchingDefaultProcess: false,
        fetchingDefaultProcessError: true,
      };

    case types.GET_PROCESS_STAGES_REQUEST:
      return {
        ...state,
        fetchingProcessStages: true,
        fetchingProcessStagesError: false,
      };
    case types.GET_PROCESS_STAGES_SUCCESS:
      return {
        ...state,
        fetchingProcessStages: false,
        fetchingProcessStagesError: false,
        ProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FAILURE:
      return {
        ...state,
        fetchingProcessStages: false,
        fetchingProcessStagesError: true,
      };
    case types.REMOVE_STAGE_REQUEST:
      return { ...state, removingStages: true };
    case types.REMOVE_STAGE_SUCCESS:
      return {
        ...state,
        removingStages: false,
        ProcessStages: state.ProcessStages.filter(
          (stage) => stage.stageId !== action.payload
        ),
      };
    case types.REMOVE_STAGE_FAILURE:
      return { ...state, removingStages: false, removingStagesError: true };

    case types.UPDATE_STAGE_REQUEST:
      return { ...state, updatingStages: true };
    case types.UPDATE_STAGE_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStages: false,
        ProcessStages: state.ProcessStages.map((state) =>
          state.stageId === action.payload.stageId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FAILURE:
      return { ...state, updatingStages: false, updatingStagesError: true };

    case types.UPDATE_PROCESS_NAME_REQUEST:
      return { ...state, updateProcessName: true };
    case types.UPDATE_PROCESS_NAME_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessName: false,
        Process: state.Process.map((state) =>
          state.processId === action.payload.processId ? action.payload : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FAILURE:
      return {
        ...state,
        updateProcessName: false,
        updateProcessNameError: true,
      };

    case types.UPDATE_REQUIREMENT_REQUEST:
      return { ...state, updateRequirement: true };
    case types.UPDATE_REQUIREMENT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateRequirement: false,
        // Process: state.Process.map((state) =>
        //   state.processId === action.payload.processId ? action.payload : state
        // ),
      };
    case types.UPDATE_REQUIREMENT_FAILURE:
      return {
        ...state,
        updateRequirement: false,
        updateRequirementError: true,
      };


    case types.UPDATE_OPPORTUNITIES_REQUEST:
      return { ...state, updateOpportunity: true };
    case types.UPDATE_OPPORTUNITIES_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateOpportunity: false,

      };
    case types.UPDATE_OPPORTUNITIES_FAILURE:
      return {
        ...state,
        updateOpportunity: false,
        updateOpportunityError: true,
      };


    case types.ADD_PROCESS_STAGE_REQUEST:
      return { ...state, addingProcessStages: true };
    case types.ADD_PROCESS_STAGE_SUCCESS:
      return {
        ...state,
        addingProcessStages: false,
        ProcessStages: [...state.ProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FAILURE:
      return {
        ...state,
        addingProcessStages: false,
        addingProcessStagesError: true,
      };

    case types.ADD_PROCESS_TASK_REQUEST:
      return {
        ...state,
        addingProcessTask: true,
        addingProcessTaskError: false,
      };
    case types.ADD_PROCESS_TASK_SUCCESS:
      return {
        ...state,
        addingProcessTask: false,
        addingProcessTaskError: false,
        addProcessTaskModal: false,
      };
    case types.ADD_PROCESS_TASK_FAILURE:
      return {
        ...state,
        addingProcessTask: false,
        addingProcessTaskError: true,
        addProcessTaskModal: false,
      };

    case types.GET_PROCESS_TASK_REQUEST:
      return {
        ...state,
        fetchingProcessTask: true,
        fetchingProcessTaskError: false,
      };
    case types.GET_PROCESS_TASK_SUCCESS:
      return {
        ...state,
        fetchingProcessTask: false,
        fetchingProcessTaskError: false,
        processTask: action.payload,
      };
    case types.GET_PROCESS_TASK_FAILURE:
      return {
        ...state,
        fetchingProcessTask: false,
        fetchingProcessTaskError: true,
      };

    /**
     * get the list of all departments
     */
    case types.GET_DEPARTMENTS_REQUEST:
      return { ...state, fetchingDepartments: true };
    case types.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        fetchingDepartments: false,
        departments: action.payload,
      };
    case types.GET_DEPARTMENTS_FAILURE:
      return {
        ...state,
        fetchingDepartments: false,
        fetchingDepartmentsError: true,
      };

    case types.GET_LEVELS_REQUEST:
      return { ...state, fetchingLevels: true };
    case types.GET_LEVELS_SUCCESS:
      return { ...state, fetchingLevels: false, levels: action.payload };
    case types.GET_LEVELS_FAILURE:
      return {
        ...state,
        fetchingLevels: false,
        fetchingLevelsError: true,
      };
    case types.UPDATE_TASK_BY_ID_REQUEST:
      return { ...state, updatingTask: true };
    case types.UPDATE_TASK_BY_ID_SUCCESS:
      return { ...state, updatingTask: false };
    case types.UPDATE_TASK_BY_ID_FAILURE:
      return { ...state, updatingTask: false, updatingTaskError: false };

    case types.UPDATE_TASK_RESUFFEL_BY_ID_REQUEST:
      return { ...state, updatingTaskResuffel: true };
    case types.UPDATE_TASK_RESUFFEL_BY_ID_SUCCESS:
      return { ...state, processTask: action.payload };
    case types.UPDATE_TASK_RESUFFEL_BY_ID_FAILURE:
      return {
        ...state,
        updatingTaskResuffel: false,
        updatingTaskResuffelError: false,
      };

    case types.DELETE_TASK_REQUEST:
      return { ...state, deleteTask: true };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        processTask: state.processTask.filter(
          (item) => item.taskId !== action.payload
        ),
      };
    case types.DELETE_TASK_FAILURE:
      return { ...state, deleteTask: false, deleteTaskError: false };

    case types.UPDATE_PROCESS_TASK_REQUEST:
      return { ...state, updatingProcessTask: true };
    case types.UPDATE_PROCESS_TASK_SUCCESS:
      //debugger
      return {
        ...state,
        updatingProcessTask: false,
        addEditProcessModal: false,
      };
    case types.UPDATE_PROCESS_TASK_FAILURE:
      return {
        ...state,
        updatingProcessTask: false,
        updatingProcessTaskError: false,
        addEditProcessModal: false,
      };

    case types.SET_TASK_EDIT:
      return { ...state, setEditingTask: action.payload };

    //recruitment

    case types.GET_PROCESS_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingProcessForRecruit: true,
        fetchingProcessForRecruitError: false,
      };
    case types.GET_PROCESS_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingProcessForRecruit: false,
        fetchingProcessForRecruitError: false,
        recruitProcess: action.payload,
      };
    case types.GET_PROCESS_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingProcessForRecruit: false,
        fetchingProcessForRecruitError: true,
      };

    case types.ADD_PROCESS_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        addingProcessForRecruit: true,
        addingProcessForRecruitError: false,
      };
    case types.ADD_PROCESS_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingProcessForRecruit: false,
        addingProcessForRecruitError: false,
        addProcessModal: false,
      };
    case types.ADD_PROCESS_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingProcessForRecruit: false,
        addingProcessForRecruitError: true,
        addProcessModal: false,
      };

    case types.GET_PROCESS_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingProcessStagesForRecruit: true,
        fetchingProcessStagesForRecruitError: false,
      };
    case types.GET_PROCESS_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingProcessStagesForRecruit: false,
        fetchingProcessStagesForRecruitError: false,
        recruitProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingProcessStagesForRecruit: false,
        fetchingProcessStagesForRecruitError: true,
      };

    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, addingProcessStagesForRecruit: true };
    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingProcessStagesForRecruit: false,
        recruitProcessStages: [...state.recruitProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingProcessStagesForRecruit: false,
        addingProcessStagesForRecruitError: true,
      };

    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_REQUEST:
      return { ...state, updateProcessNameForRecruit: true };
    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForRecruit: false,
        recruitProcess: state.recruitProcess.map((state) =>
          state.recruitmentProcessId === action.payload.recruitmentProcessId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updateProcessNameForRecruit: false,
        updateProcessNameForRecruitError: true,
      };




    case types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_REQUEST:
      return { ...state, updateProcessNameForOpportunity: true };
    case types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForOpportunity: false,
        // opportunityProcess: state.opportunityProcess.map((item) => {
        //   if (item.opportunityWorkflowDetailsId === action.payload.opportunityWorkflowDetailsId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
        opportunityProcess: state.opportunityProcess.map((state) =>
          state.opportunityWorkflowDetailsId === action.payload.opportunityWorkflowDetailsId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        updateProcessNameForOpportunity: false,
        updateProcessNameForOpportunityError: true,
      };

    case types.UPDATE_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, updatingStagesForRecruit: true };
    case types.UPDATE_STAGE_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStagesForRecruit: false,
        recruitProcessStages: state.recruitProcessStages.map((state) =>
          state.stageId === action.payload.stageId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updatingStagesForRecruit: false,
        updatingStagesForRecruitError: true,
      };

    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: true,
        fetchingAllProcessStagesForRecruitError: false,
      };
    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: false,
        fetchingAllProcessStagesForRecruitError: false,
        allProcessStagesForRecruit: action.payload,
      };
    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: false,
        fetchingAllProcessStagesForRecruitError: true,
      };
    //ADDING LEAVES
    case types.ADD_LEAVES_REQUEST:
      return {
        ...state,
        addingLeaves: true,
        addingLeavesError: false,
      };
    case types.ADD_LEAVES_SUCCESS:
      return {
        ...state,
        addingLeaves: false,
        addingLeavesError: false,
      };
    case types.ADD_LEAVES_FAILURE:
      return {
        ...state,
        addingLeaves: false,
        addingLeavesError: true,
      };
    //GET LEAVES DETAILS
    case types.GET_LEAVES_DETAIL_REQUEST:
      return {
        ...state,
        fetchingLeaveDetails: true,
        fetchingLeaveDetailsError: false,
      };
    case types.GET_LEAVES_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingLeaveDetails: false,
        fetchingLeaveDetailsError: false,
        leaveData: action.payload,
      };
    case types.GET_LEAVES_DETAIL_FAILURE:
      return {
        ...state,
        fetchingLeaveDetails: false,
        fetchingLeaveDetailsError: true,
      };

    case types.GET_SIGNATURE_REQUEST:
      return {
        ...state,
        fetchingSignatureInd: true,
        fetchingSignatureIndError: false,
      };
    case types.GET_SIGNATURE_SUCCESS:
      return {
        ...state,
        fetchingSignatureInd: false,
        fetchingSignatureIndError: false,
        signatureInd: action.payload,
      };
    case types.GET_SIGNATURE_FAILURE:
      return {
        ...state,
        fetchingSignatureInd: false,
        fetchingSignatureIndError: true,
      };
    case types.HANDLE_EMAIL_MODAL:
      return { ...state, addEmailModal: action.payload };
    case types.HANDLE_WEBSITE_MODAL:
      return { ...state, addWebsiteModal: action.payload };
    case types.HANDLE_UPDATE_EMAIL_MODAL:
      return { ...state, addUpdateEmailModal: action.payload };

    case types.SET_EMAIL_EDIT:
      return { ...state, setEditingEmail: action.payload };

    case types.DATA_CLEAR:
      return { ...state, recruitProcessStages: [] };

    case types.ENABLE_RECRUITMENT_ADVANCE_REQUEST:
      return { ...state, enabalingRecruitProAdvance: true };
    case types.ENABLE_RECRUITMENT_ADVANCE_SUCCESS:
      return {
        ...state,
        enabalingRecruitProAdvance: false,
      };
    case types.ENABLE_RECRUITMENT_ADVANCE_FAILURE:
      return {
        ...state,

        enabalingRecruitProAdvanceError: true,
      };

    //GET MILEAGE DETAILS
    case types.GET_MILEAGE_DETAIL_REQUEST:
      return {
        ...state,
        fetchingMileageDetails: true,
        fetchingMileageDetailsError: false,
      };
    case types.GET_MILEAGE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingMileageDetails: false,
        fetchingMileageDetailsError: false,
        mileageData: action.payload,
      };
    case types.GET_MILEAGE_DETAIL_FAILURE:
      return {
        ...state,
        fetchingMileageDetails: false,
        fetchingMileageDetailsError: true,
      };

    //update LEAVES
    case types.UPDATE_MILEAGE_REQUEST:
      return {
        ...state,
        updatingMileage: true,
        updatingMileageError: false,
      };
    case types.UPDATE_MILEAGE_SUCCESS:
      return {
        ...state,
        updatingMileage: false,
        updatingMileageError: false,
        // mileageData:[action.payload,...state.mileageData]

      };
    case types.UPDATE_MILEAGE_FAILURE:
      return {
        ...state,
        updatingMileage: false,
        updatingMileageError: true,
      };

    case types.HANDLE_APPROVAL_MODAL:
      return { ...state, addRecruitmentApprovalModal: action.payload };

    case types.ADD_APPROVAL_REQUEST:
      return {
        ...state,
        addingApproval: true,
      };
    case types.ADD_APPROVAL_SUCCESS:
      return {
        ...state,
        addingApproval: false,
      };
    case types.ADD_APPROVAL_FAILURE:
      return {
        ...state,
        addingApproval: false,
        addingApprovalError: true,
      };

    case types.GET_APPROVAL_DATA_REQUEST:
      return { ...state, fetchingApprovalData: true };
    case types.GET_APPROVAL_DATA_SUCCESS:
      return {
        ...state,
        fetchingApprovalData: false,
        aaprovalprocessData: action.payload,
      };
    case types.GET_APPROVAL_DATA_FAILURE:
      return {
        ...state,
        fetchingApprovalData: false,
        fetchingApprovalDataError: true,
      };

    case types.LINK_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingProcessPublish: true,
      };
    case types.LINK_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingProcessPublish: false,
        processPublish: state.processPublish.map((item) => {
          if (
            item.recruitmentProcessId === action.payload.recruitmentProcessId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingProcessPublish: false,
        linkingProcessPublishError: true,
      };



    case types.LINK_OPPORTUNITY_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingOpportunityProcessPublish: true,
      };
    case types.LINK_OPPORTUNITY_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingOpportunityProcessPublish: false,
        opportunityProcessPublish: state.opportunityProcessPublish.map((item) => {
          if (
            item.opportunityWorkflowDetailsId === action.payload.opportunityWorkflowDetailsId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_OPPORTUNITY_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingOpportunityProcessPublish: false,
        linkingOpportunityProcessPublishError: true,
      };

    case types.LINK_STAGES_PUBLISH_REQUEST:
      return {
        ...state,
        linkingStagesPublish: true,
      };
    case types.LINK_STAGES_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingStagesPublish: false,
        stagesPublish: state.stagesPublish.map((item) => {
          if (item.stageId === action.payload.stageId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_STAGES_PUBLISH_FAILURE:
      return {
        ...state,
        linkingStagesPublish: false,
        linkingStagesPublishError: true,
      };



    case types.LINK_OPPORTUNITY_STAGES_PUBLISH_REQUEST:
      return {
        ...state,
        linkingOpportunityStagesPublish: true,
      };
    case types.LINK_OPPORTUNITY_STAGES_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingOpportunityStagesPublish: false,
        opportunityStagesPublish: state.opportunityStagesPublish.map((item) => {
          if (item.opportunityStagesId === action.payload.opportunityStagesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_OPPORTUNITY_STAGES_PUBLISH_FAILURE:
      return {
        ...state,
        linkingOpportunityStagesPublish: false,
        linkingOpportunityStagesPublishError: true,
      };

    // COMMISSION
    case types.ADD_COMMISSION_REQUEST:
      return {
        ...state,
        addingCommission: true,
      };
    case types.ADD_COMMISSION_SUCCESS:
      return {
        ...state,
        addingCommission: false,
      };
    case types.ADD_COMMISSION_FAILURE:
      return {
        ...state,
        addingCommission: false,
        addingCommissionError: true,
      };

    case types.GET_COMMISSION_REQUEST:
      return { ...state, fetchingCommission: true };
    case types.GET_COMMISSION_SUCCESS:
      return {
        ...state,
        fetchingCommission: false,
        commissionData: action.payload,
      };
    case types.GET_COMMISSION_FAILURE:
      return {
        ...state,
        fetchingCommission: false,
        fetchingCommissionError: true,
      };
    //get commission table
    case types.GET_COMMISSION_TABLE_REQUEST:
      return { ...state, fetchingCommissionTable: true };
    case types.GET_COMMISSION_TABLE_SUCCESS:
      return {
        ...state,
        fetchingCommissionTable: false,
        tableCommission: action.payload,
      };
    case types.GET_COMMISSION_TABLE_FAILURE:
      return {
        ...state,
        fetchingCommissionTable: false,
        fetchingCommissionTableError: true,
      };

    case types.UPDATE_COMMISSION_REQUEST:
      return { ...state, updatingCommission: true };
    case types.UPDATE_COMMISSION_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingCommission: false,
        commissionData: state.commissionData.map((state) =>
          state.processId === action.payload.processId ? action.payload : state
        ),
      };
    case types.UPDATE_COMMISSION_FAILURE:
      return {
        ...state,
        updatingCommission: false,
        updatingCommissionError: true,
      };

    case types.SET_EDIT_COMMISSION:
      return { ...state, setEditingCommission: action.payload };

    case types.HANDLE_COMMISSION_MODAL:
      return { ...state, commissionUpdateModal: action.payload };

    // RECRUITER
    case types.ADD_RECRUITER_REQUEST:
      return {
        ...state,
        addingRecruiter: true,
      };
    case types.ADD_RECRUITER_SUCCESS:
      return {
        ...state,
        addingRecruiter: false,
      };
    case types.ADD_RECRUITER_FAILURE:
      return {
        ...state,
        addingRecruiter: false,
        addingRecruiterError: true,
      };

    case types.GET_RECRUITER_REQUEST:
      return { ...state, fetchingRecruiter: true };
    case types.GET_RECRUITER_SUCCESS:
      return {
        ...state,
        fetchingRecruiter: false,
        recruiterData: action.payload,
      };
    case types.GET_RECRUITER_FAILURE:
      return {
        ...state,
        fetchingRecruiter: false,
        fetchingRecruiterError: true,
      };

    //get RECRUITER table
    case types.GET_RECRUITER_TABLE_REQUEST:
      return { ...state, fetchingRecruiterTable: true };
    case types.GET_RECRUITER_TABLE_SUCCESS:
      return {
        ...state,
        fetchingRecruiterTable: false,
        tableRecruiter: action.payload,
      };
    case types.GET_RECRUITER_TABLE_FAILURE:
      return {
        ...state,
        fetchingRecruiterTable: false,
        fetchingRecruiterTableError: true,
      };
    //ADD WEBSITE DETAILS

    case types.ADD_WEBSITE_REQUEST:
      return { ...state, addingWebsite: true };
    case types.ADD_WEBSITE_SUCCESS:
      return {
        ...state,
        addingWebsite: false,
      };
    case types.ADD_WEBSITE_FAILURE:
      return {
        ...state,
        addingWebsite: false,
        addingWebsiteError: true,
      };
    //GET WEBSITE DETAILS
    case types.GET_WEBSITE_REQUEST:
      return { ...state, fetchingWebsite: true };
    case types.GET_WEBSITE_SUCCESS:
      return {
        ...state,
        fetchingWebsite: false,
        website: action.payload,
      };
    case types.GET_WEBSITE_FAILURE:
      return {
        ...state,
        fetchingWebsite: false,
        fetchingWebsiteError: true,
      };

    //GET SCHEDULER
    case types.GET_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, fetchingScheduler: true };
    case types.GET_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        fetchingScheduler: false,
        scheduler: action.payload,
      };
    case types.GET_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        fetchingScheduler: false,
        fetchingSchedulerError: true,
      };

    //ADD SCHEDULER
    case types.ADD_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, addingScheduler: true };
    case types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        addingScheduler: false,
      };
    case types.ADD_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        addingScheduler: false,
        addingSchedulerError: false,
      };
    //GET SCHEDULER CUSTOMER
    case types.GET_SCHEDULER_CUSTOMER_REQUEST:
      return { ...state, fetchingCustomer: true };
    case types.GET_SCHEDULER_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingCustomer: false,
        customer: action.payload,
      };
    case types.GET_SCHEDULER_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingCustomer: false,
        fetchingCustomerError: true,
      };

    //ADD SCHEDULER CUSTOMER
    case types.ADD_SCHEDULER_CUSTOMER_REQUEST:
      return { ...state, addingCustomer: true };
    case types.ADD_SCHEDULER_CUSTOMER_SUCCESS:
      return {
        ...state,
        addingCustomer: false,
      };
    case types.ADD_SCHEDULER_CUSTOMER_FAILURE:
      return {
        ...state,
        addingCustomer: false,
        addingCustomerError: false,
      };
    //GET SCHEDULER VENDOR
    case types.GET_SCHEDULER_VENDOR_REQUEST:
      return { ...state, fetchingVendor: true };
    case types.GET_SCHEDULER_VENDOR_SUCCESS:
      return {
        ...state,
        fetchingVendor: false,
        vendor: action.payload,
      };
    case types.GET_SCHEDULER_VENDOR_FAILURE:
      return {
        ...state,
        fetchingVendor: false,
        fetchingVendorError: true,
      };

    //ADD SCHEDULER VENDOR
    case types.ADD_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, addingVendor: true };
    case types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        addingVendor: false,
      };
    case types.ADD_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        addingVendor: false,
        addingVendorError: false,
      };

    case types.ADDING_THIRD_PARTY_ACCESS_REQUEST:
      return { ...state, addingThirdPartyAccess: true };
    case types.ADDING_THIRD_PARTY_ACCESS_SUCCESS:
      return {
        ...state,
        addingThirdPartyAccess: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_THIRD_PARTY_ACCESS_FAILURE:
      return {
        ...state,
        addingThirdPartyAccess: false,
        addingThirdPartyAccessError: true,
      };

    case types.GET_THIRD_PARTY_ACCESS_REQUEST:
      return { ...state, fetchingThirdPartyAccess: true };
    case types.GET_THIRD_PARTY_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyAccess: false,
        thirdPartyAccess: action.payload,
      };
    case types.GET_THIRD_PARTY_ACCESS_FAILURE:
      return {
        ...state,
        fetchingThirdPartyAccess: false,
        fetchingThirdPartyAccessError: false,
      };

    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_REQUEST:
      return { ...state, addingThirdPartyVendorAccess: true };
    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_SUCCESS:
      return {
        ...state,
        addingThirdPartyVendorAccess: false,
      };
    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_FAILURE:
      return {
        ...state,
        addingThirdPartyVendorAccess: false,
        addingThirdPartyVendorAccessError: true,
      };

    case types.GET_THIRD_PARTY_VENDOR_ACCESS_REQUEST:
      return { ...state, fetchingThirdPartyVendorAccess: true };
    case types.GET_THIRD_PARTY_VENDOR_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyVendorAccess: false,
        thirdPartyVendorAccess: action.payload,
      };
    case types.GET_THIRD_PARTY_VENDOR_ACCESS_FAILURE:
      return {
        ...state,
        fetchingThirdPartyVendorAccess: false,
        fetchingThirdPartyVendorAccessError: false,
      };

    //post

    case types.ADDING_DEPARTMENT_ACCESS_REQUEST:
      return { ...state, addingDepartmentAccess: true };
    case types.ADDING_DEPARTMENT_ACCESS_SUCCESS:
      return {
        ...state,
        addingDepartmentAccess: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_DEPARTMENT_ACCESS_FAILURE:
      return {
        ...state,
        addingDepartmentAccess: false,
        addingDepartmentAccessError: true,
      };

    //get
    case types.GET_DEPARTMENT_ACCESS_REQUEST:
      return { ...state, fetchingDepartmentAccess: true };
    case types.GET_DEPARTMENT_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingDepartmentAccess: false,
        departmentAcces: action.payload,
      };
    case types.GET_DEPARTMENT_ACCESS_FAILURE:
      return {
        ...state,
        fetchingDepartmentAccess: false,
        fetchingDepartmentAccessError: true,
      };

    //get
    case types.GET_DEPARTMENT_LIST_REQUEST:
      return { ...state, fetchingDepartmentList: true };
    case types.GET_DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        fetchingDepartmentList: false,
        departmentList: action.payload,
      };
    case types.GET_DEPARTMENT_LIST_FAILURE:
      return {
        ...state,
        fetchingDepartmentList: false,
        fetchingDepartmentListError: true,
      };

    case types.GET_THIRD_PARTY_MONETIZE_REQUEST:
      return { ...state, fetchingThirdPartyMonetize: true };
    case types.GET_THIRD_PARTY_MONETIZE_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyMonetize: false,
        thirdPartyMonetize: action.payload,
      };
    case types.GET_THIRD_PARTY_MONETIZE_FAILURE:
      return {
        ...state,
        fetchingThirdPartyMonetize: false,
        fetchingThirdPartyMonetizeError: false,
      };

    case types.ADDING_COMPLIANCE_GDPR_REQUEST:
      return { ...state, addingComplianceGdpr: true };
    case types.ADDING_COMPLIANCE_GDPR_SUCCESS:
      return {
        ...state,
        addingComplianceGdpr: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_COMPLIANCE_GDPR_FAILURE:
      return {
        ...state,
        addingComplianceGdpr: false,
        addingComplianceGdprError: true,
      };

    case types.GET_COMPLIANCE_GDPR_REQUEST:
      return { ...state, fetchingComplianceGdpr: true };
    case types.GET_COMPLIANCE_GDPR_SUCCESS:
      return {
        ...state,
        fetchingComplianceGdpr: false,
        gdprCompliance: action.payload,
      };
    case types.GET_COMPLIANCE_GDPR_FAILURE:
      return {
        ...state,
        fetchingComplianceGdpr: false,
        fetchingComplianceGdprError: false,
      };



    case types.GET_ASSESSMENT_ACCESS_REQUEST:
      return { ...state, fetchingAssessmentAccess: true };
    case types.GET_ASSESSMENT_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingAssessmentAccess: false,
        assessmentAccess: action.payload,
      };
    case types.GET_ASSESSMENT_ACCESS_FAILURE:
      return {
        ...state,
        fetchingAssessmentAccess: false,
        fetchingAssessmentAccessError: false,
      };

    case types.ADDING_UP_WORK_ACCESS_REQUEST:
      return { ...state, addingUpWorkAccess: true };
    case types.ADDING_UP_WORK_ACCESS_SUCCESS:
      return {
        ...state,
        addingUpWorkAccess: false,
      };
    case types.ADDING_UP_WORK_ACCESS_FAILURE:
      return {
        ...state,
        addingUpWorkAccess: false,
        addingUpWorkAccessError: true,
      };

    case types.GET_UP_WORK_ACCESS_REQUEST:
      return { ...state, fetchingUpWorkAccess: true };
    case types.GET_UP_WORK_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingUpWorkAccess: false,
        upWorkAccess: action.payload,
      };
    case types.GET_UP_WORK_ACCESS_FAILURE:
      return {
        ...state,
        fetchingUpWorkAccess: false,
        fetchingUpWorkAccessError: false,
      };

    case types.ADDING_COMMUNICATION_ACCESS_REQUEST:
      return { ...state, addingCommunicationAccess: true };
    case types.ADDING_COMMUNICATION_ACCESS_SUCCESS:
      return {
        ...state,
        addingCommunicationAccess: false,
      };
    case types.ADDING_COMMUNICATION_ACCESS_FAILURE:
      return {
        ...state,
        addingCommunicationAccess: false,
        addingCommunicationAccessError: true,
      };

    case types.GET_COMMUNICATION_ACCESS_REQUEST:
      return { ...state, fetchingCommunicationAccess: true };
    case types.GET_COMMUNICATION_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingCommunicationAccess: false,
        communicationAccess: action.payload,
      };
    case types.GET_COMMUNICATION_ACCESS_FAILURE:
      return {
        ...state,
        fetchingCommunicationAccess: false,
        fetchingCommunicationAccessError: false,
      };

    case types.ADDING_SOURCING_ACCESS_REQUEST:
      return { ...state, addingSourcingAccess: true };
    case types.ADDING_SOURCING_ACCESS_SUCCESS:
      return {
        ...state,
        addingSourcingAccess: false,
      };
    case types.ADDING_SOURCING_ACCESS_FAILURE:
      return {
        ...state,
        addingSourcingAccess: false,
        addingSourcingAccessError: true,
      };

    case types.GET_SOURCING_ACCESS_REQUEST:
      return { ...state, fetchingSourcingAccess: true };
    case types.GET_SOURCING_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingSourcingAccess: false,
        sourcingAccess: action.payload,
      };
    case types.GET_SOURCING_ACCESS_FAILURE:
      return {
        ...state,
        fetchingSourcingAccess: false,
        fetchingSourcingAccessError: false,
      };
    case types.HANDLE_SEQUENCE_MODAL:
      return { ...state, addSequenceModal: action.payload };

    case types.ADDING_PERMISSION_ACCESS_REQUEST:
      return { ...state, addingPermissionAccess: true };
    case types.ADDING_PERMISSION_ACCESS_SUCCESS:
      return {
        ...state,
        addingPermissionAccess: false,
      };
    case types.ADDING_PERMISSION_ACCESS_FAILURE:
      return {
        ...state,
        addingPermissionAccess: false,
        addingPermissionAccessError: true,
      };

    case types.GET_PERMISSION_ACCESS_REQUEST:
      return { ...state, fetchingPermissionAccess: true };
    case types.GET_PERMISSION_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingPermissionAccess: false,
        permissionAccess: action.payload,
      };
    case types.GET_PERMISSION_ACCESS_FAILURE:
      return {
        ...state,
        fetchingPermissionAccess: false,
        fetchingPermissionAccessError: false,
      };

    case types.ADD_PARTNER_REQUEST:
      return { ...state, addingPartner: true };
    case types.ADD_PARTNER_SUCCESS:
      return {
        ...state,
        addingPartner: false,
      };
    case types.ADD_PARTNER_FAILURE:
      return {
        ...state,
        addingPartner: false,
        addingPartnerError: true,
      };

    case types.GET_PARTNER_REQUEST:
      return { ...state, fetchingPartner: true };
    case types.GET_PARTNER_SUCCESS:
      return {
        ...state,
        fetchingPartner: false,
        partner: action.payload,
      };
    case types.GET_PARTNER_FAILURE:
      return {
        ...state,
        fetchingPartner: false,
        fetchingPartnerError: true,
      };

    case types.ADD_SEQUENCE_REQUEST:
      return { ...state, addingSequence: true };
    case types.ADD_SEQUENCE_SUCCESS:
      return { ...state, addingSequence: false, addSequenceModal: false };
    case types.ADD_SEQUENCE_FAILURE:
      return {
        ...state,
        addingSequence: false,
        addSequenceModal: false,
        sequence: [action.payload, ...state.sequence]
      };

    case types.GET_SEQUENCE_REQUEST:
      return { ...state, fetchingSequence: true };
    case types.GET_SEQUENCE_SUCCESS:
      return {
        ...state,
        fetchingSequence: false,
        sequence: action.payload,
      };
    case types.GET_SEQUENCE_FAILURE:
      return {
        ...state,
        fetchingSequence: false,
        fetchingSequenceError: true,
      };

    case types.ADD_MONSTER_REQUEST:
      return { ...state, addingMonster: true };
    case types.ADD_MONSTER_SUCCESS:
      return {
        ...state,
        addingMonster: false,
      };
    case types.ADD_MONSTER_FAILURE:
      return {
        ...state,
        addingMonster: false,
        addingMonsterError: true,
      };

    case types.GET_MONSTER_REQUEST:
      return { ...state, fetchingMonster: true };
    case types.GET_MONSTER_SUCCESS:
      return {
        ...state,
        fetchingMonster: false,
        monster: action.payload,
      };
    case types.GET_MONSTER_FAILURE:
      return {
        ...state,
        fetchingMonster: false,
        fetchingMonsterError: true,
      };

    case types.GET_SEQUENCE_DETAIL_REQUEST:
      return { ...state, fetchingSequenceDetail: true };
    case types.GET_SEQUENCE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingSequenceDetail: false,
        sequenceDetail: action.payload,
      };
    case types.GET_SEQUENCE_DETAIL_FAILURE:
      return {
        ...state,
        fetchingSequenceDetail: false,
        fetchingSequenceDetailError: true,
      };
    case types.GET_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingNotifications: true };
    case types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingNotifications: false,
        notifications: action.payload,
      };
    case types.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingNotifications: false,
        fetchingNotificationsError: false,
      };


    case types.ADDING_NOTIFICATIONS_REQUEST:
      return { ...state, addingNotifications: true };
    case types.ADDING_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        addingNotifications: false,
        notifications: state.notifications.map((item) => {
          if (item.notificationRuleId
            === action.payload.notificationRuleId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADDING_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        addingNotifications: false,
        addingNotificationsError: true,
      };

    case types.GET_REQUIREMENTS_DURATION_REQUEST:
      return { ...state, fetchingRequirementsDuration: true };
    case types.GET_REQUIREMENTS_DURATION_SUCCESS:
      return {
        ...state,
        fetchingRequirementsDuration: false,
        requirementDuration: action.payload,
      };
    case types.GET_REQUIREMENTS_DURATION_FAILURE:
      return {
        ...state,
        fetchingRequirementsDuration: false,
        fetchingRequirementsDurationError: false,
      };

    case types.GET_OPPORTUNITIES_DURATION_REQUEST:
      return { ...state, fetchingOpportunitiesDuration: true };
    case types.GET_OPPORTUNITIES_DURATION_SUCCESS:
      return {
        ...state,
        fetchingOpportunitiesDuration: false,
        opportunityDuration: action.payload,
      };
    case types.GET_OPPORTUNITIES_DURATION_FAILURE:
      return {
        ...state,
        fetchingOpportunitiesDuration: false,
        fetchingOpportunitiesDurationError: false,
      };

    case types.ADDING_NOTIFICATION_ACCESS_REQUEST:
      return { ...state, addingNotificationAccess: true };
    case types.ADDING_NOTIFICATION_ACCESS_SUCCESS:
      return {
        ...state,
        addingNotificationAccess: false,
      };
    case types.ADDING_NOTIFICATION_ACCESS_FAILURE:
      return {
        ...state,
        addingNotificationAccess: false,
        addingNotificationAccessError: true,
      };

    case types.GET_NOTIFICATION_ACCESS_REQUEST:
      return { ...state, fetchingNotificationAccess: true };
    case types.GET_NOTIFICATION_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingNotificationAccess: false,
        notificationAcces: action.payload,
      };
    case types.GET_NOTIFICATION_ACCESS_FAILURE:
      return {
        ...state,
        fetchingNotificationAccess: false,
        fetchingNotificationAccessError: true,
      };

    case types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_REQUEST:
      return { ...state, deleteReportSchedulerInternalData: true };
    case types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_SUCCESS:
      return {
        ...state,
        deleteReportSchedulerInternalData: false,
        scheduler: state.scheduler.filter(
          (item) => item.reportSchedulingId !== action.payload
        ),
      };
    case types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_FAILURE:
      return { ...state, deleteReportSchedulerInternalData: false, deleteReportSchedulerInternalDataError: false };


    case types.DELETE_SEQUENCE_DATA_REQUEST:
      return { ...state, deletingSequenceData: true };
    case types.DELETE_SEQUENCE_DATA_SUCCESS:
      return {
        ...state,
        deletingSequenceData: false,
        sequence: state.sequence.filter(
          (item) => item.sequenceId !== action.payload
        ),
      };
    case types.DELETE_SEQUENCE_DATA_FAILURE:
      return { ...state, deletingSequenceData: false, deletingSequenceDataError: false };


    case types.ADD_PROCESS_FOR_OPPORTUNITY_REQUEST:
      return {
        ...state,
        addingProcessForOpportunity: true,
        addingProcessForOpportunityError: false,
      };
    case types.ADD_PROCESS_FOR_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingProcessForOpportunity: false,
        addingProcessForOpportunityError: false,
        addProcessHiringModal: false,
      };
    case types.ADD_PROCESS_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingProcessForOpportunity: false,
        addingProcessForOpportunityError: true,
        addProcessHiringModal: false,
      };


    case types.GET_PROCESS_FOR_OPPORTUNITY_REQUEST:
      return {
        ...state,
        fetchingProcessForOpportunity: true,
        fetchingProcessForOpportunityError: false,
      };
    case types.GET_PROCESS_FOR_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingProcessForOpportunity: false,
        fetchingProcessForOpportunityError: false,
        opportunityProcess: action.payload,
      };
    case types.GET_PROCESS_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingProcessForOpportunity: false,
        fetchingProcessForOpportunityError: true,
      };


    case types.DELETE_WORKFLOW_DATA_REQUEST:
      return { ...state, deleteWorkflowData: true };
    case types.DELETE_WORKFLOW_DATA_SUCCESS:
      return {
        ...state,
        deleteWorkflowData: false,
        recruitProcess: state.recruitProcess.filter(
          (item) => item.recruitmentProcessId !== action.payload
        ),
      };
    case types.DELETE_WORKFLOW_DATA_FAILURE:
      return { ...state, deleteWorkflowData: false, deleteWorkflowDataError: false };

    case types.UPDATE_SEQUENCE_TABLE_DATA_REQUEST:
      return { ...state, updatingSequenceDetails: true };
    case types.UPDATE_SEQUENCE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        updatingSequenceDetails: false,
        updateCandidateEmploymentModal: false,
        sequence: state.sequence.map((item) => {
          if (item.sequenceId === action.payload.sequenceId) {
            return action.payload;
          } else {
            return item;
          }
        }),

      };
    case types.UPDATE_SEQUENCE_TABLE_DATA_FAILURE:
      return {
        ...state,
        updatingSequenceDetails: false,
        updatingSequenceDetailsError: true,
      };




      case types.ADD_SKILL_LEVEL_REQUEST:
      return { ...state, addingSkillLevel: true };
    case types.ADD_SKILL_LEVEL_SUCCESS:
      return { ...state, 
        addingSkillLevel: false, 
       
    
      };
    case types.ADD_SKILL_LEVEL_FAILURE:
      return { ...state, addingSkillLevel: false, 
       
      };


      case types.GET_MATRIX_DATA_REQUEST:
        return { ...state, fetchingMatrixData: true };
      case types.GET_MATRIX_DATA_SUCCESS:
        return { ...state, fetchingMatrixData: false, matrixData: action.payload };
      case types.GET_MATRIX_DATA_FAILURE:
        return { ...state, fetchingMatrixData: false, fetchingMatrixDataError: true };


    case types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_REQUEST:
      return { ...state, addingProcessStagesForOpportunity: true };
    case types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingProcessStagesForOpportunity: false,
        opportunityProcessStages: [...state.opportunityProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingProcessStagesForOpportunity: false,
        addingProcessStagesForOpportunityError: true,
      };

    case types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_REQUEST:
      return {
        ...state,
        fetchingProcessStagesForOpportunity: true,
        fetchingProcessStagesForOpportunityError: false,
      };
    case types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingProcessStagesForOpportunity: false,
        fetchingProcessStagesForOpportunityError: false,
        opportunityProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingProcessStagesForOpportunity: false,
        fetchingProcessStagesForOpportunityError: true,
      };

    case types.DELETE_OPPORTUNITY_PROCESS_DATA_REQUEST:
      return { ...state, deleteOpportunityProcessData: true };
    case types.DELETE_OPPORTUNITY_PROCESS_DATA_SUCCESS:
      return {
        ...state,
        deleteOpportunityProcessData: false,
        opportunityProcess: state.opportunityProcess.filter(
          (item) => item.opportunityWorkflowDetailsId !== action.payload
        ),
      };
    case types.DELETE_OPPORTUNITY_PROCESS_DATA_FAILURE:
      return { ...state, deleteOpportunityProcessData: false, deleteOpportunityProcessDataError: false };



    case types.ADDING_ASSESSMENT_ACCESS_REQUEST:
      return { ...state, addingAssessmentAccess: true };
    case types.ADDING_ASSESSMENT_ACCESS_SUCCESS:
      return {
        ...state,
        addingAssessmentAccess: false,

      };
    case types.ADDING_ASSESSMENT_ACCESS_FAILURE:
      return {
        ...state,
        addingAssessmentAccess: false,
        addingAssessmentAccessError: true,
      };



    case types.ADDING_REMOTE_ACCESS_REQUEST:
      return { ...state, addingRemoteAccess: true };
    case types.ADDING_REMOTE_ACCESS_SUCCESS:
      return {
        ...state,
        addingRemoteAccess: false,

      };
    case types.ADDING_REMOTE_ACCESS_FAILURE:
      return {
        ...state,
        addingRemoteAccess: false,
        addingRemoteAccessError: true,
      };


    case types.GET_REMOTE_ACCESS_REQUEST:
      return { ...state, fetchingRemoteAccess: true };
    case types.GET_REMOTE_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingRemoteAccess: false,
        remoteAccess: action.payload,
      };
    case types.GET_REMOTE_ACCESS_FAILURE:
      return {
        ...state,
        fetchingRemoteAccess: false,
        fetchingRemoteAccessError: false,
      };

    case types.UPDATE_STAGE_FOR_OPPORTUNITY_REQUEST:
      return { ...state, updatingStagesForOpportunity: true };
    case types.UPDATE_STAGE_FOR_OPPORTUNITY_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStagesForOpportunity: false,
        opportunityProcessStages: state.opportunityProcessStages.map((state) =>
          state.opportunityStagesId === action.payload.opportunityStagesId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        updatingStagesForOpportunity: false,
        updatingStagesForOpportunityError: true,
      };


    case types.DELETE_HIRING_STAGES_DATA_REQUEST:
      return { ...state, deletingHiringStagesData: true };
    case types.DELETE_HIRING_STAGES_DATA_SUCCESS:
      return {
        ...state,
        deletingHiringStagesData: false,
        recruitProcessStages: state.recruitProcessStages.filter(
          (item) => item.stageId !== action.payload
        ),
      };
    case types.DELETE_HIRING_STAGES_DATA_FAILURE:
      return { ...state, deletingHiringStagesData: false, deletingHiringStagesDataError: false };


    case types.DELETE_OPPORTUNITY_STAGES_DATA_REQUEST:
      return { ...state, deletingOpportunityStagesData: true };
    case types.DELETE_OPPORTUNITY_STAGES_DATA_SUCCESS:
      return {
        ...state,
        deletingOpportunityStagesData: false,
        opportunityProcessStages: state.opportunityProcessStages.filter(
          (item) => item.opportunityStagesId !== action.payload
        ),
      };
    case types.DELETE_OPPORTUNITY_STAGES_DATA_FAILURE:
      return { ...state, deletingOpportunityStagesData: false, deletingOpportunityStagesDataError: false };

    case types.HANDLE_RECRUITMENT_DRAWER_MODAL:
      return { ...state, addDrawerRecruitmentModal: action.payload };



    case types.UPDATE_SEQUENCE_REQUEST:
      return { ...state, udatingSequence: true };
    case types.UPDATE_SEQUENCE_SUCCESS:
      return {
        ...state,
        udatingSequence: false,
        candidateSequenceModal: false,

      };
    case types.UPDATE_SEQUENCE_FAILURE:
      return {
        ...state,
        udatingSequence: false,
        udatingSequenceError: true,
        // candidateSequenceModal:false,
      };




    case types.ADDING_WEEKEND_ACCESS_REQUEST:
      return { ...state, addingWeekendAccess: true };
    case types.ADDING_WEEKEND_ACCESS_SUCCESS:
      return {
        ...state,
        addingWeekendAccess: false,

      };
    case types.ADDING_WEEKEND_ACCESS_FAILURE:
      return {
        ...state,
        addingWeekendAccess: false,
        addingWeekendAccessError: true,
      };



    case types.GET_WEEKEND_ACCESS_REQUEST:
      return { ...state, fetchingWeekendAccess: true };
    case types.GET_WEEKEND_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingWeekendAccess: false,
        weekendAccess: action.payload,
      };
    case types.GET_WEEKEND_ACCESS_FAILURE:
      return {
        ...state,
        fetchingWeekendAccess: false,
        fetchingWeekendAccessError: false,
      };

    case types.ADD_TASK_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        addingTaskForRecruit: true,
        addingTaskForRecruitError: false,
      };
    case types.ADD_TASK_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingTaskForRecruit: false,
        addingTaskForRecruitError: false,
        addTaskDrawer: false,
      };
    case types.ADD_TASK_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingTaskForRecruit: false,
        addingTaskForRecruitError: true,
        addTaskDrawer: false,
      };


    case types.GET_TASK_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingTaskForRecruit: true,
        fetchingTaskForRecruitError: false,
      };
    case types.GET_TASK_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingTaskForRecruit: false,
        fetchingTaskForRecruitError: false,
        recruitTask: action.payload,

      };
    case types.GET_TASK_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingTaskForRecruit: false,
        fetchingTaskForRecruitError: true,
      };


    case types.UPDATE_TASK_NAME_FOR_RECRUIT_REQUEST:
      return { ...state, updateTaskNameForRecruit: true };
    case types.UPDATE_TASK_NAME_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateTaskNameForRecruit: false,
        recruitTask: state.recruitTask.map((state) =>
          state.taskChecklistId === action.payload.taskChecklistId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_TASK_NAME_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updateTaskNameForRecruit: false,
        updateTaskNameForRecruitError: true,
      };


    case types.ADD_TASK_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, addingTaskStagesForRecruit: true };
    case types.ADD_TASK_STAGE_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingTaskStagesForRecruit: false,
        recruitTaskStages: [...state.recruitTaskStages, action.payload],
      };
    case types.ADD_TASK_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingTaskStagesForRecruit: false,
        addingTaskStagesForRecruitError: true,
      };


    case types.GET_TASK_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingTaskStagesForRecruit: true,
        fetchingTaskStagesForRecruitError: false,
      };
    case types.GET_TASK_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingTaskStagesForRecruit: false,
        fetchingTaskStagesForRecruitError: false,
        recruitTaskStages: action.payload,
      };
    case types.GET_TASK_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingTaskStagesForRecruit: false,
        fetchingTaskStagesForRecruitError: true,
      };

    case types.DELETE_TASK_DATA_REQUEST:
      return { ...state, deleteTaskData: true };
    case types.DELETE_TASK_DATA_SUCCESS:
      return {
        ...state,
        deleteTaskData: false,
        recruitTask: state.recruitTask.filter(
          (item) => item.taskChecklistId !== action.payload
        ),
      };
    case types.DELETE_TASK_DATA_FAILURE:
      return { ...state, deleteTaskData: false, deleteTaskDataError: false };


    case types.DELETE_TASK_STAGES_DATA_REQUEST:
      return { ...state, deletingTaskStagesData: true };
    case types.DELETE_TASK_STAGES_DATA_SUCCESS:
      return {
        ...state,
        deletingTaskStagesData: false,
        recruitTaskStages: state.recruitTaskStages.filter(
          (item) => item.taskChecklistStagelinkId !== action.payload
        ),
      };
    case types.DELETE_TASK_STAGES_DATA_FAILURE:
      return { ...state, deletingTaskStagesData: false, deletingTaskStagesDataError: false };

    case types.UPDATE_TASK_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, updatingTaskStagesForRecruit: true };
    case types.UPDATE_TASK_STAGE_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingTaskStagesForRecruit: false,
        recruitTaskStages: state.recruitTaskStages.map((state) =>
          state.taskChecklistStagelinkId === action.payload.taskChecklistStagelinkId ? action.payload : state
        ),
      };
    case types.UPDATE_TASK_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updatingTaskStagesForRecruit: false,
        updatingTaskStagesForRecruitError: true,
      };


    case types.ADD_APPROVE_REQUEST:
      return {
        ...state,
        addingApprove: true,
      };
    case types.ADD_APPROVE_SUCCESS:
      return {
        ...state,
        addingApprove: false,
      };
    case types.ADD_APPROVE_FAILURE:
      return {
        ...state,
        addingApprove: false,
        addingApproveError: true,
      };

    case types.GET_APPROVE_DATA_REQUEST:
      return { ...state, fetchingApproveData: true };
    case types.GET_APPROVE_DATA_SUCCESS:
      return {
        ...state,
        fetchingApproveData: false,
        approvalData: action.payload,
      };
    case types.GET_APPROVE_DATA_FAILURE:
      return {
        ...state,
        fetchingApproveData: false,
        fetchingApproveDataError: true,
      };

    case types.GET_DEPARTMENT_ROLE_DATA_REQUEST:
      return { ...state, fetchingDepartmentRoleData: true };
    case types.GET_DEPARTMENT_ROLE_DATA_SUCCESS:
      return {
        ...state,
        fetchingDepartmentRoleData: false,
        departmentRoleData: action.payload,



      };
    case types.GET_DEPARTMENT_ROLE_DATA_FAILURE:
      return {
        ...state,
        fetchingDepartmentRoleData: false,
        fetchingDepartmentRoleDataError: true,
      };

    case types.GET_TASK_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingTaskForStages: true,
        fetchingTaskForStagesError: false,
      };
    case types.GET_TASK_FOR_STAGES_SUCCESS:
      return {
        ...state,
        fetchingTaskForStages: false,
        fetchingTaskForStagesError: false,
        stagesTask: action.payload,

      };
    case types.GET_TASK_FOR_STAGES_FAILURE:
      return {
        ...state,
        fetchingTaskForStages: false,
        fetchingTaskForStagesError: true,
      };


    case types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingWorkflowTaskStagesForRecruit: true,
        fetchingWorkflowTaskStagesForRecruitError: false,
      };
    case types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingWorkflowTaskStagesForRecruit: false,
        fetchingWorkflowTaskStagesForRecruitError: false,
        recruitTaskWorkflowStages: action.payload,
      };
    case types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingWorkflowTaskStagesForRecruit: false,
        fetchingWorkflowTaskStagesForRecruitError: true,
      };


    case types.GET_TASK_FOR_WORKFLOW_REQUEST:
      return {
        ...state,
        fetchingTaskForWorkflow: true,
        fetchingTaskForWorkflowError: false,
      };
    case types.GET_TASK_FOR_WORKFLOW_SUCCESS:
      return {
        ...state,
        fetchingTaskForWorkflow: false,
        fetchingTaskForWorkflowError: false,
        recruitWorkflowTask: action.payload,

      };
    case types.GET_TASK_FOR_WORKFLOW_FAILURE:
      return {
        ...state,
        fetchingTaskForWorkflow: false,
        fetchingTaskForWorkflowError: true,
      };


    case types.ADD_TASK_WORKFLOW_REQUEST:
      return { ...state, addingTaskWorkflow: true };
    case types.ADD_TASK_WORKFLOW_SUCCESS:
      return {
        ...state,
        addingTaskWorkflow: false,
        // sectors: [...state.sectors, action.payload],

      };
    case types.ADD_TASK_WORKFLOW_FAILURE:
      return {
        ...state,
        addingTaskWorkflow: false,
        addingTaskWorkflowError: true,
      };

    case types.GET_TASK_TEAM_LIST_REQUEST:
      return { ...state, fetchingTaskTeamList: true };
    case types.GET_TASK_TEAM_LIST_SUCCESS:
      return {
        ...state,
        fetchingTaskTeamList: false,
        taskTeamList: action.payload,
      };
    case types.GET_TASK_TEAM_LIST_FAILURE:
      return {
        ...state,
        fetchingTaskTeamList: false,
        fetchingTaskTeamListError: true,
      };

    case types.GET_LEAD_AGING_REQUEST:
      return { ...state, fetchingLeadAging: true };
    case types.GET_LEAD_AGING_SUCCESS:
      return {
        ...state,
        fetchingLeadAging: false,
        leadAging: action.payload,
      };
    case types.GET_LEAD_AGING_FAILURE:
      return {
        ...state,
        fetchingLeadAging: false,
        fetchingLeadAgingError: true,
      };
    case types.ADD_LEAD_AGING_REQUEST:
      return { ...state, addingLeadAging: true };
    case types.ADD_LEAD_AGING_SUCCESS:
      return {
        ...state,
        addingLeadAging: false,
      };
    case types.ADD_LEAD_AGING_FAILURE:
      return {
        ...state,
        addingLeadAging: false,
        addingLeadAgingError: true,
      };

    case types.ADD_PROCESS_FOR_DEALS_REQUEST:
      return {
        ...state,
        addingProcessForDeals: true,
        addingProcessForDealsError: false,
      };
    case types.ADD_PROCESS_FOR_DEALS_SUCCESS:
      return {
        ...state,
        addingProcessForDeals: false,
        addingProcessForDealsError: false,
        // addProcessHiringModal: false,
      };
    case types.ADD_PROCESS_FOR_DEALS_FAILURE:
      return {
        ...state,
        addingProcessForDeals: false,
        addingProcessForDealsError: true,
        // addProcessHiringModal: false,
      };


    case types.GET_PROCESS_FOR_DEALS_REQUEST:
      return {
        ...state,
        fetchingProcessForDeals: true,
        fetchingProcessForDealsError: false,
      };
    case types.GET_PROCESS_FOR_DEALS_SUCCESS:
      return {
        ...state,
        fetchingProcessForDeals: false,
        fetchingProcessForDealsError: false,
        dealsProcess: action.payload,
      };
    case types.GET_PROCESS_FOR_DEALS_FAILURE:
      return {
        ...state,
        fetchingProcessForDeals: false,
        fetchingProcessForDealsError: true,
      };


    case types.ADD_PROCESS_STAGE_FOR_DEALS_REQUEST:
      return { ...state, addingProcessStagesForDeals: true };
    case types.ADD_PROCESS_STAGE_FOR_DEALS_SUCCESS:
      return {
        ...state,
        addingProcessStagesForDeals: false,
        dealsProcessStages: [...state.dealsProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FOR_DEALS_FAILURE:
      return {
        ...state,
        addingProcessStagesForDeals: false,
        addingProcessStagesForDeals: true,
      };

    case types.GET_PROCESS_STAGES_FOR_DEALS_REQUEST:
      return {
        ...state,
        fetchingProcessStagesForDeals: true,
        fetchingProcessStagesForDealsError: false,
      };
    case types.GET_PROCESS_STAGES_FOR_DEALS_SUCCESS:
      return {
        ...state,
        fetchingProcessStagesForDeals: false,
        fetchingProcessStagesForDealsError: false,
        dealsProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FOR_DEALS_FAILURE:
      return {
        ...state,
        fetchingProcessStagesForDeals: false,
        fetchingProcessStagesForDealsError: true,
      };

    case types.LINK_DEALS_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingDealsProcessPublish: true,
      };
    case types.LINK_DEALS_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingDealsProcessPublish: false,
        dealsProcessPublish: state.dealsProcessPublish.map((item) => {
          if (
            item.investorOppWorkflowId === action.payload.investorOppWorkflowId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_DEALS_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingDealsProcessPublish: false,
        linkingDealsProcessPublishError: true,
      };


    case types.LINK_DEALS_STAGES_PUBLISH_REQUEST:
      return {
        ...state,
        linkingDealsStagesPublish: true,
      };
    case types.LINK_DEALS_STAGES_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingDealsStagesPublish: false,
        dealsStagesPublish: state.dealsStagesPublish.map((item) => {
          if (item.investorOppStagesId === action.payload.investorOppStagesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_DEALS_STAGES_PUBLISH_FAILURE:
      return {
        ...state,
        linkingDealsStagesPublish: false,
        linkingDealsStagesPublishError: true,
      };


    case types.DELETE_DEALS_PROCESS_DATA_REQUEST:
      return { ...state, deleteDealsProcessData: true };
    case types.DELETE_DEALS_PROCESS_DATA_SUCCESS:
      return {
        ...state,
        deleteDealsProcessData: false,
        dealsProcess: state.dealsProcess.filter(
          (item) => item.investorOppWorkflowId !== action.payload
        ),
      };
    case types.DELETE_DEALS_PROCESS_DATA_FAILURE:
      return { ...state, deleteDealsProcessData: false, deleteDealsProcessDataError: false };


    case types.DELETE_DEALS_STAGES_DATA_REQUEST:
      return { ...state, deletingDealsStagesData: true };
    case types.DELETE_DEALS_STAGES_DATA_SUCCESS:
      return {
        ...state,
        deletingDealsStagesData: false,
        dealsProcessStages: state.dealsProcessStages.filter(
          (item) => item.investorOppStagesId !== action.payload
        ),
      };
    case types.DELETE_DEALS_STAGES_DATA_FAILURE:
      return { ...state, deletingDealsStagesData: false, deletingDealsStagesDataError: false };


    case types.UPDATE_PROCESS_NAME_FOR_DEALS_REQUEST:
      return { ...state, updateProcessNameForDeals: true };
    case types.UPDATE_PROCESS_NAME_FOR_DEALS_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForDeals: false,

        dealsProcess: state.dealsProcess.map((state) =>
          state.investorOppWorkflowId === action.payload.investorOppWorkflowId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_DEALS_FAILURE:
      return {
        ...state,
        updateProcessNameForDeals: false,
        updateProcessNameForDealsError: true,
      };

    case types.UPDATE_STAGE_FOR_DEALS_REQUEST:
      return { ...state, updatingStagesForDeals: true };
    case types.UPDATE_STAGE_FOR_DEALS_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStagesForDeals: false,
        dealsProcessStages: state.dealsProcessStages.map((state) =>
          state.investorOppStagesId === action.payload.investorOppStagesId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FOR_DEALS_FAILURE:
      return {
        ...state,
        updatingStagesForDeals: false,
        updatingStagesForDealsError: true,
      };

    case types.GET_ALL_VAT_REQUEST:
      return {
        ...state,
        fetchingAllVat: true,
        fetchingAllVatError: false,
      };
    case types.GET_ALL_VAT_SUCCESS:
      return {
        ...state,
        fetchingAllVat: false,
        fetchingAllVatError: false,
        allVat: action.payload,
      };
    case types.GET_ALL_VAT_FAILURE:
      return {
        ...state,
        fetchingAllVat: false,
        fetchingAllVatError: true,
      };

       case types.UPDATE_WEBSITE_SINGLE_REQUEST:
      return { ...state, updateWebsiteSingle: true };
    case types.UPDATE_WEBSITE_SINGLE_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateWebsiteSingle: false,
        // Process: state.Process.map((state) =>
        //   state.processId === action.payload.processId ? action.payload : state
        // ),
      };
    case types.UPDATE_WEBSITE_SINGLE_FAILURE:
      return {
        ...state,
        updateWebsiteSingle: false,
        updateWebsiteSingleError: true,
      };


      
    case types.GET_DISTRIBUTION_AUTOMATION_REQUEST:
      return { ...state, fetchingDistributionAutomation: true };
    case types.GET_DISTRIBUTION_AUTOMATION_SUCCESS:
      return {
        ...state,
        fetchingDistributionAutomation: false,
        distributionAutomation: action.payload,
      };
    case types.GET_DISTRIBUTION_AUTOMATION_FAILURE:
      return {
        ...state,
        fetchingDistributionAutomation: true,
        fetchingDistributionAutomationError: false,
      };

      case types.GET_DEPARTMENTWISE_USER_REQUEST:
        return { ...state, fetchingDepartmentWiseUser: true };
      case types.GET_DEPARTMENTWISE_USER_SUCCESS:
        return { ...state, fetchingDepartmentWiseUser: false, departmentwiseUser: action.payload };
      case types.GET_DEPARTMENTWISE_USER_FAILURE:
        return { ...state, fetchingDepartmentWiseUser: false, fetchingDepartmentWiseUserError: true };

        case types.ADD_NOTIFICATION_CONFIG_REQUEST:
          return { ...state, addingNotificationConfig: true };
        case types.ADD_NOTIFICATION_CONFIG_SUCCESS:
          return {
            ...state,
            addingNotificationConfig: false,
          };
        case types.ADD_NOTIFICATION_CONFIG_FAILURE:
          return {
            ...state,
            addingNotificationConfig: false,
            addingNotificationConfigError: true,
          };

        case types.GET_NOTIFICATION_CONFIG_REQUEST:
          return { ...state, gettingNotificationConfig: true };
        case types.GET_NOTIFICATION_CONFIG_SUCCESS:
          return {
            ...state,
            gettingNotificationConfig: false,
            notificationConfig:action.payload,
          };
        case types.GET_NOTIFICATION_CONFIG_FAILURE:
          return {
            ...state,
            gettingNotificationConfig: false,
            gettingNotificationConfigError: true,
          };


          case types.ADD_PROCESS_FOR_ONBOARDING_REQUEST:
            return {
              ...state,
              addingProcessForOnboarding: true,
              addingProcessForOnboardingError: false,
            };
          case types.ADD_PROCESS_FOR_ONBOARDING_SUCCESS:
            return {
              ...state,
              addingProcessForOnboarding: false,
              addingProcessForOnboardingError: false,
              // addProcessHiringModal: false,
            };
          case types.ADD_PROCESS_FOR_ONBOARDING_FAILURE:
            return {
              ...state,
              addingProcessForOnboarding: false,
              addingProcessForOnboardingError: true,
              // addProcessHiringModal: false,
            };


            case types.GET_PROCESS_FOR_ONBOARDING_REQUEST:
              return {
                ...state,
                fetchingProcessForOnboarding: true,
                fetchingProcessForOnboardingError: false,
              };
            case types.GET_PROCESS_FOR_ONBOARDING_SUCCESS:
              return {
                ...state,
                fetchingProcessForOnboarding: false,
                fetchingProcessForOnboardingError: false,
                onboardingProcess: action.payload,
              };
            case types.GET_PROCESS_FOR_ONBOARDING_FAILURE:
              return {
                ...state,
                fetchingProcessForOnboarding: false,
                fetchingProcessForOnboardingError: true,
              };


              
    case types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_REQUEST:
      return { ...state, updateProcessNameForOnboarding: true };
    case types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForOnboarding: false,
        onboardingProcess: state.onboardingProcess.map((state) =>
          state.unboardingWorkflowDetailsId === action.payload.unboardingWorkflowDetailsId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_FAILURE:
      return {
        ...state,
        updateProcessNameForOnboarding: false,
        updateProcessNameForOnboardingError: true,
      };

      case types.DELETE_ONBOARDING_PROCESS_DATA_REQUEST:
        return { ...state, deleteOnboardingProcessData: true };
      case types.DELETE_ONBOARDING_PROCESS_DATA_SUCCESS:
        return {
          ...state,
          deleteOnboardingProcessData: false,
          onboardingProcess: state.onboardingProcess.filter(
            (item) => item.unboardingWorkflowDetailsId !== action.payload
          ),
        };
      case types.DELETE_ONBOARDING_PROCESS_DATA_FAILURE:
        return { ...state, deleteOnboardingProcessData: false, deleteOnboardingProcessDataError: false };


        case types.ADD_PROCESS_STAGE_FOR_ONBOARDING_REQUEST:
          return { ...state, addingProcessStagesForOnboarding: true };
        case types.ADD_PROCESS_STAGE_FOR_ONBOARDING_SUCCESS:
          return {
            ...state,
            addingProcessStagesForOnboarding: false,
            onboardingProcessStages: [...state.onboardingProcessStages, action.payload],
          };
        case types.ADD_PROCESS_STAGE_FOR_ONBOARDING_FAILURE:
          return {
            ...state,
            addingProcessStagesForOnboarding: false,
            addingProcessStagesForOnboardingError: true,
          };


          case types.GET_PROCESS_STAGES_FOR_ONBOARDING_REQUEST:
            return {
              ...state,
              fetchingProcessStagesForOnboarding: true,
              fetchingProcessStagesForOnboardingError: false,
            };
          case types.GET_PROCESS_STAGES_FOR_ONBOARDING_SUCCESS:
            return {
              ...state,
              fetchingProcessStagesForOnboarding: false,
              fetchingProcessStagesForOnboardingError: false,
              onboardingProcessStages: action.payload,
            };
          case types.GET_PROCESS_STAGES_FOR_ONBOARDING_FAILURE:
            return {
              ...state,
              fetchingProcessStagesForOnboarding: false,
              fetchingProcessStagesForOnboardingError: true,
            };

            case types.UPDATE_STAGE_FOR_ONBOARDING_REQUEST:
              return { ...state, updatingStagesForOnboarding: true };
            case types.UPDATE_STAGE_FOR_ONBOARDING_SUCCESS:
              // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
              return {
                ...state,
                updatingStagesForOnboarding: false,
                onboardingProcessStages: state.onboardingProcessStages.map((state) =>
                  state.unboardingStagesId === action.payload.unboardingStagesId ? action.payload : state
                ),
              };
            case types.UPDATE_STAGE_FOR_ONBOARDING_FAILURE:
              return {
                ...state,
                updatingStagesForOnboarding: false,
                updatingStagesForOnboardingError: true,
              };

              case types.DELETE_ONBOARDING_STAGES_DATA_REQUEST:
                return { ...state, deletingOnboardingStagesData: true };
              case types.DELETE_ONBOARDING_STAGES_DATA_SUCCESS:
                return {
                  ...state,
                  deletingOnboardingStagesData: false,
                  onboardingProcessStages: state.onboardingProcessStages.filter(
                    (item) => item.unboardingStagesId !== action.payload
                  ),
                };
              case types.DELETE_ONBOARDING_STAGES_DATA_FAILURE:
                return { ...state, deletingOnboardingStagesData: false, deletingOnboardingStagesDataError: false };


                case types.LINK_ONBOARDING_STAGES_PUBLISH_REQUEST:
                  return {
                    ...state,
                    linkingOnboardingStagesPublish: true,
                  };
                case types.LINK_ONBOARDING_STAGES_PUBLISH_SUCCESS:
                  return {
                    ...state,
                    linkingOnboardingStagesPublish: false,
                    onboardingStagesPublish: state.onboardingStagesPublish.map((item) => {
                      if (item.unboardingStagesId === action.payload.unboardingStagesId) {
                        return action.payload;
                      } else {
                        return item;
                      }
                    }),
                  };
                case types.LINK_ONBOARDING_STAGES_PUBLISH_FAILURE:
                  return {
                    ...state,
                    linkingOnboardingStagesPublish: false,
                    linkingOnboardingStagesPublishError: true,
                  };


                  
    case types.LINK_ONBOARDING_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingOnboardingProcessPublish: true,
      };
    case types.LINK_ONBOARDING_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingOnboardingProcessPublish: false,
        onboardingProcessPublish: state.onboardingProcessPublish.map((item) => {
          if (
            item.unboardingWorkflowDetailsId === action.payload.unboardingWorkflowDetailsId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_ONBOARDING_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingOnboardingProcessPublish: false,
        linkingOnboardingProcessPublishError: true,
      };
          
      case types.CREATE_CURRENCY_CONVERSION_REQUEST:
        return { ...state, creatingCurrencyConversion: true };
    case types.CREATE_CURRENCY_CONVERSION_SUCCESS:
        return {
            ...state,
            creatingCurrencyConversion: false,

        };
    case types.CREATE_CURRENCY_CONVERSION_FAILURE:
        return {
            ...state,
            creatingCurrencyConversion: false,
            creatingCurrencyConversionError: true,
            // conversionCurrencies:[action.payload,...state.conversionCurrencies]   
        };

        case types.GET_CURRENCY_CONVERSION_REQUEST:
          return {
            ...state,
            fetchingCurrencyConversion: true,
            fetchingCurrencyConversionError: false,
          };
        case types.GET_CURRENCY_CONVERSION_SUCCESS:
          return {
            ...state,
            fetchingCurrencyConversion: false,
            fetchingCurrencyConversionError: false,
            conversionCurrencies: [...state.conversionCurrencies, ...action.payload],
          };
        case types.GET_CURRENCY_CONVERSION_FAILURE:
          return {
            ...state,
            fetchingCurrencyConversion: false,
            fetchingCurrencyConversionError: true,
          };

          
    case types.ADD_PROCESS_FOR_SUPPLIER_REQUEST:
      return {
        ...state,
        addingProcessForSupplier: true,
        addingProcessForSupplierError: false,
      };
    case types.ADD_PROCESS_FOR_SUPPLIER_SUCCESS:
      return {
        ...state,
        addingProcessForSupplier: false,
        addingProcessForSupplierError: false,
        // addProcessHiringModal: false,
      };
    case types.ADD_PROCESS_FOR_SUPPLIER_FAILURE:
      return {
        ...state,
        addingProcessForSupplier: false,
        addingProcessForSupplierError: true,
        // addProcessHiringModal: false,
      };


      case types.GET_PROCESS_FOR_SUPPLIER_REQUEST:
        return {
          ...state,
          fetchingProcessForSupplier: true,
          fetchingProcessForSupplierError: false,
        };
      case types.GET_PROCESS_FOR_SUPPLIER_SUCCESS:
        return {
          ...state,
          fetchingProcessForSupplier: false,
          fetchingProcessForSupplierError: false,
          supplierProcess: action.payload,
        };
      case types.GET_PROCESS_FOR_SUPPLIER_FAILURE:
        return {
          ...state,
          fetchingProcessForSupplier: false,
          fetchingProcessForSupplierError: true,
        };

        
    case types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_REQUEST:
      return { ...state, updateProcessNameForSupplier: true };
    case types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForSupplier: false,

        supplierProcess: state.supplierProcess.map((state) =>
          state.supplierUnboardingWorkflowDetailsId === action.payload.supplierUnboardingWorkflowDetailsId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_FAILURE:
      return {
        ...state,
        updateProcessNameForSupplier: false,
        updateProcessNameForSupplierError: true,
      };

      case types.DELETE_SUPPLIER_PROCESS_DATA_REQUEST:
        return { ...state, deleteSupplierProcessData: true };
      case types.DELETE_SUPPLIER_PROCESS_DATA_SUCCESS:
        return {
          ...state,
          deleteSupplierProcessData: false,
          supplierProcess: state.supplierProcess.filter(
            (item) => item.supplierUnboardingWorkflowDetailsId !== action.payload
          ),
        };
      case types.DELETE_SUPPLIER_PROCESS_DATA_FAILURE:
        return { ...state, deleteSupplierProcessData: false, deleteSupplierProcessDataError: false };
  

        case types.ADD_PROCESS_STAGE_FOR_SUPPLIER_REQUEST:
          return { ...state, addingProcessStagesForSupplier: true };
        case types.ADD_PROCESS_STAGE_FOR_SUPPLIER_SUCCESS:
          return {
            ...state,
            addingProcessStagesForSupplier: false,
            supplierProcessStages: [...state.supplierProcessStages, action.payload],
          };
        case types.ADD_PROCESS_STAGE_FOR_SUPPLIER_FAILURE:
          return {
            ...state,
            addingProcessStagesForSupplier: false,
            addingProcessStagesForSupplier: true,
          };

          case types.GET_PROCESS_STAGES_FOR_SUPPLIER_REQUEST:
            return {
              ...state,
              fetchingProcessStagesForSupplier: true,
              fetchingProcessStagesForSupplierError: false,
            };
          case types.GET_PROCESS_STAGES_FOR_SUPPLIER_SUCCESS:
            return {
              ...state,
              fetchingProcessStagesForSupplier: false,
              fetchingProcessStagesForSupplierError: false,
              supplierProcessStages: action.payload,
            };
          case types.GET_PROCESS_STAGES_FOR_SUPPLIER_FAILURE:
            return {
              ...state,
              fetchingProcessStagesForSupplier: false,
              fetchingProcessStagesForSupplierError: true,
            };

            case types.UPDATE_STAGE_FOR_SUPPLIER_REQUEST:
              return { ...state, updatingStagesForSupplier: true };
            case types.UPDATE_STAGE_FOR_SUPPLIER_SUCCESS:
              // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
              return {
                ...state,
                updatingStagesForSupplier: false,
                supplierProcessStages: state.supplierProcessStages.map((state) =>
                  state.supplierUnboardingStagesId === action.payload.supplierUnboardingStagesId ? action.payload : state
                ),
              };
            case types.UPDATE_STAGE_FOR_SUPPLIER_FAILURE:
              return {
                ...state,
                updatingStagesForSupplier: false,
                updatingStagesForSupplierError: true,
              };

              case types.DELETE_SUPPLIER_STAGES_DATA_REQUEST:
                return { ...state, deletingSupplierStagesData: true };
              case types.DELETE_SUPPLIER_STAGES_DATA_SUCCESS:
                return {
                  ...state,
                  deletingSupplierStagesData: false,
                  supplierProcessStages: state.supplierProcessStages.filter(
                    (item) => item.supplierUnboardingStagesId !== action.payload
                  ),
                };
              case types.DELETE_SUPPLIER_STAGES_DATA_FAILURE:
                return { ...state, deletingSupplierStagesData: false, deletingSupplierStagesDataError: false };

                case types.LINK_SUPPLIER_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingSupplierProcessPublish: true,
      };
    case types.LINK_SUPPLIER_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingSupplierProcessPublish: false,
        supplierProcessPublish: state.supplierProcessPublish.map((item) => {
          if (
            item.supplierUnboardingWorkflowDetailsId === action.payload.supplierUnboardingWorkflowDetailsId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_SUPPLIER_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingSupplierProcessPublish: false,
        linkingSupplierProcessPublishError: true,
      };

      case types.LINK_SUPPLIER_STAGES_PUBLISH_REQUEST:
        return {
          ...state,
          linkingSupplierStagesPublish: true,
        };
      case types.LINK_SUPPLIER_STAGES_PUBLISH_SUCCESS:
        return {
          ...state,
          linkingSupplierStagesPublish: false,
          supplierStagesPublish: state.supplierStagesPublish.map((item) => {
            if (item.supplierUnboardingStagesId === action.payload.supplierUnboardingStagesId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case types.LINK_SUPPLIER_STAGES_PUBLISH_FAILURE:
        return {
          ...state,
          linkingSupplierStagesPublish: false,
          linkingSupplierStagesPublishError: true,
        };


        case types.ADD_PROCESS_FOR_PRODUCTION_REQUEST:
          return {
            ...state,
            addingProcessForProduction: true,
            addingProcessForProductionError: false,
          };
        case types.ADD_PROCESS_FOR_PRODUCTION_SUCCESS:
          return {
            ...state,
            addingProcessForProduction: false,
            addingProcessForProductionError: false,
            // addProcessHiringModal: false,
          };
        case types.ADD_PROCESS_FOR_PRODUCTION_FAILURE:
          return {
            ...state,
            addingProcessForProduction: false,
            addingProcessForProductionError: true,
            // addProcessHiringModal: false,
          };

          case types.GET_PROCESS_FOR_PRODUCTION_REQUEST:
            return {
              ...state,
              fetchingProcessForProduction: true,
              fetchingProcessForProductionError: false,
            };
          case types.GET_PROCESS_FOR_PRODUCTION_SUCCESS:
            return {
              ...state,
              fetchingProcessForProduction: false,
              fetchingProcessForProductionError: false,
              productionProcess: action.payload,
            };
          case types.GET_PROCESS_FOR_PRODUCTION_FAILURE:
            return {
              ...state,
              fetchingProcessForProduction: false,
              fetchingProcessForProductionError: true,
            };

            case types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_REQUEST:
              return { ...state, updateProcessNameForProduction: true };
            case types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_SUCCESS:
              // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
              return {
                ...state,
                updateProcessNameForProduction: false,
        
                productionProcess: state.productionProcess.map((state) =>
                  state.productionWorkflowDetailsId === action.payload.productionWorkflowDetailsId
                    ? action.payload
                    : state
                ),
              };
            case types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_FAILURE:
              return {
                ...state,
                updateProcessNameForProduction: false,
                updateProcessNameForProductionError: true,
              };
          

              case types.DELETE_PRODUCTION_PROCESS_DATA_REQUEST:
                return { ...state, deleteProductionProcessData: true };
              case types.DELETE_PRODUCTION_PROCESS_DATA_SUCCESS:
                return {
                  ...state,
                  deleteProductionProcessData: false,
                  productionProcess: state.productionProcess.filter(
                    (item) => item.productionWorkflowDetailsId !== action.payload
                  ),
                };
              case types.DELETE_PRODUCTION_PROCESS_DATA_FAILURE:
                return { ...state, deleteProductionProcessData: false, deleteProductionProcessDataError: false };

                case types.ADD_PROCESS_STAGE_FOR_PRODUCTION_REQUEST:
                  return { ...state, addingProcessStagesForProduction: true };
                case types.ADD_PROCESS_STAGE_FOR_PRODUCTION_SUCCESS:
                  return {
                    ...state,
                    addingProcessStagesForProduction: false,
                    productionProcessStages: [...state.productionProcessStages, action.payload],
                  };
                case types.ADD_PROCESS_STAGE_FOR_PRODUCTION_FAILURE:
                  return {
                    ...state,
                    addingProcessStagesForProduction: false,
                    addingProcessStagesForProduction: true,
                  };

                  case types.GET_PROCESS_STAGES_FOR_PRODUCTION_REQUEST:
                    return {
                      ...state,
                      fetchingProcessStagesForProduction: true,
                      fetchingProcessStagesForProductionError: false,
                    };
                  case types.GET_PROCESS_STAGES_FOR_PRODUCTION_SUCCESS:
                    return {
                      ...state,
                      fetchingProcessStagesForProduction: false,
                      fetchingProcessStagesForProductionError: false,
                      productionProcessStages: action.payload,
                    };
                  case types.GET_PROCESS_STAGES_FOR_PRODUCTION_FAILURE:
                    return {
                      ...state,
                      fetchingProcessStagesForProduction: false,
                      fetchingProcessStagesForProductionError: true,
                    };


                    case types.UPDATE_STAGE_FOR_PRODUCTION_REQUEST:
                      return { ...state, updatingStagesForProduction: true };
                    case types.UPDATE_STAGE_FOR_PRODUCTION_SUCCESS:
                      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
                      return {
                        ...state,
                        updatingStagesForProduction: false,
                        productionProcessStages: state.productionProcessStages.map((state) =>
                          state.productionStagesId === action.payload.productionStagesId ? action.payload : state
                        ),
                      };
                    case types.UPDATE_STAGE_FOR_PRODUCTION_FAILURE:
                      return {
                        ...state,
                        updatingStagesForProduction: false,
                        updatingStagesForProductionError: true,
                      };

                      case types.DELETE_PRODUCTION_STAGES_DATA_REQUEST:
                        return { ...state, deletingProductionStagesData: true };
                      case types.DELETE_PRODUCTION_STAGES_DATA_SUCCESS:
                        return {
                          ...state,
                          deletingProductionStagesData: false,
                          productionProcessStages: state.productionProcessStages.filter(
                            (item) => item.productionStagesId !== action.payload
                          ),
                        };
                      case types.DELETE_PRODUCTION_STAGES_DATA_FAILURE:
                        return { ...state, deletingProductionStagesData: false, deletingProductionStagesDataError: false };

                        case types.LINK_PRODUCTION_PROCESS_PUBLISH_REQUEST:
                          return {
                            ...state,
                            linkingProductionProcessPublish: true,
                          };
                        case types.LINK_PRODUCTION_PROCESS_PUBLISH_SUCCESS:
                          return {
                            ...state,
                            linkingProductionProcessPublish: false,
                            productionProcessPublish: state.productionProcessPublish.map((item) => {
                              if (
                                item.productionWorkflowDetailsId === action.payload.productionWorkflowDetailsId
                              ) {
                                return action.payload;
                              } else {
                                return item;
                              }
                            }),
                          };
                        case types.LINK_PRODUCTION_PROCESS_PUBLISH_FAILURE:
                          return {
                            ...state,
                            linkingProductionProcessPublish: false,
                            linkingProductionProcessPublishError: true,
                          };

                          case types.LINK_PRODUCTION_STAGES_PUBLISH_REQUEST:
                            return {
                              ...state,
                              linkingProductionStagesPublish: true,
                            };
                          case types.LINK_PRODUCTION_STAGES_PUBLISH_SUCCESS:
                            return {
                              ...state,
                              linkingProductionStagesPublish: false,
                              productionStagesPublish: state.productionStagesPublish.map((item) => {
                                if (item.productionStagesId === action.payload.productionStagesId) {
                                  return action.payload;
                                } else {
                                  return item;
                                }
                              }),
                            };
                          case types.LINK_PRODUCTION_STAGES_PUBLISH_FAILURE:
                            return {
                              ...state,
                              linkingProductionStagesPublish: false,
                              linkingProductionStagesPublishError: true,
                            };

                            case types.ADD_PROCESS_FOR_REPAIR_REQUEST:
                              return {
                                ...state,
                                addingProcessForRepair: true,
                                addingProcessForRepairError: false,
                              };
                            case types.ADD_PROCESS_FOR_REPAIR_SUCCESS:
                              return {
                                ...state,
                                addingProcessForRepair: false,
                                addingProcessForRepairError: false,
                                // addProcessHiringModal: false,
                              };
                            case types.ADD_PROCESS_FOR_REPAIR_FAILURE:
                              return {
                                ...state,
                                addingProcessForRepair: false,
                                addingProcessForRepairError: true,
                                // addProcessHiringModal: false,
                              };

                              case types.GET_PROCESS_FOR_REPAIR_REQUEST:
                                return {
                                  ...state,
                                  fetchingProcessForRepair: true,
                                  fetchingProcessForRepairError: false,
                                };
                              case types.GET_PROCESS_FOR_REPAIR_SUCCESS:
                                return {
                                  ...state,
                                  fetchingProcessForRepair: false,
                                  fetchingProcessForRepairError: false,
                                  repairProcess: action.payload,
                                };
                              case types.GET_PROCESS_FOR_REPAIR_FAILURE:
                                return {
                                  ...state,
                                  fetchingProcessForRepair: false,
                                  fetchingProcessForRepairError: true,
                                };

                                case types.UPDATE_PROCESS_NAME_FOR_REPAIR_REQUEST:
                                  return { ...state, updateProcessNameForRepair: true };
                                case types.UPDATE_PROCESS_NAME_FOR_REPAIR_SUCCESS:
                                  // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
                                  return {
                                    ...state,
                                    updateProcessNameForRepair: false,
                            
                                    repairProcess: state.repairProcess.map((state) =>
                                      state.repairWorkflowDetailsId === action.payload.repairWorkflowDetailsId
                                        ? action.payload
                                        : state
                                    ),
                                  };
                                case types.UPDATE_PROCESS_NAME_FOR_REPAIR_FAILURE:
                                  return {
                                    ...state,
                                    updateProcessNameForRepair: false,
                                    updateProcessNameForRepairError: true,
                                  };

                                  case types.DELETE_REPAIR_PROCESS_DATA_REQUEST:
                                    return { ...state, deleteRepairProcessData: true };
                                  case types.DELETE_REPAIR_PROCESS_DATA_SUCCESS:
                                    return {
                                      ...state,
                                      deleteRepairProcessData: false,
                                      repairProcess: state.repairProcess.filter(
                                        (item) => item.repairWorkflowDetailsId !== action.payload
                                      ),
                                    };
                                  case types.DELETE_REPAIR_PROCESS_DATA_FAILURE:
                                    return { ...state, deleteRepairProcessData: false, deleteRepairProcessDataError: false };


                                    case types.ADD_PROCESS_STAGE_FOR_REPAIR_REQUEST:
                                      return { ...state, addingProcessStagesForRepair: true };
                                    case types.ADD_PROCESS_STAGE_FOR_REPAIR_SUCCESS:
                                      return {
                                        ...state,
                                        addingProcessStagesForRepair: false,
                                        repairProcessStages: [...state.repairProcessStages, action.payload],
                                      };
                                    case types.ADD_PROCESS_STAGE_FOR_REPAIR_FAILURE:
                                      return {
                                        ...state,
                                        addingProcessStagesForRepair: false,
                                        addingProcessStagesForRepair: true,
                                      };

                                      case types.GET_PROCESS_STAGES_FOR_REPAIR_REQUEST:
                                        return {
                                          ...state,
                                          fetchingProcessStagesForRepair: true,
                                          fetchingProcessStagesForRepairError: false,
                                        };
                                      case types.GET_PROCESS_STAGES_FOR_REPAIR_SUCCESS:
                                        return {
                                          ...state,
                                          fetchingProcessStagesForRepair: false,
                                          fetchingProcessStagesForRepairError: false,
                                          repairProcessStages: action.payload,
                                        };
                                      case types.GET_PROCESS_STAGES_FOR_REPAIR_FAILURE:
                                        return {
                                          ...state,
                                          fetchingProcessStagesForRepair: false,
                                          fetchingProcessStagesForRepairError: true,
                                        };
                    
        
          

    default:
      return state;
  }
};
