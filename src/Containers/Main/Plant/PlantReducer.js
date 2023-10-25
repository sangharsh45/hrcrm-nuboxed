import * as types from "./PlantActionTypes";

const initialState = {
  addPlantModal: false,

  fetchingProductionManagement: false,
  fetchingProductionManagementError: false,
  productionManagement: [],

  fetchingPlant: false,
  fetchingPlantError: false,
  plant: [],

  fetchingPlantById: false,
  fetchingPlantByIdError: false,
  plantDetailById: [],

  addingPlant: false,
  addingPlantError: false,
  //deputeButton
  deputeButtonModal: false,
  //addExecutive
  addingExecutive: false,
  addingExecutiveError: false,
  //edit
  setEditingPlant: {},
  updatePlantModal: false,
  //edit PlantAllocation
  setEditingPlantAllocation: {},

  //addShiftsInPlant
  addingShiftsInPlant: false,
  addingShiftsInPlantError: false,
};

export const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_PLANT_MODAL:
      return { ...state, addPlantModal: action.payload };

    case types.GET_PRODUCTION_MANAGER_REQUEST:
      return { ...state, fetchingProductionManagement: true };
    case types.GET_PRODUCTION_MANAGER_SUCCESS:
      return {
        ...state,
        fetchingProductionManagement: false,
        productionManagement: action.payload,
      };
    case types.GET_PRODUCTION_MANAGER_FAILURE:
      return {
        ...state,
        fetchingProductionManagement: false,
        fetchingProductionManagementError: true,
      };
    //add plant
    case types.ADD_PLANT_REQUEST:
      return { ...state, addingPlant: true };
    case types.ADD_PLANT_SUCCESS:
      return {
        ...state,
        addingPlant: false,
        addPlantModal: false,
        // clearbit: null,
      };
    case types.ADD_PLANT_FAILURE:
      return {
        ...state,
        addingPlant: false,
        addingPlantError: true,
      };

    case types.GET_PLANT_REQUEST:
      return { ...state, fetchingPlant: true };
    case types.GET_PLANT_SUCCESS:
      return { ...state, fetchingPlant: false, plant: action.payload };
    case types.GET_PLANT_FAILURE:
      return {
        ...state,
        fetchingPlant: false,
        fetchingPlantError: true,
      };

    //Plant Details

    case types.GET_PLANT_BY_ID_REQUEST:
      return { ...state, fetchingPlantById: true };
    case types.GET_PLANT_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingPlantById: false,
        plantDetailById: action.payload,
      };
    case types.GET_PLANT_BY_ID_FAILURE:
      return {
        ...state,
        fetchingPlantById: false,
        fetchingPlantByIdError: true,
      };

    //depute button
    case types.HANDLE_DEPUTE_BUTTON_MODAL:
      return { ...state, deputeButtonModal: action.payload };
    //addExecutive
    case types.ADD_EXECUTIVE_REQUEST:
      return { ...state, addingExecutive: true };
    case types.ADD_EXECUTIVE_SUCCESS:
      return { ...state, addingExecutive: false, deputeButtonModal: false };
    case types.ADD_EXECUTIVE_FAILURE:
      return {
        ...state,
        addingExecutive: false,
        addingExecutiveError: false,
      };

    //edit Plant
    case types.SET_PLANT_EDIT:
      return { ...state, setEditingPlant: action.payload };
    /**
     * update plant modal
     */
    case types.HANDLE_UPDATE_PLANT_MODAL:
      return { ...state, updatePlantModal: action.payload };

    //edit PlantAllocation
    case types.SET_PLANT_ALLOCATION_EDIT:
      return { ...state, setEditingPlantAllocation: action.payload };

    //addshiftsInPlant
    case types.ADD_SHIFTS_IN_PLANT_REQUEST:
      return { ...state, addingShiftsInPlant: true };
    case types.ADD_SHIFTS_IN_PLANT_SUCCESS:
      return {
        ...state,
        addingShiftsInPlant: false,
        // addTeamsModal: false,
      };
    case types.ADD_SHIFTS_IN_PLANT_FAILURE:
      return {
        ...state,
        addingShiftsInPlant: false,
        addingShiftsInPlantError: true,
        // addTeamsModal: false,
      };

    default:
      return state;
  }
};
