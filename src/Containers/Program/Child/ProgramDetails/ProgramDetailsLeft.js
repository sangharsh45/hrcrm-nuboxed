import React, { Component,lazy} from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import ProgramOverViewCard from "../ProgramCards/ProgramOverViewCard";

class ProgramDetailsLeft extends Component {
  render() {
    const { program } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
         <ProgramOverViewCard program={program} />
         {/* <LeadsTopicOfInterest lead={lead} />
           <LeadDetailCard lead={lead} />
           <LeadsAddressCard lead={lead} /> */}
        </FlexContainer>
      </>
    );
  }
}
export default ProgramDetailsLeft;
