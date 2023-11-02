import React, { lazy } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const InvestorDetailView=lazy(()=> import("./InvestorDetailView"));

function InvestorDetailCard (props) {
    const { investorDetails } = props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InvestorDetailView investorDetails={investorDetails} toggleViewType={toggleViewType}/>
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  
}

export default InvestorDetailCard;
