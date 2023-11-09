
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
import OrderPhoneModal from "./OrderPhoneModal";
import { Button } from "antd";
import moment from "moment";

function ProductionOrderListById(props) {
    useEffect(() => {
        props.getOrderByUser(props.locationDetailsId, props.userId)
    }, [])
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    console.log(props.orderByUser)

    const [hide, sethide] = useState(true)
    const handlePauseResume = () => {
        sethide(!hide)
    }
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
                                props.handleOrderPhoneModal(true)
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
            title: "",
            width: "20%",
            render: (text, item) => {
                return (
                    <>
                        {item.qcInspectionInd === 0 ? <Button
                            type="primary"
                            onClick={() => {
                                props.qcInspectionButton({
                                    productionDispatchId: item.productionDispatchId,
                                    orderPhoneId: item.orderPhoneId,
                                    qcInspectionInd: 1
                                }, item.orderPhoneId, props.locationDetailsId, props.userId)
                            }}
                        >Start Inspection</Button> : item.qcInspectionInd === 1 ?
                            <Button onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : "Inspection Completed"}
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
                    dataSource={props.orderByUser}
                    scroll={{ y: 200 }}
                    pagination={false}
                    loading={props.fetchingOrderByUser}
                />
            )}
            <OrderPhoneModal
                showPhoneList={props.showPhoneList}
                handleOrderPhoneModal={props.handleOrderPhoneModal}
                rowData={rowData}
            />
        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationDetailsId: auth.userDetails.locationDetailsId,
    userId: auth.userDetails.userId,
    orderByUser: refurbish.orderByUser,
    showPhoneList: refurbish.showPhoneList,
    fetchingOrderByUser: refurbish.fetchingOrderByUser
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOrderByUser,
            handleOrderPhoneModal,
            qcInspectionButton
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderListById);



