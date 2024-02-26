import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class ContactDetailView extends Component {
  render() {
    const {
      contact: {
        tagWithCompany,
        designation,
        department,
        mobileNumber,
        emailId,
      },
    } = this.props;
    return (
      <>
        <ContactItemRow //label="Company" 
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tagWithCompany} />
        <ContactItemRow //label="Department" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} />
        <ContactItemRow //label="Designation" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} />
        <ContactItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ContactItemRow //label="Mobile #" 
          label={<FormattedMessage
            id="app.mobileNumber"
            defaultMessage="Mobile #"
          />}
          value={mobileNumber} />
      </>
    );
  }
}
export default ContactDetailView;

const ContactItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
    <div class=" text-[#444] font-semibold" >{label}</div>
    <div className="overflow-hidden truncate ml-8">
      
      {/* {elipsize(value, 27)} */}
      {value}
   
  </div>
   </div>
  );
};
