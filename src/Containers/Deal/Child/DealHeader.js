import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import DealActionLeft from "./DealActionLeft";
import DealActionRight from "./DealActionRight";

class DealHeader extends Component {
  render() {
    const {
      handleOpportunityModal,
      handleChange,
      currentData,
      handleClear,
      viewType,
      setDealViewType
    } = this.props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <DealActionLeft
              viewType={viewType}
              setDealViewType={setDealViewType}
            //   currentData={currentData}
            //   handleClear={handleClear}
            //   setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <DealActionRight
            //   viewType={viewType}
            //   handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default DealHeader;
