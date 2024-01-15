
import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class ContactInvestDetailView extends Component {
  render() {
    const {
        contactInVestDetail: {
        tagWithCompany,
        designation,
        department,
        mobileNumber,
        emailId,
      },
    } = this.props;
    return (
      <>
        <ContactInvestItemRow 
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tagWithCompany} />
        <ContactInvestItemRow 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} />
        <ContactInvestItemRow  
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} />
        <ContactInvestItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ContactInvestItemRow //label="Mobile #" 
          label={<FormattedMessage
            id="app.mobileNumber"
            defaultMessage="Mobile #"
          />}
          value={mobileNumber} />
      </>
    );
  }
}
export default ContactInvestDetailView;

const ContactInvestItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" }}>{value}</SubTitle>
    </div>
  );
};
