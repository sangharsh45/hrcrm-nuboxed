import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class ProgramActionRight extends React.Component {
  render() {
    const { userId, user, role, handleProgramModal } = this.props;
    return (
      <div class=" flex items-center">
        <Tooltip placement="left" title="Create">
          <Button type="primary" onClick={() => handleProgramModal(true)}>
            Add
          </Button>
          {/* )}  */}
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProgramActionRight)
);
