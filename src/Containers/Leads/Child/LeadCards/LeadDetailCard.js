import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import LeadDetailView from "./LeadDetailView";


class LeadDetailCard extends Component {
  render() {
    const { lead } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <LeadDetailView
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

export default LeadDetailCard;
