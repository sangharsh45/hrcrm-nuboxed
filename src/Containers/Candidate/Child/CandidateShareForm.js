import React, {  useEffect,} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPermissionsList,
  shareCandidatePermission,
  setChoosedtypeCandidate,
} from "../CandidateAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function CandidateShareForm(props) {
  useEffect(() => {
    props.getPermissionsList();
  }, []);
 
  const permissionListForAll = props.permissionsDataList.map((item) => {
    return item.userId;
  });
  // function handleChange(value){
  //   if(value === "all"){
  //   props.shareCandidatePermission(
  //     {
  //       type: "candidate",
  //       user: permissionListForAll,
  //     },
  //     value,
  //     "All"
  //   );
  //   }
  //   else{
  //     props.shareCandidatePermission(
  //       {
  //         type: "candidate",
  //         user: [value],
  //       },
  //       value,
      
  //     );
  //   }
  // }
  const findLoginData=props.permissionsDataList.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
       {props.user.employee_type!=="external"&&(  
      <StyledSelect
        style={{ width: "auto",margin:"auto",paddingRight:"5px"}}
        defaultValue={props.fullName}
        placeholder="Select to View"
        onChange={(e) => props.handleDropChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
      )} 
    </>
  );
}

const mapStateToProps = ({ candidate,auth }) => ({
  addSharingCandidate: candidate.addSharingCandidate,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  fullName:
   (auth.userDetails.fullName),
  permissionsDataList: candidate.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareCandidatePermission,
      getPermissionsList,
      setChoosedtypeCandidate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateShareForm);
