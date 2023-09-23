import React from 'react'
import { ActionHeader } from '../../../../../Components/Utils'
import AssessmentDetailsActionLeft from './AssessmentDetailsActionLeft'

function AssessmentDetailsHeader(props) {
  const {assessmentByAssessmentId,assessmentId}=props;
  return (
   <>
   <ActionHeader 
   leftComponent={<AssessmentDetailsActionLeft 
    assessmentId={props.assessmentId}
   assessmentName={props.assessmentName}
   assessmentByAssessmentId={assessmentByAssessmentId}/>}
   rightComponent={<></>}
   />
   </>
  )
}

export default AssessmentDetailsHeader