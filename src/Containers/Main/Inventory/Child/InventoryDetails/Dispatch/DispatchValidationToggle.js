import React, { Component, useState } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlePickupModal } from "../../../InventoryAction"
import PickUpDateModal from "./PickUpDateModal";

function DispatchValidationToggle(props) {

    const [checked, setChecked] = useState(false)
    function onChange() {
        setChecked(true)
        props.handlePickupModal(true)
    };
    return (
        <>
            <div>
                {/* <InfoCircleOutlined
                // onClick={props.handlePickupModal(true)}
                /> */}
                <Switch
                    disabled={props.item.dispatchReceivedInd}
                    checked={props.item.dispatchReceivedInd}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={onChange} />
            </div>
            <PickUpDateModal
                contactPersonId={props.item.contactPersonId}
                orderPhoneId={props.orderPhoneId}
                locationDetailsId={props.locationDetailsId}
                handlePickupModal={props.handlePickupModal}
                pickUpModal={props.pickUpModal}
            />
        </>
    );
}

const mapStateToProps = ({ auth, inventory }) => ({
    userId: auth.userDetails.userId,
    pickUpModal: inventory.pickUpModal
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handlePickupModal
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchValidationToggle);
