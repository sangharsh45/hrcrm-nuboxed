import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import WordCloud from "../../Components/WordCloud/WordCloud";
import DashboardJumpStart from "../Dashboard/Child/JumpStart/DashboardJumpStart";
import WordCloud from "../../Components/WordCloud/WordCloud";
import { Icon, Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../Components/UI/Layout";
import DashboardDetailsTab from "./DashboardDetailsTab";
import StackedClosureChart from "../Dashboard/StackedClosureChart";
import FunnelChart from "./FunnelChart";
// import { getPermissions, addingPermissions } from "./PermissionsAction";
// import { StyledLabel,Spacer } from "../../Components/UI/Elements";
// import PermissionForm from "./PermissionForm";

function DashboardDetailsLeft(props) {
  return (
    <>
    <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <DashboardJumpStart />
       <FlexContainer justifyContent="space-between" >
       {/* <DashboardTable2
                /> */}
                 <StackedClosureChart/>
                 <div style={{ width: "38%" }}>
       <MainWrapper
        style={{height:"16em"}}
       >
        Pipeline (Today)
       <FunnelChart/>
       </MainWrapper>
       </div>
            </FlexContainer>
                
         <DashboardDetailsTab/>
        
        
    </FlexContainer>
    </>
  );
}
const mapStateToProps = ({ permissions, auth }) => ({
//   permissionsData: permissions.permissionsData,
//   userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getPermissions,
    //   addingPermissions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsLeft);