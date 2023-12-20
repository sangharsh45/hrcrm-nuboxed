import React, { Component } from "react";
import {
  SubTitle,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
class OrganizationStatsView extends Component {
  render() {
    const {
      organization: {
        organizationUrl,
        facebook,
        twitter,

        linkedinUrl,
      },
      toggleViewType,
    } = this.props;
    // const mobile = `${countryDialCode || ""} ${mobileNo || ""}`;
    // const phon = `${countryDialCode1 || ""} ${phoneNo || ""}`;
    return (
      <>
          <div class=" flex justify-end">
          <BorderColorIcon
            tooltipTitle="Edit"
            iconType="edit"
            onClick={toggleViewType}
            style={{
              color: "grey",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          />
        </div>
        <OrganizationItemRow label="Website" value={organizationUrl} isLink />
        {/* <OrganizationItemRow label="Mobile #" value={""} />
        <OrganizationItemRow label="Phone #" value={""} /> */}
        <OrganizationItemRow label="Twitter" value={twitter} />
        <OrganizationItemRow label="Linkedin" value={linkedinUrl} />
        <OrganizationItemRow label="Facebook" value={facebook} />
      </>
    );
  }
}

export default OrganizationStatsView;

const OrganizationItemRow = ({ label, value, isLink }) => {
  return (
    <div class=" items-center flex flex-no-wrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600, width: 300 }}>
        {label}
      </SubTitle>
      {isLink ? (
        <SubTitle
          overflow="hidden"
          textOverflow="ellipsis"
          style={{ marginLeft: "-4rem" }}
        >
          <a href={`https://${value}`} target="_blank">
            {value}
          </a>
        </SubTitle>
      ) : (
          <SubTitle
            overflow="hidden"
            textOverflow="ellipsis"
            style={{ marginLeft: "-4rem" }}
          >
            {value}
          </SubTitle>
        )}
    </div>
  );
};
