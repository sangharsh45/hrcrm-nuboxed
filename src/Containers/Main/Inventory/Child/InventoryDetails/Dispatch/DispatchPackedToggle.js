import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDispatchInspectionButton } from "../../../InventoryAction"

function DispatchPackedToggle(props) {

    function onChange() {
        props.updateDispatchInspectionButton({
            dispatchInspectionInd: 3
        },
            props.item.orderPhoneId,
            props.locationDetailsId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do You Want To Pack ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={
                            props.item.dispatchInspectionInd === 3 ||
                            props.item.dispatchInspectionInd === 4}
                        checked={props.item.dispatchInspectionInd === 3}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>

        </>
    );
}

const mapStateToProps = ({ auth, inventory }) => ({

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateDispatchInspectionButton,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchPackedToggle);
