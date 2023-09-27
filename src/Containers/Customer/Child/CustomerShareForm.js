import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { shareCustomerPermission, getPermissionsListCustomer } from "../CustomerAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function CustomerShareForm(props) {
  useEffect(() => {
    props.getPermissionsListCustomer();
  }, []);

  const permissionListForAll = props.permissionsDataListCustomer.map((item) => {
    return item.userId;
  });
  // function handleChange(value){
  //   if(value === "all"){
  //   props.shareCustomerPermission(
  //     {
  //       type: "customer",
  //       user: permissionListForAll,
  //     },
  //     value,
  //     "All"
  //   );
  //   }else{
  //     props.shareCustomerPermission(
  //       {
  //         type: "customer",
  //         user: [value],
  //       },
  //       value,
      
  //     );
  //   }
  // }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataListCustomer.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
     <StyledSelect
        // defaultValue={props.fullName}
        defaultValue={"Select User"}
        style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
        placeholder="Select to View"
        onChange={(e) =>  props.handleDropChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataListCustomer.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ customer ,auth}) => ({
  addSharingCustomer: customer.addSharingCustomer,
  userId:auth.userDetails.userId,
  fullName:
  (auth.userDetails.fullName),
  permissionsDataListCustomer: customer.permissionsDataListCustomer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        shareCustomerPermission,
      getPermissionsListCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShareForm);
