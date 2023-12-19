import React, { Component } from "react";
import BorderColorIcon from '@mui/icons-material/Edit';
import { FlexContainer, } from "../../../../Components/UI/Layout";
import { SubTitle } from "../../../../Components/UI/Elements";
class OrganizationAddressView extends Component {
  render() {
    console.log(this.props.organization);
    const {
        organization: { url, phoneNumber,address, },
        toggleViewType
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      

       
      <>
      <FlexContainer justifyContent="flex-end">
      <BorderColorIcon 
              // tooltipTitle="Edit"
              // iconType="edit"
              onClick={toggleViewType}
              size="1em"
            />
        </FlexContainer>

<OrganizationItemRow label="Address" value={addressdata||""} />
        <OrganizationItemRow label="Street" value={addressdata1||""} />
        <OrganizationItemRow label="City" value={addressdata2||""} />
        <OrganizationItemRow label="State" value={addressdata3||""} />
        <OrganizationItemRow label="Pin Code" value={addressdata4||""} />
      </>
     
      
    );
  }
}
export default OrganizationAddressView;
const OrganizationItemRow = ({ label, value }) => {
  return (    
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{
         //marginLeft: "-1.875em" 
         }}>{value}</SubTitle>
    </FlexContainer>
  );
};