import React, { Component } from "react";
import BorderColorIcon from '@mui/icons-material/Edit';
import { SubTitle } from "../../../../Components/UI/Elements";
class OrganizationAddressView extends Component {
  render() {
    console.log(this.props.organizationList);
    const {
      organizationList: { url, phoneNumber,address, },
        toggleViewType
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      

       
      <>
      <div class=" flex justify-end">
      <BorderColorIcon 
              // tooltipTitle="Edit"
              // iconType="edit"
              onClick={toggleViewType}
              style={{
                color: "grey",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            />
        </div>

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
    <div class=" items-center flex flex-no-wrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{
         //marginLeft: "-1.875em" 
         }}>{value}</SubTitle>
    </div>
  );
};