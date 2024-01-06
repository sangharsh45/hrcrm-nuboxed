import React from 'react'
import AssessmentOverViewCard from './AssessmentCards/AssessmentOverViewCard'
import AssessmentExtraDetailCard from './AssessmentCards/AssessmentExtraDetailCard';

function AssessmentDetailsLeft(props) {
  const { 
    assessmentByAssessmentId
   } = props; 
  return (
    <>
    <div class="flex-col block">
        <AssessmentOverViewCard assessmentByAssessmentId={assessmentByAssessmentId}/>
        <AssessmentExtraDetailCard assessmentByAssessmentId={assessmentByAssessmentId}/>
    </div>
    </>
  )
}

export default AssessmentDetailsLeft;