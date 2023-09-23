import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import CandidateView from "./CandidateView";

class RecruitmentCandidateCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateView candidate={candidate} toggleViewType={toggleViewType} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default RecruitmentCandidateCard;
