import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const PitchAddressView =lazy(()=>import("./PitchAddressView"));

class PitchAddressCard extends Component {
  render() {
    const { pitch } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PitchAddressView
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

export default PitchAddressCard;
