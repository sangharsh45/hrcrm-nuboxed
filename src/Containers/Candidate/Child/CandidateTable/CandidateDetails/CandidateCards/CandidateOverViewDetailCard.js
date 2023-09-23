import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateOverViewDetail = lazy(()=>import("./CandidateOverViewDetail"));

class CandidateOverViewDetailCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateOverViewDetail candidate={candidate} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CandidateOverViewDetailCard;
