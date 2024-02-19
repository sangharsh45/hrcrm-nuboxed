import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { trnasferGrnItemToStock } from "../../../InventoryAction"

function TransferToStock(props) {

    function onChange() {
        props.trnasferGrnItemToStock({
            grnReceivedInd: true,
            grnStockInd: true,
            poSupplierSuppliesId: props.poSupplierSuppliesId
        }, props.poSupplierDetailsId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Received ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.poReceivedInd}
                        checked={props.poReceivedInd}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>

        </>
    );
}

const mapStateToProps = ({ auth, inventory }) => ({
    userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            trnasferGrnItemToStock,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(TransferToStock);
