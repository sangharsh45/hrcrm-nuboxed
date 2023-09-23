import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityProductView from "./OpportunityProductView";
import OpportunityAboutEdit from "./OpportunityAboutEdit";

class OpportunityProductCard extends Component {
  render() {
    const { opportunity } = this.props;
    console.log(opportunity);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityProductView
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

export default OpportunityProductCard;
