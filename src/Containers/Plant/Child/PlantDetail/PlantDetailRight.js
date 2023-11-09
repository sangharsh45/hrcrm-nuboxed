import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";

const PlantDetailTab = lazy(() => import("./PlantDetailTab/PlantDetailTab"));

class PlantDetailRight extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Suspense fallback={<BundleLoader />}>
          <PlantDetailTab plant={this.props.plant} />
        </Suspense>
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetailRight);
