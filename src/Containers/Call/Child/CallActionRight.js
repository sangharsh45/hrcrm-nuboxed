import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleCallModal } from "../CallAction";

const CallActionRight = (props) => {
  return (
    <div class=" flex  items-center">
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

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallActionRight);
