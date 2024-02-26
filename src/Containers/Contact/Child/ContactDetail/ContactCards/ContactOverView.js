import React, { Component } from "react";
import {  MultiAvatar } from "../../../../../Components/UI/Elements";

class ContactOverView extends Component {
  render() {
    const {
      contact: { salutation, firstName, middleName, lastName },
      toggleViewType,
    } = this.props;
    const fullName = `${salutation || ""} ${firstName || ""} ${middleName ||
      ""} ${lastName || ""} `;
    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-8/12"
          >
            <div class=" w-1/4">
              <MultiAvatar />
            </div>
         
            <div class=" flex flex-col w-4/5">
            <div class=" w-wk text-[#444] overflow-hidden text-lg textOverflow-ellipsis">
                {` ${fullName || ""} `}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ContactOverView;
