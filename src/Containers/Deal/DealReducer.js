import * as types from "./DealActionType";
import dayjs from "dayjs";

const initialState = {
  viewType: "table",

  fetchingDeal: false,
  fetchingDealError:false,
  dealsByuserId:[],

  addDrawerDealsNotesModal:false,

  fetchingDealLinkedWorkflow: false,
  fetchingDealLinkedWorkflowError: false,
  dealLinkWorkflow:[],

  fetchingDealLinkedStages: false,
  fetchingDealLinkedStagesError: false,
  dealLinkStages:[],

  linkingDeal: false,
  linkingDealError: false,


  creatingDeal: false,
  creatingDealError: false,
  opencreateDealModal: false,

  fetchDealdetails: false,
  fetchDealdetailsError:false,
  dealDetailsbyID:{},

  fetchingDelasRecords: false,
  fetchingDelasRecordsError: false,
  dealsRecord:{},


  updateDealbyID: false,
  updateDealbyIDError: false,
  openupdateDealModal:false,

  fetchingAllDeals: false,
  fetchingAllDealsError:false,
  aLLdealsList:[],

  fetchingDealStages: false,
  fetchingStagesError:false,
  dealStages: [],

  openDealContactModal:false,

  fetchingDealContactList: false,
  fetchingDealContactListError:false,
  dealContactList:[],

  addingDealContact: false, 
};
export const dealReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEAL_VIEW_TYPE:
      return { ...state, viewType: action.payload };

      case types.GET_DEAL_REQUEST:
        return { ...state, fetchingDeal: true };
      case types.GET_DEAL_SUCCESS:
        return {
          ...state,
          fetchingDeal: false,
          dealsByuserId: [...state.dealsByuserId,...action.payload],
        };
      case types.GET_DEAL_FAILURE:
        return {
          ...state,
          fetchingDeal: false,
          fetchingDealError: true,
        };

        case types.CREATE_DEAL_REQUEST:
          return { ...state, creatingDeal: true };
        case types.CREATE_DEAL_SUCCESS:
          return {
            ...state,
            creatingDeal: false,
            opencreateDealModal: false,
           dealsByuserId :[action.payload,...state.dealsByuserId]
          };
        case types.CREATE_DEAL_FAILURE:
          return {
            ...state,
            creatingDeal: false,
            creatingDealError: true,
          };
          case types.HANDLE_DEAL_MODAL:
            return { ...state, opencreateDealModal: action.payload };

            case types.GET_DEAL_DETAILS_BY_ID_REQUEST:
              return { ...state, fetchDealdetails: true };
            case types.GET_DEAL_DETAILS_BY_ID_SUCCESS:
              return {
                ...state,
                fetchDealdetails: false,
                dealDetailsbyID: action.payload,
              };
            case types.GET_DEAL_DETAILS_BY_ID_FAILURE:
              return {
                ...state,
                fetchDealdetails: false,
                fetchDealdetailsError: true,
              };
      
              case types.UPDATE_DEAL_BY_ID_REQUEST:
                return { ...state, updateDealbyID: true };
              case types.UPDATE_DEAL_BY_ID_SUCCESS:
                return {
                  ...state,
                  updateDealbyID: false,
                  openupdateDealModal: false,
                  dealsByuserId: state.dealsByuserId.map((item) => {
                    if (item.invOpportunityId === action.payload.invOpportunityId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_DEAL_BY_ID_FAILURE:
                return {
                  ...state,
                  updateDealbyID: false,
                  updateDealbyIDError: true,
                };      
      
                case types.HANDLE_UPDATE_DEAL_MODAL:
                  return { ...state, openupdateDealModal: action.payload };
                  
                  case types.GET_ALL_DEALS_REQUEST:
                    return { ...state, fetchingAllDeals: true };
                  case types.GET_ALL_DEALS_SUCCESS:
                    return {
                      ...state,
                      fetchingAllDeals: false,
                      aLLdealsList: action.payload,
                    };
                  case types.GET_ALL_DEALS_FAILURE:
                    return {
                      ...state,
                      fetchingAllDeals: false,
                      fetchingAllDealsError: true,
                    };  

                    case types.EMPTY_DEALS_LIST:
                      return { ...state, dealsByuserId: [] }; 
      
                      case types.GET_ALL_DEAL_STAGES_REQUEST:
                        return { ...state, fetchingDealStages: true };
                      case types.GET_ALL_DEAL_STAGES_SUCCESS:
                        return {
                          ...state,
                          fetchingDealStages: false,
                          dealStages: action.payload,
                        };
                      case types.GET_ALL_DEAL_STAGES_FAILURE:
                        return {
                          ...state,
                          fetchingStages: false,
                          fetchingStagesError: true,
                        };        
                        case types.HANDLE_DEAL_CONTACT_MODAL:
                          return { ...state, openDealContactModal: action.payload };                      
                        
                          case types.GET_DEALS_CONTACT_LIST_REQUEST:
                            return { ...state, fetchingDealContactList: true };
                          case types.GET_DEALS_CONTACT_LIST_SUCCESS:
                            return {
                              ...state,
                              fetchingDealContactList: false,
                              dealContactList: action.payload,
                            };
                          case types.GET_DEALS_CONTACT_LIST_FAILURE:
                            return {
                              ...state,
                              fetchingDealContactList: false,
                              fetchingDealContactListError: true,
                            };
                    
                            case types.ADD_DEAL_CONTACT_REQUEST:
                              return { ...state, addingDealContact: true };
                            case types.ADD_DEAL_CONTACT_SUCCESS:
                              return { ...state, addingDealContact: false, 
                                openDealContactModal: false,
                                dealContactList:[action.payload,...state.dealContactList]
                               };
                            case types.ADD_DEAL_CONTACT_FAILURE:
                              return { ...state, addingDealContact: false, openDealContactModal: false };


                              case types.GET_DEAL_LINKED_STAGES_REQUEST:
                                return { ...state, fetchingDealLinkedStages: true };
                              case types.GET_DEAL_LINKED_STAGES_SUCCESS:
                                return {
                                  ...state,
                                  fetchingDealLinkedStages: false,
                                  dealLinkStages: action.payload,
                                };
                              case types.GET_DEAL_LINKED_STAGES_FAILURE:
                                return {
                                  ...state,
                                  fetchingDealLinkedStages: false,
                                  fetchingDealLinkedStagesError: true,
                                };

                                case types.GET_DEAL_LINKED_WORKFLOW_REQUEST:
                                  return { ...state, fetchingDealLinkedWorkflow: true };
                                case types.GET_DEAL_LINKED_WORKFLOW_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingDealLinkedWorkflow: false,
                                    dealLinkWorkflow: action.payload,
                                  };
                                case types.GET_DEAL_LINKED_WORKFLOW_FAILURE:
                                  return {
                                    ...state,
                                    fetchingDealLinkedWorkflow: false,
                                    fetchingDealLinkedWorkflowError: true,
                                  };

           case types.GET_DEALS_RECORDS_REQUEST:
          return { ...state, fetchingDelasRecords: true };
        case types.GET_DEALS_RECORDS_SUCCESS:
          return {
            ...state,
            fetchingDelasRecords: false,
            dealsRecord: action.payload,
          };
        case types.GET_DEALS_RECORDS_FAILURE:
          return {
            ...state,
            fetchingDelasRecords: false,
            fetchingDelasRecordsError: true,
          };
          case types.HANDLE_DEALS_NOTES_DRAWER_MODAL:
            return { ...state, addDrawerDealsNotesModal: action.payload };


            case types.LINK_DEAL_REQUEST:
              return {
                ...state,
                linkingDeal: true,
              };
            case types.LINK_DEAL_SUCCESS:
              return {
                ...state,
                linkingDeal: false,
               // addTagProfileModal: false,
               dealsByuserId: state.dealsByuserId.map(
                  (recruit, i) => {
                    if (recruit.invOpportunityId === action.payload.invOpportunityId) {
                      return action.payload;
                    } else {
                      return recruit;
                    }
                  }
                ),
              };
              case types.LINK_DEAL_FAILURE:
             return {
               ...state,
               linkingDeal: false,
               linkingDealError: true,
             };
                       
                            
    default:
      return state;
  }
};
