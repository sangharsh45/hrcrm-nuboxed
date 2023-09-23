import React, { Component,connect } from "react";
import { Tooltip } from "antd";
import { bindActionCreators } from "redux";
import {
  EditOutlined
} from '@ant-design/icons';
import EditIcon from '@mui/icons-material/Edit';
import { ViewEditCard } from "../../../../Components/UI/Elements";
import { FlexContainer,MainWrapper } from "../../../../Components/UI/Layout";
import { Button } from "antd";
import { SubTitle } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
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
      <EditIcon 
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