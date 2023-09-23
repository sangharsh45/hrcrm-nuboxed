import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { shareContactCustomerPermission, getPermissionsListCustomer } from "../ContactAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function ContactShareCustomerForm(props) {
  useEffect(() => {
    props.getPermissionsListCustomer();
  }, []);

  const permissionListForAll = props.permissionsDataListContactCustomer.map((item) => {
    return item.userId;
  });
  
  

 return (
  <>
     {props.user.employee_type!=="external"&&(  
    <StyledSelect
      style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
      defaultValue={props.fullName}
      placeholder="Select to View"
      onChange={(e) =>  props.handleDropChange(e)}
   
    >
       <Option value={"all"}>{"All"} </Option>
      {props.permissionsDataListContactCustomer.map((item) => {
        return <Option value={item.userId}>{item.userName} </Option>;
      })}
    </StyledSelect>
    )} 
  </>
);
}
const mapStateToProps = ({ contact,auth }) => ({
  addSharingContactCustomer: contact.addSharingContactCustomer,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  fullName:
   (auth.userDetails.fullName),
  permissionsDataListContactCustomer: contact.permissionsDataListContactCustomer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        shareContactCustomerPermission,
      getPermissionsListCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactShareCustomerForm);
