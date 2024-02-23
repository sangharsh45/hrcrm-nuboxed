import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { trnasferGrnItemToStock } from "../../../InventoryAction"

function AutoPartNoTOggle(props) {

    // function onChange() {
    //     props.trnasferGrnItemToStock({
    //         autoPartInd: props.autoPartInd,
    //         poSupplierSuppliesId: props.poSupplierSuppliesId
    //     },
    //         props.poSupplierSuppliesId
    //     )
    // };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to generate part no automatic ?"
                    onCancel={null}
                    // onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        // disabled={props.allowGrnInd}
                        checked={props.autoPartInd}
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
            // trnasferGrnItemToStock,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AutoPartNoTOggle);
