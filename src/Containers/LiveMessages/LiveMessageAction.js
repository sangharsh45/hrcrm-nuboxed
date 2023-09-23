import * as types from "./LiveMessageActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url, } from "../../Config/Auth";
import { message } from "antd";


export const handleMessageModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_MESSAGE_MODAL,
      payload: modalProps,
    });
  };