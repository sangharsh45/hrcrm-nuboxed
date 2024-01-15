import React from "react";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class LeadDetailActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex items-center" >
        <RollbackOutlined
          style={{ marginRight: "0.3rem" }}
          iconType="rollback"
          // tooltipTitle="Back"
          tooltipTitle={
            <FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />
          }
          // style={{ color: "#1890ff" }}
        onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadDetailActionLeft)
);
