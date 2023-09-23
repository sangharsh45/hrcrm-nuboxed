import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const ExtraCandidateCard = lazy(()=>import("./ExtraCandidateCard"));

class ExtraCandidateCardView extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ExtraCandidateCard
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

export default ExtraCandidateCardView;
