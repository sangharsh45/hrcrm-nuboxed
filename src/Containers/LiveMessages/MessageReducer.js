import * as types from "./LiveMessageActionType";
const initialState = {
    addMessageModal: false,
};
export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_MESSAGE_MODAL:
            return { ...state, addMessageModal: action.payload };


        default:
            return state;
        }
      };