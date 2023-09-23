import React from 'react'
import AssessmentOverViewCard from './AssessmentCards/AssessmentOverViewCard'

import { FlexContainer } from "../../../../../Components/UI/Layout";
import AssessmentExtraDetailCard from './AssessmentCards/AssessmentExtraDetailCard';
import AssessmentOverViewStatus from './AssessmentCards/AssessmentOverViewStatus';
function AssessmentDetailsLeft(props) {
  const { 
    assessmentByAssessmentId
   } = props; 
  return (
    <>
    <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <AssessmentOverViewCard assessmentByAssessmentId={assessmentByAssessmentId}/>
        {/* <AssessmentOverViewStatus assessmentByAssessmentId={assessmentByAssessmentId} /> */}
        <AssessmentExtraDetailCard assessmentByAssessmentId={assessmentByAssessmentId}/>
    </FlexContainer>
    </>
  )
}

export default AssessmentDetailsLeft;