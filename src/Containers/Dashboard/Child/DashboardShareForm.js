import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashUserlist,getJumpBulblist,getTasklist,getJumpTasklist } from "../DashboardAction";
import { StyledSelect } from "../../../Components/UI/Antd";
import moment from "moment";
const Option =StyledSelect;

function DashboardShareForm(props) {
  const startDate = moment().startOf("month"); 
  const endDate = moment();
  var today = new Date(),
  date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();

    const [dateD,setdateD]=useState(date);
    const [startDatestart,setstartDate]=useState(startDate);
    const [endDateend,setendDate]=useState(endDate);
    

  useEffect(() => {
    props.getDashUserlist(props.orgId);

  }, []);

  const [selectedUser,setselectedUser]=useState("");
  function handleSelect(usr){
    const startDate = `${startDatestart.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${endDateend.format("YYYY-MM-DD")}T20:00:00Z`
    setselectedUser(usr)
    props.getJumpBulblist(usr,startDate,endDate)
  props.getTasklist(usr)
   props.getJumpTasklist(usr,startDate,endDate)
  }
console.log("usrrr",selectedUser)
//   const permissionListForAll = props.dashboardUserlist.map((item) => {
//     return item.userId;
//   });
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
//   const findLoginData=props.dashboardUserlist.find((element)=>{
//     if(element.userId === props.userId){
//          return element.userName
//    }
// });
  return (
    <>
     <StyledSelect
        defaultValue={props.fullName}
        style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
        placeholder="Select to View"
        onChange={(e) => handleSelect(e)}
      >
        {props.dashboardUserlist.map((item) => {
          return <Option value={item.employeeId}>{item.empName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ dashboard ,auth}) => ({
//   SharingDashboardUserList: customer.SharingDashboardUserList,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fullName:auth.userDetails.fullName,
  dashboardUserlist: dashboard.dashboardUserlist,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashUserlist,
      getJumpBulblist,
      getTasklist,
      getJumpTasklist
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardShareForm);
