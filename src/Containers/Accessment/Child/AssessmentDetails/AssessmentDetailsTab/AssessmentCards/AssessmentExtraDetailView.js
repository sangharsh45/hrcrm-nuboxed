import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

function AssessmentExtraDetailView(props) {
    const {
        assessmentByAssessmentId: { url, category,level,noOfQuestions,theme },
      } = props;
    return (
        <>
        
          <AssessmentItemRow // label="URL" 
            label={<FormattedMessage
              id="app.url"
              defaultMessage="URL"
            />}
  
            value={url} />
          <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.category"
              defaultMessage="Category"
            />}
  
            value={category} 
            
            />
            
            <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.level"
              defaultMessage="Level"
            />}
  
             value={level} 
            
            />
  
  <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.questions"
              defaultMessage="Questions #"
            />}
  
             value={noOfQuestions} 
            
            />
            <AssessmentItemRow //label="Phone Number" 
            label={<FormattedMessage
              id="app.theme"
              defaultMessage="Theme"
            />}
  
             value={theme} 
            
            />
  
        </>
      );
}

export default AssessmentExtraDetailView

const AssessmentItemRow = ({ label, value }) => {
    return (
      <FlexContainer
        alignItems="center"
        flexWrap="nowrap"
        style={{ margin: "0.4rem" }}
      >
        <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
        <SubTitle style={{
           //marginLeft: "-1.875em" 
           }}>{value}</SubTitle>
      </FlexContainer>
    );
  };