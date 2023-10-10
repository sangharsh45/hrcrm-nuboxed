import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
const InvestorDetailActionLeft =lazy(()=> import("./InvestorDetailActionLeft.js"));

function InvestorDetailHeader (props) {

    return (
      <div>
        <ActionHeader
          leftComponent={<InvestorDetailActionLeft/>}
          rightComponent={<></>}
        />
      </div>
    );
  
}

export default InvestorDetailHeader;
