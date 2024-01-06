import React from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import AssessmentOverView from "./AssessmentOverView";

function AssessmentOverViewCard (props) {
    const { assessmentByAssessmentId } = props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
             <AssessmentOverView assessmentByAssessmentId={assessmentByAssessmentId} />
             ) : null
          } 
        </ViewEditCard>
      </div>
    );
  }


export default AssessmentOverViewCard;
