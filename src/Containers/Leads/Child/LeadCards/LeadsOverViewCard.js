import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import LeadsOverView from "./LeadsOverView";


class LeadsOverViewCard extends Component {
  render() {
    const { lead } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <LeadsOverView lead={lead} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default LeadsOverViewCard;
