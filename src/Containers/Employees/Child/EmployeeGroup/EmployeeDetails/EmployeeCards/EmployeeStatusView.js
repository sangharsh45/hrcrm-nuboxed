import React, { Component } from "react";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
class EmployeeStatusView extends Component {
  render() {
    const {
      singleEmployee: {
        emailId,
        currency,
        workplace,
        reportingManagerName,
        employeeId,
        phoneNo,
        mobileNo,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        countryDialCode,
        countryDialCode1,
        timeZone,
        tradeCurrency,
        designation,
        department,
        userType,
        level,
        departmentDetails,
        // mataData: { firstName, lastName, email },
      },

      toggleViewType,
    } = this.props;
    const mobile = `${countryDialCode1 || ""} ${mobileNo || ""}`;
    const phone = `${countryDialCode || ""} ${phoneNo || ""}`;
    return (
      <>
        <div class=" flex justify-end" >
        <Tooltip title="Edit">
          <BorderColorIcon
          
            onClick={toggleViewType}
            style={{
              color: "grey",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          />
               </Tooltip>
        </div>
        {/* <ProfileItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ProfileItemRow //label="Emp Id" 
          label={<FormattedMessage
            id="app.employeeId"
            defaultMessage="Emp Id"
          />}
          value={employeeId} /> */}
        <ProfileItemRow //label="Phone #" 
          label={<FormattedMessage
            id="app.phone"
            defaultMessage="Phone #"
          />}
          value={phone} />
        {/* <ProfileItemRow
          //label="Date of Joining"
          label={<FormattedMessage
            id="app.dateOfJoining"
            defaultMessage="Date of Joining"
          />}
          value={moment(dateOfJoining).format("YYYY-MM-DD")}
        /> */}
        <ProfileItemRow label="Mobile #" value={mobile} />
        <ProfileItemRow label="Linkedin" value={linkedinPublicUrl || ""} />
        {/* <ProfileItemRow label="Twitter" value={twitter || ""} /> */}
        <ProfileItemRow label="Date of Joining" value={dayjs(dateOfJoining).format("YYYY-MM-DD")} />
        <ProfileItemRow label="Currency" value={currency} />
        {/* <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Department" value={department} />
        <ProfileItemRow label="Level" value={level || ""} /> */}
        {/* <ProfileItemRow label="Details" value={departmentDetails} /> */}
        <ProfileItemRow label="Reporting Manager" value={reportingManagerName}  />
        <ProfileItemRow label="Workplace" value={workplace}  />
        <ProfileItemRow label="Time Zone" value={timeZone} />
        {/* <ProfileItemRow label="Level" value={level || ""} /> */}
        {/* <ProfileItemRow label="TimeZone" value={timeZone} /> */}
        {/* <ProfileItemRow label="Reporting Manager" value={mataData.firstName} /> */}
      </>
    );
  }
}

export default EmployeeStatusView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div className="flex items-center flex-no-wrap m-1.5 w-10">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate">
        <Tooltip title={value} placement="topLeft">
          {/* {elipsize(value, 27)} */}
          {value}
        </Tooltip>
      </div>
    </div>
  );
};
