import React, { Component } from "react";
import { Button, Icon, Tooltip } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

class CandidateOverViewDetail extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { address },
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
     
        <CandidateItemRow //label="Company" 
        
          label={<FormattedMessage
            id="app.address"
            defaultMessage="Address"
          />}
         
          value={addressdata||""} 
          
          />
         

                  <CandidateItemRow label="Street" value={addressdata1||""} />
        <CandidateItemRow label="City" value={addressdata2||""} />
        <CandidateItemRow label="State" value={addressdata3||""} />
        <CandidateItemRow label="Postal Code" value={addressdata4||""} />
       
      </>
    );
  }
}
export default CandidateOverViewDetail;

const CandidateItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" }}>
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </SubTitle>
    </FlexContainer>
  );
};
