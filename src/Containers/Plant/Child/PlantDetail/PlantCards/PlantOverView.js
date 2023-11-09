import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class PlantOverView extends Component {
  render() {
    const {
      plant: { name },
      toggleViewType,
    } = this.props;

    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "25%" }}>
              <MultiAvatar />
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title overflow="hidden" textOverflow="ellipsis">
                {` ${name || ""} `}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default PlantOverView;
