import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ReportDetailView =lazy(()=>import("./ReportDetailView"));

class ReportDetailCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ReportDetailView
              handleIconClick={this.props.handleIconClick}
              activeIcon={this.props.activeIcon}
              dropdownData={this.props.dropdownData}
                 handleDropChange={this.props.handleDropChange}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ReportDetailCard;
