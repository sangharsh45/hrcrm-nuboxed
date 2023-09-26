import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { shareTaskPermission, getPermissionsListTask,getTaskListRangeByUserId } from "../TaskAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function TaskSharedForm(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getTaskListRangeByUserId(props.employeeId,page);
  }, []);

  function handleChange(userId) {
    props.getTaskListRangeByUserId(props.employeeId,0);
  }

  const permissionListForAll = props.permissionsDataListTask.map((item) => {
    return item.userId;
  });

  const findLoginData=props.permissionsDataListTask.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
     <StyledSelect
        defaultValue={props.fullName}
        style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
        placeholder="Select to View"
        onChange={(e) => handleChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataListTask.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ task ,auth}) => ({
  addSharingTask: task.addSharingTask,
  userId:auth.userDetails.userId,
  fullName:
  (auth.userDetails.fullName),
  employeeId: auth.userDetails.employeeId,
  permissionsDataListTask: task.permissionsDataListTask,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         shareTaskPermission,
       getPermissionsListTask,
       getTaskListRangeByUserId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskSharedForm);
