import * as types from "./InvestorActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "list",

  fetchingInvestors: false,
  fetchingInvestorsError: false,
  investorsbyId: [],

  fetchingInvestorRecords: false,
  fetchingInvestorRecordsError: false,
  investorRecord:[],

  fetchingInvestorSearchData: false,
  fetchingInvestorSearchDataError: false,

  fetchingInvestorsfilterdata: false,
  fetchingInvestorsfilterdataError: false,

  investorActivityModal:false,

  addingInvestor: false,
  addInvestorModal: false,
  updateInvestorModal: false,

  updateInvestorById: false,
  updateInvestorByIdError: false,

  fetchingInvestorDetailsById: false,
  fetchingInvestorDetailsByIdError: false,
  investorDetails: {},

  fetchingallEmployeeList: false,
  fetchingallEmployeeListError: false,
  allEmployeeList:[],

  fetchingsInvestorContact: false,
  fetchingsInvestorContactError: false,
  contactsbyInvestorId: [],

  addDrawerInvestorNotesModal:false,

  fetchingDocumentsByInvestorId: false,
  fetchingDocumentsByInvestorIdError: false,
  documentsByInvestorId: [],

  fetchingNoteByInvestorId: false,
  fetchingNoteByInvestorIdError: false,
  investorNoteslist: [],
  addingNotesByInvestorId: false,
  addingNotesByInvestorIdError: false,

  fetchingInvoiceByInvestorId: false,
  fetchingInvoiceByInvestorIdError: false,
  invoiceOfInvestor: [],

  openInvestorContactModal:false,
  addingInvestorContact: false,
  addingInvestorContactError: false,

  opendocumentUploadModal:false,
  addingDocumentByInvestorId: false,
  addingDocumentByInvestorIdError: false,
  
  invstrContactUpdateModal:false,

  fetchingInvestorData: false,
  fetchingInvestorDataError:false,
  investorData:[],

};
export const investorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INVESTOR_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_INVESTORS_BY_ID_REQUEST:
      return { ...state, fetchingInvestors: true };
    case types.GET_INVESTORS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingInvestors: false,
        investorsbyId: [...state.investorsbyId, ...action.payload],
        clearbit:null
      };
    case types.GET_INVESTORS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInvestors: false,
        fetchingInvestorsError: true,
      };

      case types.GET_INVESTORS_FILTER_DATA_REQUEST:
        return { ...state, fetchingInvestorsfilterdata: true };
      case types.GET_INVESTORS_FILTER_DATA_SUCCESS:
        return {
          ...state,
          fetchingInvestorsfilterdata: false,
          investorsbyId: action.payload,
        };
      case types.GET_INVESTORS_FILTER_DATA_FAILURE:
        return {
          ...state,
          fetchingInvestorsfilterdata: false,
          fetchingInvestorsfilterdataError: true,
        };


    case types.EMPTY_INVESTOR_LIST:
      return { ...state, investorsbyId: [] };

    case types.ADD_INVESTOR_REQUEST:
      return { ...state, addingInvestor: true };
    case types.ADD_INVESTOR_SUCCESS:
      return {
        ...state,
        addingInvestor: false,
        addInvestorModal: false,
        investorsbyId: [action.payload, ...state.investorsbyId],
        clearbit: null
      };
    case types.ADD_INVESTOR_FAILURE:
      return { ...state, addingInvestor: false, addInvestorModal: false };

    case types.UPDATE_INVESTOR_BY_ID_REQUEST:
      return { ...state, addInvestorModal: action.payload };
    case types.HANDLE_INVESTOR_UPDATE_MODAL:
      return { ...state, updateInvestorModal: action.payload };

      case types.HANDLE_INVESTOR_MODAL:
      return { ...state, addInvestorModal: action.payload };


    case types.UPDATE_INVESTOR_BY_ID_REQUEST:
      return { ...state, updateInvestorById: true };
    case types.UPDATE_INVESTOR_BY_ID_SUCCESS:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorModal: false,
        investorsbyId: state.investorsbyId.map((item) => {
          if (item.investorId === action.payload.investorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_INVESTOR_BY_ID_FAILURE:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorByIdError: true,
      };
    case types.GET_INVESTOR_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingInvestorDetailsById: true };
    case types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingInvestorDetailsById: false,
        investorDetails: action.payload,
      };
    case types.GET_INVESTOR_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInvestorDetailsById: false,
        fetchingInvestorDetailsByIdError: true,
      };

    case types.GET_INVESTOR_CONTACT_REQUEST:
      return { ...state, fetchingsInvestorContact: true };
    case types.GET_INVESTOR_CONTACT_SUCCESS:
      return {
        ...state,
        fetchingsInvestorContact: false,
        contactsbyInvestorId: action.payload,
      };
    case types.GET_INVESTOR_CONTACT_FAILURE:
      return {
        ...state,
        fetchingsInvestorContact: false,
        fetchingsInvestorContactError: true,
      };

    case types.GET_INVESTOR_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByInvestorId: true,
        fetchingDocumentsByInvestorIdError: false,
      };
    case types.GET_INVESTOR_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByInvestorId: false,
        fetchingDocumentsByInvestorIdError: false,
        documentsByInvestorId: action.payload,
      };
    case types.GET_INVESTOR_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByInvestorId: false,
        fetchingDocumentsByInvestorIdError: true,
      };

    case types.GET_NOTES_LIST_BY_INVESTOR_ID_REQUEST:
      return {
        ...state,
        fetchingNoteByInvestorId: true,
        fetchingNoteByInvestorIdError: false,
      };
    case types.GET_NOTES_LIST_BY_INVESTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingNoteByInvestorId: false,
        fetchingNoteByInvestorIdError: false,
        investorNoteslist: action.payload,
      };
    case types.GET_NOTES_LIST_BY_INVESTOR_ID_FAILURE:
      return {
        ...state,
        fetchingNoteByInvestorId: false,
        fetchingNoteByInvestorIdError: true,
      };

      case types.ADD_INVESTOR_NOTES_REQUEST:
        return {
          ...state,
          addingNotesByInvestorId: true,
        };
      case types.ADD_INVESTOR_NOTES_SUCCESS:
        return {
          ...state,
          addingNotesByInvestorId: false,
          // addInvestorSpeechModal: false,
        };
      case types.ADD_INVESTOR_NOTES_FAILURE:
        return {
          ...state,
          addingNotesByInvestorId: false,
          addingNotesByInvestorIdError: true,
        };

        case types.GET_INVESTOR_INVOICE_REQUEST:
          return {
            ...state,
            fetchingInvoiceByInvestorId: true,
            fetchingInvoiceByInvestorIdError: false,
          };
        case types.GET_INVESTOR_INVOICE_SUCCESS:
          return {
            ...state,
            fetchingInvoiceByInvestorId: false,
            fetchingInvoiceByInvestorIdError: false,
            invoiceOfInvestor: action.payload,
          };
        case types.GET_INVESTOR_INVOICE_FAILURE:
          return {
            ...state,
            fetchingInvoiceByInvestorId: false,
            fetchingInvoiceByInvestorIdError: true,
          };
    
          case types.HANDLE_INVESTOR_CONTACT_MODAL:
            return { ...state, openInvestorContactModal: action.payload };

            case types.ADD_INVESTOR_CONTACT_REQUEST:
              return { ...state, addingInvestorContact: true };
            case types.ADD_INVESTOR_CONTACT_SUCCESS:
              return {
                ...state,
                addingInvestorContact: false,
                openInvestorContactModal: false,
                contactsbyInvestorId:[action.payload,...state.contactsbyInvestorId]
              };
            case types.ADD_INVESTOR_CONTACT_FAILURE:
              return {
                ...state,
                addingInvestorContactError: false,
                openInvestorContactModal: false,
              };        

              case types.HANDLE_INVESTOR_DOCUMENT_UPLOAD_MODAL:
                return { ...state, opendocumentUploadModal: action.payload };             
              
     case types.CREATE_INVESTOR_DOCUMENT_REQUEST:
                  return {
                    ...state,
                    addingDocumentByInvestorId: true,
                    addingDocumentByInvestorIdError: false,
                  };
                case types.CREATE_INVESTOR_DOCUMENT_SUCCESS:
                  return {
                    ...state,
                    addingDocumentByInvestorId: false,
                    addingDocumentByInvestorIdError: false,
                    opendocumentUploadModal:false,
                  };
                case types.CREATE_INVESTOR_DOCUMENT_FAILURE:
                  return {
                    ...state,
                    addingDocumentByInvestorId: false,
                    addingDocumentByInvestorIdError: true,
                  }; 
    
                  case types.HANDLE_UPDATE_INVESTOR_CONTACT_MODAL:
                    return { ...state, invstrContactUpdateModal: action.payload };             
              
                    case types.UPDATE_INVESTOR_CONTACT_BY_ID_REQUEST:
                      return { ...state, updateInvestorContactById: true };
                    case types.UPDATE_INVESTOR_CONTACT_BY_ID_SUCCESS:
                      return {
                        ...state,
                        updateInvestorContactById: false,
                        invstrContactUpdateModal: false,
                        contactsbyInvestorId: state.contactsbyInvestorId.map((item) => {
                          if (item.contactId === action.payload.contactId) {
                            return action.payload;
                          } else {
                            return item;
                          }
                        }),
                      };
                      case types.UPDATE_INVESTOR_CONTACT_BY_ID_FAILURE:
                        return {
                          ...state,
                          updateInvestorContactById: false,
                          updateInvestorContactByIdError: true,
                        };  
                        
                        case types.GET_INVESTOR_DATA_REQUEST:
                          return { ...state, fetchingInvestorData: true };
                        case types.GET_INVESTOR_DATA_SUCCESS:
                          return {
                            ...state,
                            fetchingInvestorData: false,
                            investorData: action.payload,
                          };
                        case types.GET_INVESTOR_DATA_FAILURE:
                          return {
                            ...state,
                            fetchingInvestorData: false,
                            fetchingInvestorDataError: true,
                          };

                          case types.GET_INVESTOR_RECORDS_REQUEST:
                            return { ...state, fetchingInvestorRecords: true };
                          case types.GET_INVESTOR_RECORDS_SUCCESS:
                            return {
                              ...state,
                              fetchingInvestorRecords: false,
                              investorRecord: action.payload,
                            };
                          case types.GET_INVESTOR_RECORDS_FAILURE:
                            return {
                              ...state,
                              fetchingInvestorRecords: false,
                              fetchingInvestorRecordsError: true,
                            };

                            case types.GET_INVESTOR_SEARCH_REQUEST:
                              return { ...state, fetchingInvestorSearchData: true };
                            case types.GET_INVESTOR_SEARCH_SUCCESS:
                              return {
                                ...state,
                                fetchingInvestorSearchData: false,
                                investorsbyId: action.payload,
                                // serachedData: action.payload,
                              };
                            case types.GET_INVESTOR_SEARCH_FAILURE:
                              return { ...state, fetchingInvestorSearchDataError: true };
                        
                              case types.HANDLE_INVESTOR_NOTES_DRAWER_MODAL:
                                return { ...state, addDrawerInvestorNotesModal: action.payload };                 


                                case types.GET_ALL_EMPLOYEE_LIST_REQUEST:
                                  return { ...state, fetchingallEmployeeList: true };
                                case types.GET_ALL_EMPLOYEE_LIST_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingallEmployeeList: false,
                                    allEmployeeList: action.payload,
                                  };
                                case types.GET_ALL_EMPLOYEE_LIST_FAILURE:
                                  return {
                                    ...state,
                                    fetchingallEmployeeList: false,
                                    fetchingallEmployeeListError: true,
                                  };

                                  case types.HANDLE_ACTIVITY_MODAL:
        return { ...state, investorActivityModal: action.payload };
                                    
default:
      return state;
  }
};
