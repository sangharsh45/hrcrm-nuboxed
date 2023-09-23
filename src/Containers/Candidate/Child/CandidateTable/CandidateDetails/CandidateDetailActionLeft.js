import React from "react";
import { withRouter } from "react-router-dom";
import ActionIcon from "../../../../../Components/Utils/ActionIcon";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class CandidateDetailActionLeft extends React.Component {
  render() {
    return (
      <FlexContainer alignItems="center">
        <RollbackOutlined
          style={{ marginRight: "0.3rem",color: "#1890ff" }}
          iconType="rollback"
          // tooltipTitle="Back"
          tooltiptitle={<FormattedMessage
            id="app.back"
            defaultMessage="Back"
          />}
         
          onClick={() => this.props.history.goBack()}
        />{" "}
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidateDetailActionLeft)
);
