import { base_url } from "../../Config/Auth";
import axios from "axios";

/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  axios
    .post(`${base_url}/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      cb && cb();
    });
};
export const addFeedbackNote = (feedback, cb) => (dispatch) => {
  axios
    .post(`${base_url}/feedback`, feedback)
    .then((res) => {
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      cb && cb();
    });
};
