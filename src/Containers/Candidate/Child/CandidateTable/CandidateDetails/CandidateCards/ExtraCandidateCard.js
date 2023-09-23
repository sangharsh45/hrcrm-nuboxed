import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../../../../Components/Common";

class ExtraCandidateCard extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { costType,roleType
        ,experience,billing,benifit,currency },
    } = this.props;
    return (
      <>
        <CandidateItemRow label="Benefits"  value={benifit} />
        <CandidateItemRow label="Billing"
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {billing}
          </span>
          }
        />
        
        <CandidateItemRow label="Cost Type" value={costType} />
       
      </> 
    );
  }
}
export default ExtraCandidateCard;

const CandidateItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</SubTitle>
    </FlexContainer>
  );
};



