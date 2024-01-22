import React, { useEffect } from "react";
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
            render: (text, item) => {
                return (
                    <>{item.extraCost} {item.spareCurrency}</>
                )
            }
        },
        {
            title: "Total",
            dataIndex: "total",
            render: (text, item) => {
                return (
                    <>{item.total} {item.spareCurrency}</>
                )
            }
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
