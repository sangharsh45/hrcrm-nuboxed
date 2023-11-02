import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleCallModal } from "../CallAction";
import CallSharedForm from "./CallSharedForm";

const CallActionRight = (props) => {
  const {
    userId,
    user,
    role,
    handleCustomerModal,
  } = props;
  return (
    <div class=" flex  items-center">
       {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.callFullListInd === true &&(
         <CallSharedForm/>
         )} 
      <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          onClick={() => props.handleCallModal(true)}
        >
          {/* <Icon type="plus" /> */}
          Add
        </Button>
      </Tooltip>
    </div>
  );
};

const mapStateToProps = ({auth}) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallActionRight);
