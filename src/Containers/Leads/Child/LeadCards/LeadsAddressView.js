import React, { Component } from "react";
import { SubTitle } from "../../../../Components/UI/Elements";
class LeadsAddressView extends Component {
  render() {
    console.log(this.props.customer);
    const {
      lead: { url, phoneNumber,address },
    } = this.props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

<LeadsItemRow label="Address" value={addressdata||""} />
        <LeadsItemRow label="Street" value={addressdata1||""} />
        <LeadsItemRow label="City" value={addressdata2||""} />
        <LeadsItemRow label="State" value={addressdata3||""} />
        <LeadsItemRow label="Pin Code" value={addressdata4||""} />
      </>
    );
  }
}
export default LeadsAddressView;

const LeadsItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-1"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{
         //marginLeft: "-1.875em" 
         }}>{value}</SubTitle>
    </div>
  );
};