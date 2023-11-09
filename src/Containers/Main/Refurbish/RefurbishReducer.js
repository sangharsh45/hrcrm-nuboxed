import * as types from "./RefurbishActionTypes";

const initialState = {
  viewType: "list",
  fetchingTodayProduction: false,
  fetchingTodayProductionError: false,
  production: [],

  showAssignRepairModal: false,

  showRepairPhoneList: false,

  fetchingRepairorderById: false,
  fetchingRepairorderByIdError: false,
  repairOrder: [],

  fetchingTomorrowProduction: false,
  fetchingTomorrowProductionError: false,
  productiontomorrow: [],

  linkDateToProduction: false,
  linkDateToProductionError: false,
  productionData: [],
  //add consumption
  addingProduction: false,
  addingProductionError: false,
  //get consumption
  fetchingAllProductionConsumption: false,
  fetchingAllProductionConsumptionError: false,
  allConsumption: [],

  //get output
  fetchingAllProductionOutput: false,
  fetchingAllProductionOutputError: false,
  allProductionOutput: [],
  //add output
  addingProductionOutput: false,
  addingProductionOutputError: false,

  fetchingShiftsByUserId: false,
  fetchingShiftsByUserIdError: false,
  shiftsData: [],

  updatingQcInspectionButton: false,
  updatingQcInspectionButtonError: false,

  fetchingNoofTecnician: false,
  fetchingNoofTecnicianError: false,
  technicianByID: [],

  updatingRepairInspectionButton: false,
  updatingRepairInspectionButtonError: false,

  addOrderPhone: false,

  updatingTechnicianForRepair: false,
  updatingTechnicianForRepairError: false,

  updatingRepairStatus: false,
  updatingRepairStatusError: false,

  showPhoneList: false,

  fetchingProductionUserById: false,
  fetchingProductionUserByIdError: false,
  productionUser: [],

  updatingtechnicianByPhone: false,
  updatingtechnicianByPhoneError: false,

  //split output
  addingSplitProductionOutput: false,
  addingSplitProductionOutputError: false,
  //delete Output
  fetchingProductionOrederId: false,
  fetchingProductionOrederIdError: true,
  productionOrder: [],

  fetchingPhoneListByUser: false,
  fetchingPhoneListByUserError: false,
  phoneByUser: [],

  deleteProductionOutput: false,
  deleteProductionOutputError: false,
  //split output
  splitOutputModal: false,
  setEditingOutputProduction: {},

  productioNoteModal: false,

  showTechnicianModal: false,

  assignOrderById: false,
  productionOrderIdModal: false,
  phoNoteProductionModal: false,

  fetchingNoOfPhonesById: false,
  fetchingNoOfPhonesByIdError: false,
  noOfPhoneById: [],

  phoneByTechnician: false,

  addOrderPhone: false,

  fetchingRepairPhoneByUser: false,
  fetchingRepairPhoneByUserError: false,
  repairPhone: [],

  fetchingOrderIdByUserId: false,
  fetchingOrderIdByUserIdError: false,
  orderPhoneList: [],

  fetchingOrderByUser: false,
  fetchingOrderByUserError: false,
  orderByUser: [],

  addingProduction: false,
  addingProductionError: false,

  fetchingOpenRepairByUser: false,
  fetchingOpenRepairByUserError: false,
  openRepair: [],

  fetchingOpenQc: false,
  fetchingOpenQcError: false,
  openQc: [],

  fetchingProductionNotesInOrders: false,
  fetchingProductionNotesInOrdersError: false,
  notesProdInOrders: [],

  fetchingRepairPhoneById: false,
  fetchingRepairPhoneByIdError: false,
  repairPhoneByOrder: [],

  phoNotesRepairOrderModal: false,
  phoNotesQCOrderModal: false,
};

export const refurbishReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCTION_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_TODAY_PRODUCTION_REQUEST:
      return { ...state, fetchingTodayProduction: true };
    case types.GET_TODAY_PRODUCTION_SUCCESS:
      return {
        ...state,
        fetchingTodayProduction: false,
        production: action.payload,
      };
    case types.GET_TODAY_PRODUCTION_FAILURE:
      return {
        ...state,
        fetchingTodayProduction: false,
        fetchingTodayProductionError: true,
      };

    case types.GET_TOMORROW_PRODUCTION_REQUEST:
      return { ...state, fetchingTomorrowProduction: true };
    case types.GET_TOMORROW_PRODUCTION_SUCCESS:
      return {
        ...state,
        fetchingTomorrowProduction: false,
        productiontomorrow: action.payload,
      };
    case types.GET_TOMORROW_PRODUCTION_FAILURE:
      return {
        ...state,
        fetchingTomorrowProduction: false,
        fetchingTomorrowProductionError: true,
      };

    case types.LINK_DATE_TO_PRODUCTION_REQUEST:
      return { ...state, linkDateToProduction: true };
    case types.LINK_DATE_TO_PRODUCTION_SUCCESS:
      return {
        ...state,
        linkDateToProduction: false,
        productionData: action.payload,
      };
    case types.LINK_DATE_TO_PRODUCTION_FAILURE:
      return {
        ...state,
        linkDateToProduction: false,
        linkDateToProductionError: true,
      };

    /**get the list of all consumption*/
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_REQUEST:
      return { ...state, fetchingAllProductionConsumption: true };
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllProductionConsumption: false,
        allConsumption: action.payload,
      };
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_FAILURE:
      return {
        ...state,
        fetchingAllProductionConsumption: false,
        fetchingAllProductionConsumptionError: true,
      };

    /**get the list of all output*/
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_REQUEST:
      return { ...state, fetchingAllProductionOutput: true };
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllProductionOutput: false,
        allProductionOutput: action.payload,
      };
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_FAILURE:
      return {
        ...state,
        fetchingAllProductionOutput: false,
        fetchingAllProductionOutputError: true,
      };

    case types.ADD_PRODUCTION_REQUEST:
      return { ...state, addingProduction: true };
    case types.ADD_PRODUCTION_SUCCESS:
      return {
        ...state,
        addingProduction: false,
        addProductionModal: false,
        // clearbit: null,
      };
    case types.ADD_PRODUCTION_FAILURE:
      return {
        ...state,
        addingProduction: false,
        addingProductionError: true,
      };

    //add output
    case types.ADD_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, addingProductionOutput: true };
    case types.ADD_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        addingProductionOutput: false,
        addProductionModal: false,
        // clearbit: null,
      };
    case types.ADD_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        addingProductionOutput: false,
        addingProductionOutputError: true,
      };

    case types.GET_SHIFTS_REQUEST:
      return { ...state, fetchingShiftsByUserId: true };
    case types.GET_SHIFTS_SUCCESS:
      return {
        ...state,
        fetchingShiftsByUserId: false,
        shiftsData: action.payload,
      };
    case types.GET_SHIFTS_FAILURE:
      return {
        ...state,
        fetchingShiftsByUserId: false,
        fetchingShiftsByUserIdError: true,
      };

    //transfer output
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_REQUEST:
      return { ...state };
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_SUCCESS:
      return {
        ...state,
        allProductionOutput: state.allProductionOutput.map((item) =>
          item.locationDetailsId === action.payload.locationDetailsId
            ? action.payload
            : item
        ),
      };
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_FAILURE:
      return { ...state };
    //split output
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, addingSplitProductionOutput: true };
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        addingSplitProductionOutput: false,
        // splitProductionOutput: action.payload,
        splitOutputModal: false,
      };
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        addingSplitProductionOutput: false,
        addingSplitProductionOutputError: true,
      };
    //delete output
    case types.DELETE_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, deleteProductionOutput: true };
    case types.DELETE_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        deleteProductionOutput: false,
        allProductionOutput: state.allProductionOutput.filter(
          (item) => item.productionProductId !== action.payload
        ),
      };
    case types.DELETE_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        deleteProductionOutput: false,
        deleteProductionOutputError: false,
      };

    case types.HANDLE_SPLIT_OUTPUT_MODAL:
      return { ...state, splitOutputModal: action.payload };
    case types.SET_EDIT_OUTPUT_PRODUCTION:
      return { ...state, setEditingOutputProduction: action.payload };

    case types.GET_PRODUCTION_ORDER_ID_REQUEST:
      return { ...state, fetchingProductionOrederId: true };
    case types.GET_PRODUCTION_ORDER_ID_SUCCESS:
      return {
        ...state,
        fetchingProductionOrederId: false,
        productionOrder: action.payload,
      };
    case types.GET_PRODUCTION_ORDER_ID_FAILURE:
      return {
        ...state,
        fetchingProductionOrederId: false,
        fetchingProductionOrederIdError: true,
      };

    case types.HANDLE_PRODUCTION_NOTES_MODAL:
      return { ...state, productioNoteModal: action.payload };

    case types.GET_PRODUCTION_USER_BYID_REQUEST:
      return { ...state, fetchingProductionUserById: true };
    case types.GET_PRODUCTION_USER_BYID_SUCCESS:
      return {
        ...state,
        fetchingProductionUserById: false,
        productionUser: action.payload,
      };
    case types.GET_PRODUCTION_USER_BYID_FAILURE:
      return {
        ...state,
        fetchingProductionUserById: false,
        fetchingProductionUserByIdError: true,
      };

    case types.HANDLE_ASSIGN_ORDER_BY_ID_MODAL:
      return { ...state, assignOrderById: action.payload };

    case types.HANDLE_PRODUCTION_ORDERID_MODAL:
      return { ...state, productionOrderIdModal: action.payload };

    case types.HANDLE_PHONE_NOTE_PRODUCTION_MODAL:
      return { ...state, phoNoteProductionModal: action.payload };

    case types.UPDATE_TECHNICIAN_BY_PHONE_REQUEST:
      return { ...state, updatingtechnicianByPhone: true };
    case types.UPDATE_TECHNICIAN_BY_PHONE_SUCCESS:
      return {
        ...state,
        updatingtechnicianByPhone: false,
      };
    case types.UPDATE_TECHNICIAN_BY_PHONE_FAILURE:
      return {
        ...state,
        updatingtechnicianByPhone: false,
        updatingtechnicianByPhoneError: true,
      };

    case types.GET_NO_OF_PHONE_BY_ID_REQUEST:
      return { ...state, fetchingNoOfPhonesById: true };
    case types.GET_NO_OF_PHONE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingNoOfPhonesById: false,
        noOfPhoneById: action.payload
      };
    case types.GET_NO_OF_PHONE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingNoOfPhonesById: false,
        fetchingNoOfPhonesByIdError: true,
      };

    case types.HANDLE_TECHNICIAN_MODAL_MODAL:
      return { ...state, showTechnicianModal: action.payload };

    case types.GET_NO_OF_TECHNICIAN_BY_ID_REQUEST:
      return { ...state, fetchingNoofTecnician: true };
    case types.GET_NO_OF_TECHNICIAN_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingNoofTecnician: false,
        technicianByID: action.payload
      };
    case types.GET_NO_OF_TECHNICIAN_BY_ID_FAILURE:
      return {
        ...state,
        fetchingNoofTecnician: false,
        fetchingNoofTecnicianError: true,
      };

    case types.HANDLE_PHONE_BY_TECHNICIAN_MODAL:
      return { ...state, phoneByTechnician: action.payload };

    case types.HANDLE_ASSIGN_REPAIR_MODAL:
      return { ...state, showAssignRepairModal: action.payload };

    case types.GET_PHONE_LIST_BY_USER_REQUEST:
      return { ...state, fetchingPhoneListByUser: true };
    case types.GET_PHONE_LIST_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingPhoneListByUser: false,
        phoneByUser: action.payload
      };
    case types.GET_PHONE_LIST_BY_USER_FAILURE:
      return {
        ...state,
        fetchingPhoneListByUser: false,
        fetchingPhoneListByUserError: true,
      };

    case types.UPDATE_FINAL_PRICE_REQUEST:
      return { ...state, addingProduction: true };
    case types.UPDATE_FINAL_PRICE_SUCCESS:
      return {
        ...state,
        addingProduction: false,
      };
    case types.UPDATE_FINAL_PRICE_FAILURE:
      return {
        ...state,
        addingProduction: false,
        addingProductionError: true,
      };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_REQUEST:
      return { ...state, fetchingProductionNotesInOrders: true };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionNotesInOrders: false,
        notesProdInOrders: action.payload,
      };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionNotesInOrders: false,
        fetchingProductionNotesInOrdersError: true,
      };

    case types.HANDLE_ORDER_PHONE:
      return { ...state, addOrderPhone: action.payload };

    case types.GET_ORDER_BY_USER_REQUEST:
      return { ...state, fetchingOrderByUser: true };
    case types.GET_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOrderByUser: false,
        // orderByUser: state.orderByUser.map((item) =>
        //   item.orderPhoneId !== null
        //     ? action.payload
        //     : action.payload
        // ),
        orderByUser: action.payload,
        // orderByUser: state.orderByUser.filter(
        //   (item) => item.orderPhoneId !== action.payload
        // ),
      };
    case types.GET_ORDER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOrderByUser: false,
        fetchingOrderByUserError: true,
      };

    case types.HANDLE_ORDER_PHONE_MODAL:
      return { ...state, showPhoneList: action.payload };

    case types.GET_ORDERID_BY_USER_REQUEST:
      return { ...state, fetchingOrderIdByUserId: true };
    case types.GET_ORDERID_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOrderIdByUserId: false,
        orderPhoneList: action.payload,
      };
    case types.GET_ORDERID_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOrderIdByUserId: false,
        fetchingOrderIdByUserIdError: true,
      };
    case types.UPDATE_REPAIR_STATUS_REQUEST:
      return { ...state, updatingRepairStatus: true };
    case types.UPDATE_REPAIR_STATUS_SUCCESS:
      return {
        ...state,
        updatingRepairStatus: false,
      };
    case types.UPDATE_REPAIR_STATUS_FAILURE:
      return {
        ...state,
        updatingRepairStatus: false,
        updatingRepairStatusError: true,
      };

    case types.GET_REPAIR_PHONE_BY_USER_REQUEST:
      return { ...state, fetchingRepairPhoneByUser: true };
    case types.GET_REPAIR_PHONE_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingRepairPhoneByUser: false,
        repairPhone: action.payload,
      };
    case types.GET_REPAIR_PHONE_BY_USER_FAILURE:
      return {
        ...state,
        fetchingRepairPhoneByUser: false,
        fetchingRepairPhoneByUserError: true,
      };

    case types.GET_REPAIR_PHONE_BY_ID_REQUEST:
      return { ...state, fetchingRepairPhoneById: true };
    case types.GET_REPAIR_PHONE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingRepairPhoneById: false,
        repairPhoneByOrder: action.payload,
      };
    case types.GET_REPAIR_PHONE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingRepairPhoneById: false,
        fetchingRepairPhoneByIdError: true,
      };

    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_REQUEST:
      return { ...state, updatingTechnicianForRepair: true };
    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_SUCCESS:
      return {
        ...state,
        updatingTechnicianForRepair: false,
      };
    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_FAILURE:
      return {
        ...state,
        updatingTechnicianForRepair: false,
        updatingTechnicianForRepairError: true,
      };

    case types.HANDLE_REPAIR_PHONE_MODAL:
      return { ...state, showRepairPhoneList: action.payload };

    case types.GET_REPAIR_ORDER_BY_USER_REQUEST:
      return { ...state, fetchingRepairorderById: true };
    case types.GET_REPAIR_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingRepairorderById: false,
        repairOrder: action.payload,
      };
    case types.GET_REPAIR_ORDER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingRepairorderById: false,
        fetchingRepairorderByIdError: true,
      };
    case types.HANDLE_REPAIR_PHONE_NOTES_ORDER_MODAL:
      return { ...state, phoNotesRepairOrderModal: action.payload };

    case types.HANDLE_QC_PHONE_NOTES_ORDER_MODAL:
      return { ...state, phoNotesQCOrderModal: action.payload };

    case types.UPDATE_QC_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingQcInspectionButton: true };
    case types.UPDATE_QC_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingQcInspectionButton: false,
      };
    case types.UPDATE_QC_INSPECTION_BUTTON_FAILURE:
      return {
        ...state,
        updatingQcInspectionButton: false,
        updatingQcInspectionButtonError: true,
      };

    case types.UPDATE_REPAIR_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingRepairInspectionButton: true };
    case types.UPDATE_REPAIR_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingRepairInspectionButton: false,
      };
    case types.UPDATE_REPAIR_INSPECTION_BUTTON_FAILURE:
      return {
        ...state,
        updatingRepairInspectionButton: false,
        updatingRepairInspectionButtonError: true,
      };

    case types.GET_OPEN_USER_BY_USER_REQUEST:
      return { ...state, fetchingOpenRepairByUser: true };
    case types.GET_OPEN_USER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOpenRepairByUser: false,
        openRepair: action.payload,
      };
    case types.GET_OPEN_USER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOpenRepairByUser: false,
        fetchingOpenRepairByUserError: true,
      };

    case types.GET_OPEN_QC_BY_USER_REQUEST:
      return { ...state, fetchingOpenQc: true };
    case types.GET_OPEN_QC_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOpenQc: false,
        openQc: action.payload,
      };
    case types.GET_OPEN_QC_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOpenQc: false,
        fetchingOpenQcError: true,
      };
    default:
      return state;
  }
};
