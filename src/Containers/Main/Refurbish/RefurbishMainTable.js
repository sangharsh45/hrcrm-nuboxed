import React, { Component, Suspense, lazy, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Spacer } from "../../../Components/UI/Elements";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Input, Tooltip, Space, Button, Badge, Form, Typography, Popconfirm, DatePicker } from "antd";
import {
    getProductionOrderId,
    handleProductionNotesModal,
    handleAssignOrderById,
    handleAssignRepairModal,
    handleTechnicianModal,
    handlePhoneByTechnician,
    handleOrderPhone,
    updateFinalPrice,
    handleAllSpareList
} from "./RefurbishAction";
import { withRouter } from "react-router";
import moment from "moment";
// import ProductionNotesModal from "./ProductionNotesModal";
import AssignOrderModal from "./AssignOrderModal";
import { EditFilled, HistoryOutlined, PhoneFilled } from "@ant-design/icons";
// import TechnicianModal from "./child/ProductionModal/TechnicianModal";
// import UserPhoneModal from "./child/ProductionModal/UserPhoneModal";
// import ProductionOrderModal from "./child/ProductionModal/ProductionOrderModal";
// import AddAssignRepairModal from "./child/ProductionModal/AddAssignRepairModal";
import { ApprovalOutlined, BorderAllOutlined } from "@mui/icons-material";
import AllSpareListByOrder from "./AllSpareListByOrder";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ProductionOrderList = (props) => {

    useEffect(() => {
        props.getProductionOrderId(props.locationId)
    }, [])

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(props.productionOrder)
    }, [props.productionOrder])

    const isEditing = (record) => record.orderPhoneId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            suggestedPrice: "",
            ...record,
        });
        setEditingKey(record.orderPhoneId);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.orderPhoneId);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, ...row });
                const a = newData[index];
                console.log(props.quotationId);
                props.updateFinalPrice(
                    {
                        suggestedPrice: a.suggestedPrice,
                        orderPhoneId: a.orderPhoneId,
                        expectedPrice: 0
                    },
                    a.orderPhoneId,
                    props.locationId
                );
                setEditingKey('');
            } else {
                alert("else");
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: "",
            width: "2%",
        },

        {
            title: "Order Id",
            width: "12%",
            render: (text, item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.createAt).format("DD/MM/YYYY");

                return (
                    <>
                        <span
                            style={{ textDecoration: "underline", color: "#1890ff", cursor: "pointer" }}
                            onClick={() => {
                                handleRowData(item);
                                props.handleOrderPhone(true)
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
            title: "Customer",
            width: "11%",
            dataIndex: "distributorName"
        },
        {
            title: "Contact",
            width: "11%",
            dataIndex: "contactPersonName"
        },

        {
            title: "Phones #",
            width: "10%",
            dataIndex: "phoneCount",
            render: (text, item) => {
                return (
                    <>{item.totalReceiveQuantity}/{item.phoneCount}</>
                )
            }

        },
        {
            title: "Remaining ",
            width: "10%",
            dataIndex: "receiveRemainingQuantity"
        },
        {
            title: "Expected Price",
            width: "10%",
            dataIndex: "expectedPrice"
        },
        {
            title: "Delivery Date",
            width: "10%",
            render: (text, item) => {
                return (
                    <>{moment(item.deliveryDate).format("DD-MM-YYYY")}</>
                )
            }
        },
        {
            title: "Final Price",
            width: "10%",
            dataIndex: "suggestedPrice",
            editable: true,
        },
        {
            title: '',
            width: "8%",
            render: (text, item) => {
                return (
                    <>
                        <ApprovalOutlined
                            onClick={() => {
                                handleRowData(item);
                                props.handleAllSpareList(true)
                            }}
                        /></>
                )
            }
            // render: (_, record) => {
            //     const editable = isEditing(record);
            //     return editable ? (
            //         <span>
            //             <Typography.Link
            //                 onClick={() =>
            //                     save(record.orderPhoneId)

            //                 }
            //                 style={{
            //                     marginRight: 8,
            //                 }}
            //             >
            //                 Save
            //             </Typography.Link>
            //             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            //                 <a>Cancel</a>
            //             </Popconfirm>
            //         </span>
            //     ) : record.transferInd === 3 ?
            //         (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            //             <BorderAllOutlined />
            //         </Typography.Link>)
            //         : null


            // },
        },

        {
            title: "",
            width: "10%",
            render: (name, item, i) => {
                //debugger
                return (
                    <>
                        {item.qcStartInd === 1 ?
                            <Tooltip title="Assign For QC">
                                <Button
                                    style={{
                                        backgroundColor: "#1685e6",
                                        color: "white",
                                    }}
                                    onClick={() => {
                                        props.handleAssignOrderById(true);
                                        handleRowData(item);
                                    }}
                                >Assign For QC </Button>
                            </Tooltip> : item.qcStartInd === 2 ? <b>Assigned To Technician</b> : item.qcStartInd === 3 ? <b>QC Completed on {moment(item.qcEndTime).format("DD-MM-YYYY")}</b> : null}
                    </>

                );
            },
        },
        {
            title: "",
            width: "10%",
            render: (name, item, i) => {
                //debugger
                return (
                    <>
                        {item.qcRepairInd === 1 ?
                            <Tooltip title="Assign For Repair">
                                <Button
                                    style={{
                                        backgroundColor: "#1685e6",
                                        color: "white",
                                    }}
                                    onClick={() => {
                                        props.handleAssignRepairModal(true);
                                        handleRowData(item);
                                    }}
                                >Assign For Repair</Button>
                            </Tooltip>
                            : item.qcRepairInd === 3 ? <b>Repair Completed on {moment(item.repairEndTime).format("DD-MM-YYYY")}</b> : null}
                    </>

                );
            },
        },
        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Notes">
                        <NoteAltIcon
                            style={{ cursor: "pointer", fontSize: "13px" }}
                            onClick={() => {
                                handleRowData(item);
                                props.handleProductionNotesModal(true);
                            }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="History">
                        <HistoryOutlined
                            onClick={() => {
                                props.handleTechnicianModal(true)
                                handleRowData(item);
                            }}
                        />
                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Phone List">
                        <PhoneFilled
                            onClick={() => {
                                props.handlePhoneByTechnician(true)
                                handleRowData(item);
                            }}
                        />
                    </Tooltip>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'remark' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            {true && (
                <Form form={form} component={false}>
                    <StyledTable
                        rowKey="orderPhoneId"
                        dataSource={data}
                        pagination={false}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        loading={props.fetchingStockItemsInOrder}
                        columns={mergedColumns}
                        sticky={true}
                        rowClassName="editable-row"
                    />
                </Form>)}
            <AssignOrderModal
                handleAssignOrderById={props.handleAssignOrderById}
                assignOrderById={props.assignOrderById}
                rowData={rowData}
            />
            <AllSpareListByOrder
                handleAllSpareList={props.handleAllSpareList}
                approveSpareModal={props.approveSpareModal}
                rowData={rowData} />
            {/* <UserPhoneModal
                handlePhoneByTechnician={props.handlePhoneByTechnician}
                phoneByTechnician={props.phoneByTechnician}
                rowData={rowData}
            />
            <ProductionNotesModal
                rowData={rowData}
                productioNoteModal={props.productioNoteModal}
                handleProductionNotesModal={props.handleProductionNotesModal}

            />
          
            <AddAssignRepairModal
                handleAssignRepairModal={props.handleAssignRepairModal}
                showAssignRepairModal={props.showAssignRepairModal}
                rowData={rowData}
            />
            <TechnicianModal
                handleTechnicianModal={props.handleTechnicianModal}
                showTechnicianModal={props.showTechnicianModal}
                rowData={rowData}
            />
            <ProductionOrderModal
                rowData={rowData}
                addOrderPhone={props.addOrderPhone}
                handleOrderPhone={props.handleOrderPhone}
            /> */}
            <Spacer />
        </>
    );
}


const mapStateToProps = ({ refurbish, auth }) => ({
    showTechnicianModal: refurbish.showTechnicianModal,
    productionOrder: refurbish.productionOrder,
    addOrderPhone: refurbish.addOrderPhone,
    fetchingProductionOrederId: refurbish.fetchingProductionOrederId,
    productioNoteModal: refurbish.productioNoteModal,
    assignOrderById: refurbish.assignOrderById,
    phoneByTechnician: refurbish.phoneByTechnician,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    locationId: auth.userDetails.locationId,
    approveSpareModal: refurbish.approveSpareModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderId,
            handleProductionNotesModal,
            handleAssignOrderById,
            handleAssignRepairModal,
            handleTechnicianModal,
            handlePhoneByTechnician,
            handleOrderPhone,
            updateFinalPrice,
            handleAllSpareList
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductionOrderList)
);
