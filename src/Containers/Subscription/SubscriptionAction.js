import * as types from "./SubscriptionActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../Config/Auth";

export const handleCreateSubscriptionDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CREATE_SUBSCRIPTION_DRAWER,
      payload: modalProps,
    });
  };