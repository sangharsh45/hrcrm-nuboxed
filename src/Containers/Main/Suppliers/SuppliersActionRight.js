import React, { useReducer } from "react";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { handleSuppliersModal } from "../SuppliersAction";
import AddSuppliersModal from "./AddSuppliersModal";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SuppliersActionRight extends React.Component {
  render() {
    const { handleSuppliersModal, addSuppliersModal ,user,viewType} = this.props;

    return (
      <>
      {user.functionName === "Production" && user.designation === "Manager" && 
      viewType === "grid" ?
          <Tooltip title="Export Supplier">
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/supplier/${user.userId}`}
            >
              <FontAwesomeIcon icon={solid("file-excel")}/>
              {/* <i class="fas fa-download"></i> */}
            </Button>
          </Tooltip>
          :null}
       {/* {user.functionName === "Production" && user.designation === "Manager" && viewType === "all" ?
          <Tooltip title="Download Suppliers Library">
            <Button
              type="primary"
              href={`${base_url}/export/supplier`}
            >
              <i class="fas fa-download"></i>
            </Button>
          </Tooltip>
          :null} */}
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            ghost
            onClick={() => handleSuppliersModal(true)}
          >Add
            {/* <i class="fas fa-plus"></i> */}
          </Button>
        </Tooltip>

        <AddSuppliersModal
          handleSuppliersModal={handleSuppliersModal}
          addSuppliersModal={addSuppliersModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ suppliers,auth }) => ({
  addSuppliersModal: suppliers.addSuppliersModal,
  user: auth.userDetails,
  //   role: auth.userDetails.role,
  //   department: auth.userDetails.department,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliersModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SuppliersActionRight)
);
