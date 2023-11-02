import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import DashboardActionLeft from "./DashboardActionLeft";
import DashboardActionRight from "./DashboardActionRight";
class DashboardHeader extends Component {
  render() {
    return (
      <div style={{position: "sticky",
      top: "3.35rem",
      zIndex: "998"}}>
        <ActionHeader
           leftComponent={<DashboardActionLeft />}
          rightComponent={<DashboardActionRight
          viewType={this.props.viewType}
            setDashboardViewType={this.props.setDashboardViewType}
            handleButtonClick={this.props.handleButtonClick}
            activeButton={this.props.activeButton}
            />}
        />
      </div>
    );
  }
}

export default DashboardHeader;
