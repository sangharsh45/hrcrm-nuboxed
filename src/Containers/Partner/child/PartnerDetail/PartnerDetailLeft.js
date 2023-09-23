import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import PartnerOverviewCard from "./PartnerCards/PartnerOverViewCard";
import PartnerDetailCard from "./PartnerCards/PartnerDetailCard";
import PartnerTopicOfIntrest from "./PartnerCards/PartnerTopicOfInterest";
import PartnerBankDetailsViewCard from "./PartnerCards/PartnerBankDetailsViewCard";
class PartnerDetailLeft extends Component {
  render() {
    const { partner } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <PartnerOverviewCard partner={partner} />
          <PartnerTopicOfIntrest partner={partner} />
          <PartnerDetailCard partner={partner} />
          <PartnerBankDetailsViewCard partner={partner}/>
        </FlexContainer>
      </>
    );
  }
}
export default PartnerDetailLeft;
