import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";

function AssessmentOverView (props) {
 
    const {
      assessmentByAssessmentId: { assessmentName },
      toggleViewType,
      assessmentByAssessmentId,
    } = props;

  return(
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "15%" }}>
              <MultiAvatar
                primaryTitle={assessmentByAssessmentId.assessmentName}
                imageId={assessmentByAssessmentId.imageId}
                imageURL={assessmentByAssessmentId.imageURL}
              />
            </div>
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${assessmentName || ""}`}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    ); 
}
export default AssessmentOverView;
