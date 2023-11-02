import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import DealRecruiterDetails from "./DealRecruiterDetails";
import DealRecruiterDetailsEdit from "./DealRecruiterDetailsEdit";

class DealAboutViewCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealRecruiterDetails
              dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              />
            ) : (
              <DealRecruiterDetailsEdit
                toggleViewType={toggleViewType}
                dealDetailsbyID={dealDetailsbyID}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default DealAboutViewCard;
