import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";

function InvestorDetailView (props) {   
    const {
        investorDetails: { url, phoneNumber,address },
    } = props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

<InvestorItemRow label="Address" value={addressdata||""} />
        <InvestorItemRow label="Street" value={addressdata1||""} />
        <InvestorItemRow label="City" value={addressdata2||""} />
        <InvestorItemRow label="State" value={addressdata3||""} />
        <InvestorItemRow label="Pin Code" value={addressdata4||""} />
      </>
    );
}
export default InvestorDetailView;

const InvestorItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-1"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{
         }}>{value}</SubTitle>
    </div>
  );
};