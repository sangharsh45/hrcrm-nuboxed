import React, { Component } from "react";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
class OrganizationOverviewView extends Component {
  render() {
    const {
      organization: { organizationName, imageId, imageURL },
      toggleViewType,
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer justifyContent="flex-start" flexWrap="nowrap">
            <div style={{ width: "3.75em" }}>
              <MultiAvatar
              style={{width:"5rem"}}
                primaryTitle={organizationName}
                imageId={imageId}
                imageURL={imageURL}
              />
            </div>
            <FlexContainer flexDirection="row">
              <Title fontSize={"1.375em"}>{organizationName}</Title>
              {/* <SubTitle>{designation}</SubTitle> */}
            </FlexContainer>
          </FlexContainer>
          <BorderColorIcon
            tooltipTitle="Edit"
            iconType="edit"
            onClick={toggleViewType}
            size="1em"
          />
        </FlexContainer>

        {/* <SubTitle>{email}</SubTitle> */}
        {/* <SubTitle>{designation}</SubTitle> */}
      </>
    );
  }
}

export default OrganizationOverviewView;
