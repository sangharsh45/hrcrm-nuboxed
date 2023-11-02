import React, { lazy } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const InvestorExtraDetailView=lazy(()=> import("./InvestorExtraDetailView"));

function InvestorExtraDetailCard (props) {
    const { investorDetails } = props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InvestorExtraDetailView investorDetails={investorDetails} toggleViewType={toggleViewType}/>
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  
}

export default InvestorExtraDetailCard;
