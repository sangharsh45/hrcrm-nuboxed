import React, { Component } from "react";
import { Divider } from "antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
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
        <FlexContainer justifyContent="flex-end">
          <ActionIcon
            tooltipTitle="Edit"
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          />
        </FlexContainer>
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
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
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
    </FlexContainer>
  );
};
