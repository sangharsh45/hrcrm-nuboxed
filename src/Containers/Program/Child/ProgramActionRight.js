import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from 'react-intl';

class ProgramActionRight extends React.Component {
  render() {
    const {handleProgramModal } = this.props;
    return (
      <div class=" flex items-center">
        <Tooltip placement="left" title={<FormattedMessage id="app.create" defaultMessage="Create"/>}>
          <Button type="primary" onClick={() => handleProgramModal(true)}>
          <FormattedMessage id="app.add" defaultMessage="Add" />  
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProgramActionRight)
);
