import React, { useReducer } from "react";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import { handleSuppliesModal } from "./SuppliesAction";
import SuppliesAddModal from "./SuppliesAddModal";


class SuppliesActionRight extends React.Component {
  render() {
    const { handleSuppliesModal, addSuppliesModal, user, viewType } = this.props;

    return (
      <>
        {user.functionName === "Production" && user.designation === "Manager" &&
          viewType === "grid" ?
          <Tooltip title="Export Supplies">
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/supplies`}
            >
             
              {/* <i class="fas fa-download"></i> */}
            </Button>
          </Tooltip>
          : null}
        {viewType === "all" && (
          <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              ghost
              onClick={() => handleSuppliesModal(true)}
            >Add
              {/* <i class="fas fa-plus"></i> */}
            </Button>
          </Tooltip>
        )}

        <SuppliesAddModal
          handleSuppliesModal={handleSuppliesModal}
          addSuppliesModal={addSuppliesModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ supplies, auth }) => ({
  addSuppliesModal: supplies.addSuppliesModal,
  user: auth.userDetails,
  //   role: auth.userDetails.role,
  //   department: auth.userDetails.department,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliesModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SuppliesActionRight)
);
