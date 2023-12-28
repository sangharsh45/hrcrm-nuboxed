import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const DealRecruiterDetailsEdit = lazy(() => import("./DealRecruiterDetailsEdit"));
const DealReportDetails = lazy(() => import("./DealReportDetails"));

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
