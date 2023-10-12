import React, { Component,lazy} from "react";
// import LeadDetailCard from "../LeadCards/LeadDetailCard";
import PitchAddressCard from "./PitchAddressCard";
import PitchOverViewCard from "./PitchOverViewCard";
import PitchDetailCard from "./PitchDetailCard"
// import LeadsTopicOfInterest from "../LeadCards/LeadsTopicOfInterest";

class PitchDetailLeft extends Component {
  render() {
    const { pitch } = this.props;
    return (
      <>
          <div  class=" flex flex-col">
          <PitchOverViewCard pitch={pitch} />
          {/* <LeadsTopicOfInterest lead={lead} /> */}
            <PitchDetailCard pitch={pitch} />
           <PitchAddressCard pitch={pitch} /> 
        </div>
      </>
    );
  }
}
export default PitchDetailLeft;
