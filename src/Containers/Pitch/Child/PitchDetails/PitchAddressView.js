import React, { Component } from "react";
import { SubTitle } from "../../../../Components/UI/Elements";
class PitchAddressView extends Component {
  render() {
    // console.log(this.props.customer);
    const {
      pitch: { url, phoneNumber,address },
    } = this.props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

<PitchItemRow label="Address" value={addressdata||""} />
        <PitchItemRow label="Street" value={addressdata1||""} />
        <PitchItemRow label="City" value={addressdata2||""} />
        <PitchItemRow label="State" value={addressdata3||""} />
        <PitchItemRow label="Pin Code" value={addressdata4||""} />
      </>
    );
  }
}
export default PitchAddressView;

const PitchItemRow = ({ label, value }) => {
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