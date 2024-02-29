import React, { Component } from "react";
import {
  SubTitle,
} from "../../../../Components/UI/Elements";
class ProfileAboutView extends Component {
  render() {
    const {
      user: {
        currency,
        designation,
        department,

        label,
        metaData,
      },
      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <div class=" flex justify-end" >
          {/* <ActionIcon
            tooltipTitle="Edit"
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          /> */}
        </div>
        <ProfileItemRow label="Currency" value={currency} />
        <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Function" value={department} />
        <ProfileItemRow label="Level" value={label} />
        <ProfileItemRow
          label="Manager"
          // value={metaData.firstName  && metaData.lastName || ""}
          // value={`${metaData.firstName} ${metaData.lastName || ""}`}
        />
        {/* <ProfileItemRow label="Details" value={departmentDetails} /> */}
        {/* <ProfileItemRow label="User type" value={userType} /> */}
        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default ProfileAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-no-wrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.625em" }}>{value}</SubTitle>
    </div>
  );
};
