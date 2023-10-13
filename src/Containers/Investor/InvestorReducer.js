import * as types from "./InvestorActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "list",

  fetchingInvestors: false,
  fetchingInvestorsError: false,
  investorsbyId: [],

  addingInvestor: false,
  addInvestorModal: false,
  updateInvestorModal: false,

  updateInvestorById: false,
  updateInvestorByIdError: false,

  fetchingInvestorDetailsById: false,
  fetchingInvestorDetailsByIdError: false,
  investorDetails: {},

  fetchingsInvestorContact: false,
  fetchingsInvestorContactError: false,
  contactsbyInvestorId: [],

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
      };
    case types.GET_INVESTORS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInvestors: false,
        fetchingInvestorsError: true,
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
    

    default:
      return state;
  }
};
