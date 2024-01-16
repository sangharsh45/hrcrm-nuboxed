import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
const InventoryDetailTab = lazy(() =>
  import("./InventoryDetailTab/InventoryDetailTab")
);

class InventoryDetailRight extends Component {
  render() {
    return (
      <div class=" w-full" >
        <InventoryDetailTab
          inventory={this.props.inventory}
          tabData={this.props.tabData}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetailRight)
);
