import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePartIdOfAnItem } from "../../../InventoryAction"

function AutoPartNoTOggle(props) {

    function onChange() {
        props.updatePartIdOfAnItem({
            autoPartInd: props.autoPartInd ? false : true,
            poSupplierSuppliesId: props.poSupplierSuppliesId,
            partNumber: "",
            showPartNoInd: true
        },
            props.supplierSuppliesUniqueNumberId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to generate part no automatic ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.showPartNoInd}
                        checked={props.showPartNoInd}
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
            updatePartIdOfAnItem,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AutoPartNoTOggle);
