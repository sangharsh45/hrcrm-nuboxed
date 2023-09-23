import React from 'react'
import { ViewEditCard } from '../../../../../../Components/UI/Elements'
import AssessmentExtraDetailView from './AssessmentExtraDetailView';

function AssessmentExtraDetailCard(props) {
    const {assessmentByAssessmentId}=props;
  return (
    <>
     <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <AssessmentExtraDetailView
                assessmentByAssessmentId={assessmentByAssessmentId}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
    </>
  )
}

export default AssessmentExtraDetailCard