import * as types from "./ContactInvestActionType";
import moment from "moment";
const initialState = {

};

export const contactInvestReducer = (state = initialState, action) => {
  switch (action.type) {

  
  default:
      return state;
  }


};

const newDateRange = (dateRange, newDate) =>
    dateRange.map((range) => {
        if (range.id === newDate.id) {
            return { ...range, isSelected: true };
        } else {
            return { ...range, isSelected: false };
        }
    });
