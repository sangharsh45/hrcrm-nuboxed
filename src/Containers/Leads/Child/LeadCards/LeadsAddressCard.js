import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const LeadsAddressView =lazy(()=>import("./LeadsAddressView"));

class LeadsAddressCard extends Component {
  render() {
    const { lead } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <LeadsAddressView
                lead={lead}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default LeadsAddressCard;
