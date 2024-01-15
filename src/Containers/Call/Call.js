import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleCallModal } from "./CallAction";
const AddCallModal = lazy(() => import("./Child/AddCallModal"));
const CallHeader = lazy(() => import("./Child/CallHeader"));
const CallTable = lazy(() => import("./Child/CallTable/CallTable"));
class Call extends Component {
  render() {
    const { addCallModal, handleCallModal } = this.props;
    return (
      <React.Fragment>
        <CallHeader handleCallModal={handleCallModal} />
        <AddCallModal
          addCallModal={addCallModal}
          handleCallModal={handleCallModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {/* {this.props.viewType === "table" ? */}
        
          <CallTable />
        
          {/* null} */}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ call }) => ({
  addCallModal: call.addCallModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Call);
