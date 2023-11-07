import React from "react";
import { withRouter } from "react-router";

import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class InventoryDetailActionLeft extends React.Component {
  render() {
    return (
      <FlexContainer alignItems="center">
        <Tooltip title="Back">
          <RollbackOutlined
            style={{ marginRight: "0.3rem", color: "#1890ff" }}
            // iconType="rollback"
            // tooltipTitle{}="Back"
            // style={{ color: "#1890ff" }}
            onClick={() => {
              this.props.history.goBack();
              this.props.handleResetTab();
            }}
          />
        </Tooltip>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetailActionLeft)
);
