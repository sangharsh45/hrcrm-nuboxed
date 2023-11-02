import React, { lazy } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const InvestorOverView=lazy(()=> import("./InvestorOverView"));

function InvestorOverviewCard (props) {
    const { investorDetails } = props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InvestorOverView investorDetails={investorDetails} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  
}

export default InvestorOverviewCard;
