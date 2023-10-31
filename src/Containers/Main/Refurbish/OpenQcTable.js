import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOpenQcByUser } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
import moment from "moment";


function OpenQcTable(props) {
    useEffect(() => {
        props.getOpenQcByUser(props.locationDetailsId, props.userId)
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
            width: "30%",
            render: (text, item) => {
                return (
                    <>{item.dueDate === null ? "" : moment(item.dueDate).format("DD-MM-YYYY")}</>
                )
            }
        },
        {
            title: "Completed Phones",
            width: "20%",
            render: (text, item) => {
                return (
                    <>{item.qcCompletePhoneCount}/{item.totalPhone}</>
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
                dataSource={props.openQc}
                loading={props.fetchingOpenQc}
                pagination={false}
                scroll={{ y: 200 }}
            />

        </>
    );
}

const mapStateToProps = ({ production, auth }) => ({
    fetchingOpenQc: production.fetchingOpenQc,
    userId: auth.userDetails.userId,
    openQc: production.openQc,
    locationDetailsId: auth.userDetails.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpenQcByUser
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenQcTable);
