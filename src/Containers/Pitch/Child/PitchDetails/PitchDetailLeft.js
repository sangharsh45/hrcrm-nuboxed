import React, { Component,lazy} from "react";
const PitchAddressCard =lazy(()=>import("./PitchAddressCard"));
const PitchOverViewCard =lazy(()=>import("./PitchOverViewCard"));
const PitchDetailCard =lazy(()=>import("./PitchDetailCard"));

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
