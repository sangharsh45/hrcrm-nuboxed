import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import { handleShipperModal } from "./ShipperAction";
import AddShipperModal from "./AddShipperModal";
import {base_url} from "../../../Config/Auth";
import { FormattedMessage } from "react-intl";
class ShipperActionRight extends React.Component {
  render() {
    const { handleShipperModal, addShipperModal,user,viewType } = this.props;
    return (
      
      <FlexContainer alignItems="center">
        {user.functionName === "Production" && user.designation === "Manager" &&
       viewType === "table" ?
          <Tooltip title="Export Shipper">
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/shipper/${user.userId}`}
            >
             
              {/* <i class="fas fa-download"></i> */}
            </Button>
          </Tooltip>
          :null}
        <Tooltip title={<FormattedMessage id="app.create" defaultMessage="Create" />}>
          <Button type="primary" onClick={() => handleShipperModal(true)}>
           <FormattedMessage id="app.add" defaultMessage="Add" /> 
          </Button>
        </Tooltip>
        <AddShipperModal
          addShipperModal={addShipperModal}
          handleShipperModal={handleShipperModal}
        />
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ shipper,auth }) => ({
  addShipperModal: shipper.addShipperModal,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleShipperModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionRight);
