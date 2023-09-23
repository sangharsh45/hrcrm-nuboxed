import * as types from "./ImportActionTypes";

const initialState = {
  exportingExcelFile: false,
  exportingExcelFileError: false,
  excelFileId: "",
  fetchingExcelHeaders: false,
  fetchingExcelHeadersError: false,
  excelHeaders: "",
  fetchingContactMatchingFields: false,
  fetchingContactMatchingFieldsError: false,
  contactMatchingFields: "",
  fetchingAccountMatchingFields: false,
  fetchingAccountMatchingFieldsError: false,
  accountMatchingFields: "",
  fetchingProductMatchingFields: false,
  fetchingProductMatchingFieldsError: false,
  productMatchingFields: "",

  fetchingServiceMatchingFields: false,
  fetchingServiceMatchingFieldsError: false,

  fetchingLeadsContactMatchingFields: false,
  fetchingLeadsContactMatchingFieldsError: false,
  leadsContactMatchingFields: "",
  serviceMatchingFields: "",

  fetchingLeadsAccountMatchingFields: false,
  fetchingLeadsAccountMatchingFieldsError: false,
  leadsAccountMatchingFields: "",

  mappingExcelToContact: false,
  mappingExcelToContactError: false,
  mappingExcelToAccount: false,
  mappingExcelToAccountError: false,
  mappingExcelToProduct: false,
  mappingExcelToProductError: false,

  mappingExcelToService: false,
  mappingExcelToServiceError: false,

  mappingExcelToLeadsContact: false,
  mappingExcelToLeadsContactError: false,

  mappingExcelToLeadsAccount: false,
  mappingExcelToLeadsAccountError: false,
};

export const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXCEL_IMPORT_REQUEST:
      return { ...state, exportingExcelFile: true };
    case types.EXCEL_IMPORT_SUCCESS:
      return {
        ...state,
        exportingExcelFile: false,
        excelFileId: action.payload,
      };
    case types.EXCEL_IMPORT_FAILURE:
      return {
        ...state,
        exportingExcelFile: false,
        exportingExcelFileError: true,
      };

    case types.GET_EXCEL_HEADERS_REQUEST:
      return { ...state, fetchingExcelHeaders: true };
    case types.GET_EXCEL_HEADERS_SUCCESS:
      return {
        ...state,
        fetchingExcelHeaders: false,
        excelHeaders: action.payload,
      };
    case types.GET_EXCEL_HEADERS_FAILURE:
      return {
        ...state,
        fetchingExcelHeaders: false,
        fetchingExcelHeadersError: true,
      };

    case types.GET_CONTACT_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingContactMatchingFields: true };
    case types.GET_CONTACT_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingContactMatchingFields: false,
        contactMatchingFields: action.payload,
      };
    case types.GET_CONTACT_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingContactMatchingFields: false,
        fetchingContactMatchingFieldsError: true,
      };

    case types.GET_ACCOUNT_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingAccountMatchingFields: true };
    case types.GET_ACCOUNT_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingAccountMatchingFields: false,
        accountMatchingFields: action.payload,
      };
    case types.GET_ACCOUNT_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingAccountMatchingFields: false,
        fetchingAccountMatchingFieldsError: true,
      };

    case types.GET_PRODUCT_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingProductMatchingFields: true };
    case types.GET_PRODUCT_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingProductMatchingFields: false,
        productMatchingFields: action.payload,
      };
    case types.GET_PRODUCT_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingProductMatchingFields: false,
        fetchingProductMatchingFieldsError: true,
      };

    case types.GET_SERVICE_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingServiceMatchingFields: true };
    case types.GET_SERVICE_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingServiceMatchingFields: false,
        serviceMatchingFields: action.payload,
      };
    case types.GET_SERVICE_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingServiceMatchingFields: false,
        fetchingServiceMatchingFieldsError: true,
      };

    case types.GET_LEADS_CONTACT_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingLeadsContactMatchingFields: true };
    case types.GET_LEADS_CONTACT_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingLeadsContactMatchingFields: false,
        leadsContactMatchingFields: action.payload,
      };
    case types.GET_LEADS_CONTACT_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingLeadsContactMatchingFields: false,
        fetchingLeadsContactMatchingFieldsError: true,
      };

    case types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_REQUEST:
      return { ...state, fetchingLeadsAccountMatchingFields: true };
    case types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_SUCCESS:
      return {
        ...state,
        fetchingLeadsAccountMatchingFields: false,
        leadsAccountMatchingFields: action.payload,
      };
    case types.GET_LEADS_ACCOUNT_MATCHING_FIELDS_FAILURE:
      return {
        ...state,
        fetchingLeadsAccountMatchingFields: false,
        fetchingLeadsAccountMatchingFieldsError: true,
      };

    case types.MAP_EXCEL_TO_CONTACT_REQUEST:
      return { ...state, mappingExcelToContact: true };
    case types.MAP_EXCEL_TO_CONTACT_SUCCESS:
      return { ...state, mappingExcelToContact: false };
    case types.MAP_EXCEL_TO_CONTACT_FAILURE:
      return {
        ...state,
        mappingExcelToContact: false,
        mappingExcelToContactError: true,
      };

    case types.MAP_EXCEL_TO_ACCOUNT_REQUEST:
      return { ...state, mappingExcelToAccount: true };
    case types.MAP_EXCEL_TO_ACCOUNT_SUCCESS:
      return { ...state, mappingExcelToAccount: false };
    case types.MAP_EXCEL_TO_ACCOUNT_FAILURE:
      return {
        ...state,
        mappingExcelToAccount: false,
        mappingExcelToAccountError: true,
      };

    case types.MAP_EXCEL_TO_PRODUCT_REQUEST:
      return { ...state, mappingExcelToProduct: true };
    case types.MAP_EXCEL_TO_PRODUCT_SUCCESS:
      return { ...state, mappingExcelToProduct: false };
    case types.MAP_EXCEL_TO_PRODUCT_FAILURE:
      return {
        ...state,
        mappingExcelToProduct: false,
        mappingExcelToProductError: true,
      };

    case types.MAP_EXCEL_TO_SERVICE_REQUEST:
      return { ...state, mappingExcelToService: true };
    case types.MAP_EXCEL_TO_SERVICE_SUCCESS:
      return { ...state, mappingExcelToService: false };
    case types.MAP_EXCEL_TO_SERVICE_FAILURE:
      return {
        ...state,
        mappingExcelToService: false,
        mappingExcelToServiceError: true,
      };

    case types.MAP_EXCEL_TO_LEADS_CONTACT_REQUEST:
      return { ...state, mappingExcelToLeadsContact: true };
    case types.MAP_EXCEL_TO_LEADS_CONTACT_SUCCESS:
      return { ...state, mappingExcelToLeadsContact: false };
    case types.MAP_EXCEL_TO_LEADS_CONTACT_FAILURE:
      return {
        ...state,
        mappingExcelToLeadsContact: false,
        mappingExcelToLeadsContactError: true,
      };

    case types.MAP_EXCEL_TO_LEADS_ACCOUNT_REQUEST:
      return { ...state, mappingExcelToLeadsAccount: true };
    case types.MAP_EXCEL_TO_LEADS_ACCOUNT_SUCCESS:
      return { ...state, mappingExcelToLeadsAccount: false };
    case types.MAP_EXCEL_TO_LEADS_ACCOUNT_FAILURE:
      return {
        ...state,
        mappingExcelToLeadsAccount: false,
        mappingExcelToLeadsAccountError: true,
      };

    default:
      return state;
  }
  return state;
};
