import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const InvestorActionLeft=lazy(()=> import("./InvestorActionLeft"));
const InvestorActionRight=lazy(()=> import("./InvestorActionRight"));

function InvestorHeader (props) {
 

    const {
      handleCustomerModal,
      viewType,
      setInvestorViewType,
      handleChange,
      currentData,
      handleClear,
    } =props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <InvestorActionLeft
            viewType={viewType}
            // handleChange={handleChange}
            setInvestorViewType={setInvestorViewType}
            //   currentData={currentData}
            //   handleClear={handleClear}
            //   setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <InvestorActionRight
            viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            // handleCustomerModal={handleCustomerModal} 
            />
          }
        />
      </div>
    );
  
}

export default InvestorHeader;
