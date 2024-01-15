import React from "react";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

function ContactInvestDetailActionLeft (props) {

    return (
      <div class=" flex items-center">
        <RollbackOutlined
          iconType="rollback"
          //tooltipTitle="Back"
          tooltiptitle={<FormattedMessage
            id="app.back"
            defaultMessage="Back"
          />}
          onClick={() =>props.history.goBack()}
        />
      </div>
    );
  }
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInvestDetailActionLeft)
);
