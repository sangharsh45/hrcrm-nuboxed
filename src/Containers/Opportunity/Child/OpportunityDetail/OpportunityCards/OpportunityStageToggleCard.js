import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityView from "./OpportunityView";
import OpportunityEdit from "./OpportunityEdit";
import OpportunityStageToggleView from "./OpportunityStageToggleView";
class OpportunityStageToggleCard extends Component {
  render() {
    const { opportunity, account, updateAccount, setAccount } = this.props;
    console.log(opportunity);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityStageToggleView
                opportunity={opportunity}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OpportunityStageToggleCard;
