import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";

class ProgramOverView extends Component {
  render() {
    const {
        program: { program },
      toggleViewType,
      // program
    } = this.props;

    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "15%" }}>
              <MultiAvatar
                 primaryTitle={program.program}
                imageId={program.imageId}
                imageURL={program.imageURL}
              />
            </div>
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${program || ""}`}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default ProgramOverView;
