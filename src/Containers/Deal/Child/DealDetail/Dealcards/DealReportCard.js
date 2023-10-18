import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import DealReportDetails from "./DealReportDetails";
import DealRecruiterDetailsEdit from "./DealRecruiterDetailsEdit";

class DealReportCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealReportDetails
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

export default DealReportCard;
