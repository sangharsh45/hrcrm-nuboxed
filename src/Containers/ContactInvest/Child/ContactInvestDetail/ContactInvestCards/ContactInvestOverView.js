import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class ContactInvestOverView extends Component {
  render() {
    const {
        contactInVestDetail: { salutation, firstName, middleName, lastName },
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
            &nbsp;
            <div class=" flex flex-col w-4/6">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {` ${fullName || ""} `}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ContactInvestOverView;
