import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const PitchOverView =lazy(()=>import("./PitchOverView"));


class PitchOverViewCard extends Component {
  render() {
    const { pitch } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PitchOverView pitch={pitch} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PitchOverViewCard;
