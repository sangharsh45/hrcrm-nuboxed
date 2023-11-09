import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOpenRepair } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
// import QRCodeModal from "../../../../Components/UI/Elements/QRCodeModal";
// import { SubTitle } from "../../../../Components/UI/Elements";
// import ButtonGroup from "antd/lib/button/button-group";
import moment from "moment";


function OpenRepairTable(props) {
    useEffect(() => {
        props.getOpenRepair(props.locationDetailsId, props.userId)
    }, [props.locationDetailsId, props.userId])

    const columns = [
        {
            title: "",
            width: "1%"
        },
        {
            title: "Order",
            dataIndex: "newOrderNo",
            width: "30%",
        },

        {
            title: "Due Date",
            dataIndex: "repairDueDate",
            width: "30%",
            render: (text, item) => {
                return (
                    <>{item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}</>
                )
            }
        },
        {
            title: "Completed Phones",
            width: "20%",
            render: (text, item) => {
                return (
                    <>{item.repairCompletePhoneCount}/{item.totalPhone}</>
                )
            }
        },

        {
            title: "Note",
            dataIndex: "reason",
            width: "30%",
        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.openRepair}
                loading={props.fetchingOpenRepairByUser}
                pagination={false}
                scroll={{ y: 200 }}
            />

        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    fetchingOpenQc: refurbish.fetchingOpenQc,
    userId: auth.userDetails.userId,
    openRepair: refurbish.openRepair,
    fetchingOpenRepairByUser: refurbish.fetchingOpenRepairByUser,
    locationDetailsId: auth.userDetails.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpenRepair
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenRepairTable);
