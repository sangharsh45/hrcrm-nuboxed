import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityRecruiterDetails from "./OpportunityRecruiterDetails";
 import OpportunityRecruiterDetailsEdit from "./OpportunityRecruiterDetailsEdit";

class OpportunityAboutViewCard extends Component {
  render() {
    const { opportunity } = this.props;
    return (
      <div>
        <ViewEditCard >
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityRecruiterDetails
              opportunity={opportunity}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OpportunityRecruiterDetailsEdit
                toggleViewType={toggleViewType}
                opportunity={opportunity}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OpportunityAboutViewCard;
