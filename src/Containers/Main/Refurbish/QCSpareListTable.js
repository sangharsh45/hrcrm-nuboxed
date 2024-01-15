import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getSpareListByPhoneId } from "../Account/AccountAction";

function QCSpareListTable(props) {
    useEffect(() => {
        props.getSpareListByPhoneId(props.RowData.phoneId)
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Spare",
            dataIndex: "suppliesName",

        },
        {
            title: "Units",
            dataIndex: "noOfSpare",

        },
        {
            title: "Hours",
            dataIndex: "hours",

        },
        {
            title: "Cost",
            dataIndex: "extraCost",

        },
        {
            title: "Total",
            dataIndex: "total",
        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.spareList}
                pagination={false}
                loading={props.fetchingSpareListByPhoneId}
            />

        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    spareList: distributor.spareList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QCSpareListTable);
