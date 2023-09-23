import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class PartnerDetailActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex items-center">
        <RollbackOutlined
          style={{ color: "#1890ff" }}
          iconType="rollback"
          // tooltipTitle="Back"
          tooltipTitle={
            <FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />
          }
         
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PartnerDetailActionLeft)
);
