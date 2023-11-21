import * as types from "./OrderActionTypes";
import moment from "moment";

const initialState = {
  viewType: "list",

  addOrderModal: false,

  addNotesInOrder:false,

  addStatusOfOrder:false,

  fetchingOrderCount: false,
  fetchingOrderCountError: false,
  orderCount:{},

  fetchingOrderList: false,
  fetchingOrderListError: false,
  orderList: [],

  fetchingAllOrderCount: false,
  fetchingAllOrderCountError: false,
  allOrderCount:{},


  fetchingCustomerList: false,
  fetchingCustomerListError: false,
  customerList: [],

  fetchingDistributorList: false,
  fetchingDistributorListError: false,
  distributorList: [],

  addPaidButtonModal:false,


  fetchingDistributorOrderList: false,
  fetchingDistributorOrderListError: false,
  distributororderList: [],

  DistributorDeliveryDate: false,
  DistributorDeliveryDateError: false,
  disDeliveryDate: [],

  CustomerDeliveryDate: false,
  CustomerDeliveryDateError: false,
  cusDeliveryDate: [],

  addOrderProductModal: false,

  addingCustomerOrderId: false,
  addingCustomerOrderIdError: false,

  fetchingAllOrderList: false,
  fetchingAllOrderListError: false,
  allOrderList: [],

  fetchingOrderById: false,
  fetchingOrderByIdError: false,
  orderShowById:[],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_ORDER_MODAL:
      return { ...state, addOrderModal: action.payload };

    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, fetchingOrderList: true };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingOrderList: false,
        orderList: action.payload,
      };
    case types.GET_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingOrderList: false,
        fetchingOrderListError: true,
      };

    case types.GET_DISTRIBUTOR_LIST_REQUEST:
      return { ...state, fetchingDistributorList: true };
    case types.GET_DISTRIBUTOR_LIST_SUCCESS:
      return {
        ...state,
        fetchingDistributorList: false,
        distributorList: action.payload,
      };
    case types.GET_DISTRIBUTOR_LIST_FAILURE:
      return {
        ...state,
        fetchingDistributorList: false,
        fetchingDistributorListError: true,
      };


    case types.GET_CUSTOMER_LIST_REQUEST:
      return { ...state, fetchingCustomerList: true };
    case types.GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        fetchingCustomerList: false,
        customerList: action.payload,
      };
    case types.GET_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        fetchingCustomerList: false,
        fetchingCustomerListError: true,
      };


    case types.GET_DISTRIBUTOR_ORDER_LIST_REQUEST:
      return { ...state, fetchingDistributorOrderList: true };
    case types.GET_DISTRIBUTOR_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingDistributorOrderList: false,
        distributororderList: action.payload,
      };
    case types.GET_DISTRIBUTOR_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingDistributorOrderList: false,
        fetchingDistributorOrderListError: true,
      };

    //DISTRIBUTOR
    case types.DISTRIBUTOR_DELIVERY_DATE_REQUEST:
      return {
        ...state,
        DistributorDeliveryDate: true,
      };
    case types.DISTRIBUTOR_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        DistributorDeliveryDate: false,
        disDeliveryDate: action.payload,
      };
    case types.DISTRIBUTOR_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        DistributorDeliveryDate: false,
        DistributorDeliveryDateError: true,
      };

    //CUSTOMER
    case types.CUSTOMER_DELIVERY_DATE_REQUEST:
      return {
        ...state,
        CustomerDeliveryDate: true,
      };
    case types.CUSTOMER_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        CustomerDeliveryDate: false,
        cusDeliveryDate: action.payload,
      };
    case types.CUSTOMER_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        CustomerDeliveryDate: false,
        CustomerDeliveryDateError: true,
      };

    case types.HANDLE_ORDER_PRODUCT_MODAL:
      return { ...state, addOrderProductModal: action.payload };

    case types.SUBMIT_CUSTOMER_ORDER_ID_REQUEST:
      return {
        ...state,
        addingCustomerOrderId: true,
      };
    case types.SUBMIT_CUSTOMER_ORDER_ID_SUCCESS:
      return {
        ...state,
        addingCustomerOrderId: false,
      };
    case types.SUBMIT_CUSTOMER_ORDER_ID_FAILURE:
      return {
        ...state,
        addingCustomerOrderId: false,
        addingCustomerOrderIdError: true,
      };

    case types.GET_ALL_ORDER_LIST_REQUEST:
      return { ...state, fetchingAllOrderList: true };
    case types.GET_ALL_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllOrderList: false,
        allOrderList: action.payload,
      };
    case types.GET_ALL_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingAllOrderList: false,
        fetchingAllOrderListError: true,
      };
      case types.GET_ORDER_BY_ID_REQUEST:
        return { ...state, fetchingOrderById: true };
      case types.GET_ORDER_BY_ID_SUCCESS:
        return {
          ...state,
          fetchingOrderById: false,
          orderShowById: action.payload,
        };
      case types.GET_ORDER_BY_ID_FAILURE:
        return {
          ...state,
          fetchingOrderById: false,
          fetchingOrderByIdError: true,
        };


        case types.GET_ORDER_COUNT_REQUEST:
          return { ...state, fetchingOrderCount: true };
        case types.GET_ORDER_COUNT_SUCCESS:
          return {
            ...state,
            fetchingOrderCount: false,
            orderCount: action.payload,
          };
        case types.GET_ORDER_COUNT_FAILURE:
          return {
            ...state,
            fetchingOrderCount: false,
            fetchingOrderCountError: true,
          };


          case types.GET_ALL_ORDER_COUNT_REQUEST:
            return { ...state, fetchingAllOrderCount: true };
          case types.GET_ALL_ORDER_COUNT_SUCCESS:
            return {
              ...state,
              fetchingAllOrderCount: false,
              allOrderCount: action.payload,
            };
          case types.GET_ALL_ORDER_COUNT_FAILURE:
            return {
              ...state,
              fetchingAllOrderCount: false,
              fetchingAllOrderCountError: true,
            };

            case types.HANDLE_NOTES_MODAL_IN_ORDER:
      return { ...state, addNotesInOrder: action.payload };

      case types.HANDLE_STATUS_OF_ORDER_MODAL:
      return { ...state, addStatusOfOrder: action.payload };

      case types.HANDLE_PAID_BUTTON_MODAL:
      return { ...state, addPaidButtonModal: action.payload };
    default:
      return state;
  }
};