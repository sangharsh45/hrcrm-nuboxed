import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const InvestorActionLeft=lazy(()=> import("./InvestorActionLeft"));
const InvestorActionRight=lazy(()=> import("./InvestorActionRight"));

function InvestorHeader (props) {
 

    const {
      handleInvestorModal,
      viewType,
      setInvestorViewType,
      handleChange,
      currentData,
      handleClear,
      handleCurrentData,
      currentUser

    } =props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <InvestorActionLeft
            viewType={viewType}
            setInvestorViewType={setInvestorViewType}
            currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}
            />
          }
          rightComponent={
            <InvestorActionRight
            viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            handleInvestorModal={handleInvestorModal}
            />
          }
        />
      </div>
    );
  
}

export default InvestorHeader;
