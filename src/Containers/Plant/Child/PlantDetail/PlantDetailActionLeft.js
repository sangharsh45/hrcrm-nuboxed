import React from "react";
import { withRouter } from "react-router";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";

class PlantDetailActionLeft extends React.Component {
  render() {
    return (
      <FlexContainer alignItems="center">
        <Tooltip title="Back">
          <RollbackOutlined
            style={{ marginRight: "0.3rem",color: "#1890ff" }}
            onClick={() => this.props.history.goBack()}
          />
        </Tooltip>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlantDetailActionLeft)
);
