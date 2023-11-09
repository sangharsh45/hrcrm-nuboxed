
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getRepairOrderByUser, handleRepairPhone, repairInspectionButton } from "./RefurbishAction"
// import OrderPhoneRepairModal from "./OrderPhoneRepairModal";
import { Button } from "antd";
import moment from "moment";
function ProductionRepairOrder(props) {
    useEffect(() => {
        props.getRepairOrderByUser(props.locationDetailsId, props.userId)
    }, [])
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    console.log(props.orderByUser)

    const columns = [
        {
            title: "",
            width: "1%"
        },
        {
            title: "Order",
            dataIndex: "paymentAmount",
            width: "30%",
            render: (text, item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                return (
                    <>
                        <span
                            style={{ textDecoration: "underline", color: "#1890ff", cursor: "pointer" }}
                            onClick={() => {
                                handleRowData(item);
                                props.handleRepairPhone(true)
                            }}>
                            {item.newOrderNo}
                        </span>
                        &nbsp;&nbsp;
                        {date === currentdate ? (
                            <span
                                style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                }}
                            >
                                New
                            </span>
                        ) : null}
                    </>
                )
            }
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
            title: "",
            width: "20%",
            render: (text, item) => {
                return (
                    <>
                        {item.repairInspectionInd === 0 ?
                            <Button
                                type="primary"
                                onClick={() => {
                                    props.repairInspectionButton({
                                        repairInspectionInd: 1,
                                        orderPhoneId: item.orderPhoneId,
                                        productionRepairDispatchId: item.productionRepairDispatchId
                                    },
                                        item.orderPhoneId,
                                        props.locationDetailsId,
                                        props.userId)
                                }}
                            >Start Inspection</Button> :
                            item.repairInspectionInd === 1 ?
                                <Button>Pause Inspection</Button> : "Repair Completed"}

                    </>
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
            {true && (
                <StyledTable
                    rowKey=""
                    columns={columns}
                    dataSource={props.repairOrder}
                    scroll={{ y: 200 }}
                    pagination={false}
                    loading={props.fetchingRepairorderById}
                />
            )}
            {/* <OrderPhoneRepairModal
                showRepairPhoneList={props.showRepairPhoneList}
                handleRepairPhone={props.handleRepairPhone}
                rowData={rowData}
            /> */}
        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationDetailsId: auth.userDetails.locationDetailsId,
    userId: auth.userDetails.userId,
    repairOrder: refurbish.repairOrder,
    fetchingRepairorderById: refurbish.fetchingRepairorderById,
    showRepairPhoneList: refurbish.showRepairPhoneList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairOrderByUser,
            handleRepairPhone,
            repairInspectionButton
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);



