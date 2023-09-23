import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import CandidateAvailibityView from "../RecruitmentCard/CandidateAvalibilityView";

class CandidateAvailibityCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateAvailibityView
              candidate={candidate}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CandidateAvailibityCard;
