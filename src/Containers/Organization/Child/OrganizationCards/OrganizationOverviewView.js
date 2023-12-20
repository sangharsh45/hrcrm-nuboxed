import React, { Component } from "react";
import {
  Title,
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
class OrganizationOverviewView extends Component {
  render() {
    const {
      organization: { organizationName, imageId, imageURL },
      toggleViewType,
    } = this.props;
    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex flex-start flex-no-wrap" >
            <div  class="w-[3.75em]">
              <MultiAvatar
              style={{width:"5rem"}}
                primaryTitle={organizationName}
                imageId={imageId}
                imageURL={imageURL}
              />
            </div>
            <div class=" flex flex-row" >
              <Title fontSize={"1.375em"}>{organizationName}</Title>
              {/* <SubTitle>{designation}</SubTitle> */}
            </div>
          </div>
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

        {/* <SubTitle>{email}</SubTitle> */}
        {/* <SubTitle>{designation}</SubTitle> */}
      </>
    );
  }
}

export default OrganizationOverviewView;
