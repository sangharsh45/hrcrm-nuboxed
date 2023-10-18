import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import DealAboutView from "./DealAboutView";
import DealAboutEdit from "./DealAboutEdit.js";

class DealAboutCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealAboutView
                dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
                tradeCurrency={this.props.tradeCurrency}
              />
            ) : (
              <DealAboutEdit
              dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default DealAboutCard;
