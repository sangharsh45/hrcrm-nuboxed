import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const PitchDetailView =lazy(()=>import("./PitchDetailView"));


class PitchDetailCard extends Component {
  render() {
    const { pitch } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PitchDetailView
              pitch={pitch}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PitchDetailCard;
