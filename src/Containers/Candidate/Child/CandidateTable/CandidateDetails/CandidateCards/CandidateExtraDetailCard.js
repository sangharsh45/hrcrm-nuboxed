import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateExtraDetailView = lazy(()=>import("./CandidateExtraDetailView"));

class CandidateExtraDetailCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateExtraDetailView
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

export default CandidateExtraDetailCard;
