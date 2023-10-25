import * as types from "./TeamsActionType";

const initialState = {
  addTeamsModal: false,

  viewType: "table",


  addTeamMemberModal: false,

  addTeamTransferModal: false,

  fetchingOnlyManagementUsers: false,
  fetchingOnlyManagementUsersError: false,
  onlyManagementUsers: [],

  fetchingOnlySalesUsers: false,
  fetchingOnlySalesUsersError: false,
  onlySalesUsers: [],

  addingTeamsContact: false,
  addingTeamsContactError: false,

  linkingSalesUserToTeam: false,
  linkingSalesUserToTeamError: false,

  fetchingTeam: false,
  fetchingTeamError: false,
  teamList: [],

  fetchingTeamByTeamId: false,
  fetchingTeamByTeamIdError: false,
  teamByTeamId: {},

  linkingUserToTeam: false,
  linkingUserToTeamError: false,

  fetchingUserByTeamId: false,
  fetchingUserByTeamIdError: false,
  userByTeamId: [],

  fetchingSalesManagementUsers: false,
  fetchingSalesManagementUsersError: false,
  salesManagementUsers: [],

  linkOrderViewById: false,
  linkOrderViewByIdError: false,
  teamOrder: [],

  fetchingOrderView: false,
  fetchingOrderViewError: false,
  orderView: [],

  updatingTeamsById: false,
  updatingTeamsByIdError: false,

  fetchingProductionExecutiveAndManager: false,
  fetchingProductionExecutiveAndManagerError: false,
  productionExecutiveAndManager: [],

  //edit
  setEditingTeamsAllocation: {},
  updateTeamsAllocationModal: false,
  addingUpdateTeamsAllocation: false,
  addingUpdateTeamsAllocationError: false,

  fetchingInventoryInTeam: false,
  fetchingInventoryInTeamError: false,
  inventoryTeam: [],

  fetchingClientInTeam: false,
  fetchingClientInTeamError: false,
  clientTeam: []

};

export const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_TEAMS_MODAL:
      return { ...state, addTeamsModal: action.payload };

    case types.SET_TEAMS_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_ADD_TEAMS_MEMBER_MODAL:
      return { ...state, addTeamMemberModal: action.payload };

    case types.GET_ONLY_MANAGEMENT_USERS_REQUEST:
      return { ...state, fetchingOnlyManagementUsers: true };
    case types.GET_ONLY_MANAGEMENT_USERS_SUCCESS:
      return {
        ...state,
        fetchingOnlyManagementUsers: false,
        onlyManagementUsers: action.payload,
      };
    case types.GET_ONLY_MANAGEMENT_USERS_FAILURE:
      return {
        ...state,
        fetchingOnlyManagementUsers: false,
        fetchingOnlyManagementUsersError: true,
      };

    case types.GET_ONLY_SALES_USERS_REQUEST:
      return { ...state, fetchingOnlySalesUsers: true };
    case types.GET_ONLY_SALES_USERS_SUCCESS:
      return {
        ...state,
        fetchingOnlySalesUsers: false,
        onlySalesUsers: action.payload,
      };
    case types.GET_ONLY_SALES_USERS_FAILURE:
      return {
        ...state,
        fetchingOnlySalesUsers: false,
        fetchingOnlySalesUsersError: true,
      };

    case types.ADD_TEAMS_CONTACT_REQUEST:
      return { ...state, addingTeamsContact: true };
    case types.ADD_TEAMS_CONTACT_SUCCESS:
      return {
        ...state,
        addingTeamsContact: false,
        addTeamsModal: false,
      };
    case types.ADD_TEAMS_CONTACT_FAILURE:
      return {
        ...state,
        addingTeamsContact: false,
        addingTeamsContactError: true,
        addTeamsModal: false,
      };

    /**
     * get the list of all distributors
     */
    case types.GET_TEAM_REQUEST:
      return { ...state, fetchingTeam: true };
    case types.GET_TEAM_SUCCESS:
      return {
        ...state,
        fetchingTeam: false,
        teamList: action.payload,
      };
    case types.GET_TEAM_FAILURE:
      return {
        ...state,
        fetchingTeam: false,
        fetchingTeamError: true,
      };

    case types.GET_TEAM_BY_TEAM_ID_REQUEST:
      return { ...state, fetchingTeamByTeamId: true };
    case types.GET_TEAM_BY_TEAM_ID_SUCCESS:
      return {
        ...state,
        fetchingTeamByTeamId: false,
        teamByTeamId: action.payload,
      };
    case types.GET_TEAM_BY_TEAM_ID_FAILURE:
      return {
        ...state,
        fetchingTeamByTeamId: false,
        fetchingTeamByTeamIdError: true,
      };

    /**
     * link user to team
     */
    case types.LINK_USER_TO_TEAM_REQUEST:
      return { ...state, linkingUserToTeam: true };
    case types.LINK_USER_TO_TEAM_SUCCESS:
      return {
        ...state,
        linkingUserToTeam: false,
        addTeamMemberModal: false,
      };
    case types.LINK_USER_TO_TEAM_FAILURE:
      return {
        ...state,
        linkingUserToTeam: false,
        linkingUserToTeamError: true,
        addTeamMemberModal: false,
      };

    /**
     * get all the user by using teamId
     */
    case types.GET_USER_BY_TEAMID_REQUEST:
      return { ...state, fetchingUserByTeamId: true };
    case types.GET_USER_BY_TEAMID_SUCCESS:
      return {
        ...state,
        fetchingUserByTeamId: false,
        userByTeamId: action.payload,
      };
    case types.GET_USER_BY_TEAMID_FAILURE:
      return {
        ...state,
        fetchingUserByTeamId: false,
        fetchingUserByTeamIdError: true,
      };

    case types.HANDLE_TEAMS_TRANSFER_MODAL:
      return { ...state, addTeamTransferModal: action.payload };

    case types.LINK_SALES_USER_TO_TEAM_REQUEST:
      return { ...state, linkingSalesUserToTeam: true };
    case types.LINK_SALES_USER_TO_TEAM_SUCCESS:
      return {
        ...state,
        linkingSalesUserToTeam: false,
        addTeamTransferModal: false,
      };
    case types.LINK_SALES_USER_TO_TEAM_FAILURE:
      return {
        ...state,
        linkingSalesUserToTeam: false,
        linkingSalesUserToTeamError: true,
        addTeamTransferModal: false,
      };

    case types.GET_SALES_MANAGER_USERS_REQUEST:
      return { ...state, fetchingSalesManagementUsers: true };
    case types.GET_SALES_MANAGER_USERS_SUCCESS:
      return {
        ...state,
        fetchingSalesManagementUsers: false,
        salesManagementUsers: action.payload,
      };
    case types.GET_SALES_MANAGER_USERS_FAILURE:
      return {
        ...state,
        fetchingSalesManagementUsers: false,
        fetchingSalesManagementUsersError: true,
      };

    case types.ADD_ORDER_VIEW_REQUEST:
      return { ...state, linkOrderViewById: true };
    case types.ADD_ORDER_VIEW_SUCCESS:
      return {
        ...state,
        linkOrderViewById: false,
        teamOrder: action.payload,
      };
    case types.ADD_ORDER_VIEW_FAILURE:
      return {
        ...state,
        linkOrderViewById: false,
        linkOrderViewByIdError: true,
      };

    case types.GET_ORDER_VIEW_REQUEST:
      return { ...state, fetchingOrderView: true };
    case types.GET_ORDER_VIEW_SUCCESS:
      return {
        ...state,
        fetchingOrderView: false,
        orderView: action.payload,
      };
    case types.GET_ORDER_VIEW_FAILURE:
      return {
        ...state,
        fetchingOrderView: false,
        fetchingOrderViewError: true,
      };

    case types.UPDATE_TEAMS_CARD_REQUEST:
      return { ...state, updatingTeamsById: true };
    case types.UPDATE_TEAMS_CARD_SUCCESS:
      return {
        ...state,
        updatingTeamsById: false,
        // distributorsByUserId: action.payload,
      };
    case types.UPDATE_TEAMS_CARD_FAILURE:
      return {
        ...state,
        updatingTeamsById: false,
        updatingTeamsByIdError: true,
      };

    //get Production executive and manager
    case types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_REQUEST:
      return { ...state, fetchingProductionExecutiveAndManager: true };
    case types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_SUCCESS:
      return {
        ...state,
        fetchingProductionExecutiveAndManager: false,
        productionExecutiveAndManager: action.payload,
      };
    case types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_FAILURE:
      return {
        ...state,
        fetchingProductionExecutiveAndManager: false,
        fetchingProductionExecutiveAndManagerError: true,
      };
    //addLocationsinteams
    case types.UPDATE_LOCATIONS_IN_TEAMS_REQUEST:
      return { ...state };
    case types.UPDATE_LOCATIONS_IN_TEAMS_SUCCESS:
      return {
        ...state,
        productionExecutiveAndManager: state.productionExecutiveAndManager.map(
          (item) =>
            item.userId === action.payload.userId
              ? { ...item, name: action.payload.name }
              : item
        ),
      };
    case types.UPDATE_LOCATIONS_IN_TEAMS_FAILURE:
      return {
        ...state,
      };

    case types.SET_EDIT_TEAMS:
      return { ...state, setEditingTeamsAllocation: action.payload };
    case types.HANDLE_UPDATE_TEAMS_ALLOCATION_MODAL:
      return { ...state, updateTeamsAllocationModal: action.payload };

    case types.UPDATE_TEAMS_ALLOCATION_REQUEST:
      return {
        ...state,
        addingUpdateTeamsAllocation: true,
      };
    case types.UPDATE_TEAMS_ALLOCATION_SUCCESS:
      return {
        ...state,
        teamsUpdateAllocation: action.payload,
        updateTeamsAllocationModal: false,
      };
    case types.UPDATE_TEAMS_ALLOCATION_FAILURE:
      return {
        ...state,
        addingUpdateTeamsAllocation: false,
        addingUpdateTeamsAllocationError: false,
        updateTeamsAllocationModal: false,
      };

    case types.GET_CLIENT_IN_TEAM_REQUEST:
      return { ...state, fetchingClientInTeam: true };
    case types.GET_CLIENT_IN_TEAM_SUCCESS:
      return {
        ...state,
        fetchingClientInTeam: false,
        clientTeam: action.payload,
      };
    case types.GET_CLIENT_IN_TEAM_FAILURE:
      return {
        ...state,
        fetchingClientInTeam: false,
        fetchingClientInTeamError: true,
      };

    case types.GET_INVENTORY_IN_TEAM_REQUEST:
      return { ...state, fetchingInventoryInTeam: true };
    case types.GET_INVENTORY_IN_TEAM_SUCCESS:
      return {
        ...state,
        fetchingInventoryInTeam: false,
        inventoryTeam: action.payload,
      };
    case types.GET_INVENTORY_IN_TEAM_FAILURE:
      return {
        ...state,
        fetchingInventoryInTeam: false,
        fetchingInventoryInTeamError: true,
      };

    default:
      return state;
  }
};
