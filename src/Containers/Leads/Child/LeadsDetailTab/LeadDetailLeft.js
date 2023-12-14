import React, { Component,lazy} from "react";
import LeadDetailCard from "../LeadCards/LeadDetailCard";
import LeadsAddressCard from "../LeadCards/LeadsAddressCard";
import LeadsOverViewCard from "../LeadCards/LeadsOverViewCard";

class LeadDetailLeft extends Component {
  render() {
    const { lead } = this.props;
    return (
      <>
          <div  class=" flex flex-col">
          <LeadsOverViewCard lead={lead} />
          {/* <LeadsTopicOfInterest lead={lead} /> */}
           <LeadDetailCard lead={lead} />
           <LeadsAddressCard lead={lead} />
        </div>
      </>
    );
  }
}
export default LeadDetailLeft;
