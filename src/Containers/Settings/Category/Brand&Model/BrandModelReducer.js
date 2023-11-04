import * as types from "./BrandModelType";
import moment from "moment";

const initialState = {
    fetchingBrandModel: false,
    fetchingBrandModelError: false,
    brandModel: [],

    addingBrandModel: false,
    addingBrandModelError: false,

    updatingBrandModel: false,
    updatingBrandModelError: false,
};

export const brandmodelReducer = (state = initialState, action) => {
    switch (action.type) {
        //get department

        case types.ADD_BRAND_MODEL_REQUEST:
            return { ...state, addingBrandModel: true };
        case types.ADD_BRAND_MODEL_SUCCESS:
            return {
                ...state,
                addingBrandModel: false,
                brandModel: [...state.brandModel, action.payload],
            };
        case types.ADD_BRAND_MODEL_FAILURE:
            return { ...state, addingBrandModel: false, addingBrandModelError: true };

        /**
         * get the list of all reasons
         */
        case types.GET_BRAND_MODEL_REQUEST:
            return { ...state, fetchingBrandModel: true };
        case types.GET_BRAND_MODEL_SUCCESS:
            return { ...state, fetchingBrandModel: false, brandModel: action.payload };
        case types.GET_BRAND_MODEL_FAILURE:
            return { ...state, fetchingBrandModel: false, fetchingBrandModelError: true };

        //update
        case types.UPDATE_BRAND_MODEL_REQUEST:
            return { ...state, updatingBrandModel: true };
        case types.UPDATE_BRAND_MODEL_SUCCESS:
            return {
                ...state,
                updatingBrandModel: false,
                brandModel: state.brandModel.map((item) =>
                    item.clientId === action.payload.clientId ? action.payload : item
                ),
            };
        case types.UPDATE_BRAND_MODEL_FAILURE:
            return {
                ...state,
                updatingBrandModel: false,
                updatingBrandModelError: true,
            };

        default:
            return state;
    }
};
