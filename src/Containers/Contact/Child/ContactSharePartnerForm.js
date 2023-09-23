import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { shareContactPartnerPermission, getPermissionsListPartner } from "../ContactAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function ContactSharePartnerForm(props) {
  useEffect(() => {
    props.getPermissionsListPartner();
  }, []);
 
  const permissionListForAll = props.permissionsDataListPartner.map((item) => {
    return item.userId;
  });
  const findLoginData=props.permissionsDataListPartner.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
      <StyledSelect
        style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
        defaultValue={props.fullName}
        placeholder="Select to View"
        onChange={(e) => props.handlePartnerDropChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataListPartner.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ contact,auth}) => ({
  addSharingContactPartner: contact.addSharingContactPartner,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  fullName:
  (auth.userDetails.fullName),
  permissionsDataListPartner: contact.permissionsDataListPartner,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareContactPartnerPermission,
      getPermissionsListPartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactSharePartnerForm);
