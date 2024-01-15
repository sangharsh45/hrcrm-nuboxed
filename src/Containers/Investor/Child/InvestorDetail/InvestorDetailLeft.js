import React, {lazy} from "react";
const InvestorOverviewCard =lazy(()=> import("./InvestorCards/InvestorOverviewCard"));
const InvestorExtraDetailCard =lazy(()=> import("./InvestorCards/InvestorExtraDetailCard"));
const InvestorDetailCard =lazy(()=> import("./InvestorCards/InvestorDetailCard"));

function InvestorDetailLeft(props) {
    const { investorDetails } = props;
    return (
      <>
        <div class=" flex flex-col">
           <InvestorOverviewCard investorDetails={investorDetails} />
       <InvestorExtraDetailCard investorDetails={investorDetails} />         
          <InvestorDetailCard investorDetails={investorDetails} /> 
        </div>
      </>
    );
  
}
export default InvestorDetailLeft;
