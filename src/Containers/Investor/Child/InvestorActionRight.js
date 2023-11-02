import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

function InvestorActionRight (props) {
 
    const {
      userId,
      handleInvestorModal
    } = props;
    return (
      <div class=" flex  items-center">
        
      
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => handleInvestorModal(true)}
          >
            Add
          </Button>
     </Tooltip>
      </div>
    );
}

const mapStateToProps = ({ auth}) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActionRight)
);
