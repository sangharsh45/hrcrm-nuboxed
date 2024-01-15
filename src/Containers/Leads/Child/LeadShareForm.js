import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLeadsPermissionsList,shareLeadsPermission } from "../LeadsAction";
import { StyledSelect } from "../../../Components/UI/Antd";

const Option =StyledSelect;

function LeadShareForm(props) {
  useEffect(() => {
    props.getLeadsPermissionsList();
  }, []);
  const permissionListForAll = props.leadspermissionsDataList.map((item) => {
    return item.userId;
  });
  function handleChange(value){
    if(value === "all"){
    props.shareLeadsPermission(
      {
        type: "leads",
        user: permissionListForAll,
      },
      value,
      "All"
    );
    }else{
      props.shareLeadsPermission(
        {
          type: "candidate",
          user: [value],
        },
        value,
      
      );
    }
  }
  // console.log(props.shareUsers);
  const findLoginData=props.leadspermissionsDataList.find((element)=>{
           if(element.userId === props.userId){
                return element.userName
          }
      });
  console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
    {findLoginData &&
      <StyledSelect
        // defaultValue={findLoginData && findLoginData.userName}
        defaultValue={"Select User"}
        style={{ width: 140 }}
        placeholder="Select to View"
        onChange={(e) => handleChange(e)}
      >
        <Option value={"all"}>{"All"} </Option>
        {props.leadspermissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
       }
    </>
  );
}

const mapStateToProps = ({ leads,auth }) => ({
  addSharingLeads: leads.addSharingLeads,
  userId:auth.userDetails.userId,
  leadspermissionsDataList: leads.leadspermissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        shareLeadsPermission,
      getLeadsPermissionsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadShareForm);

