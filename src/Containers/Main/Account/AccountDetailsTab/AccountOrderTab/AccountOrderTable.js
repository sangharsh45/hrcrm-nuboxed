import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { getDistributorOrderByDistributorId, handleInventoryLocationInOrder } from "../../AccountAction"
import { Button, Tooltip } from 'antd';
import AddLocationInOrder from './AddLocationInOrder';

const AccountOrderTable = (props) => {

    useEffect(() => {
        props.getDistributorOrderByDistributorId(props.distributorId)
    }, [])
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }

    const columns = [
        {
            width: "1%"
        },
        {
            // title: "Priority",
            dataIndex: "priority",
            width: "4%",
            render: (name, item, i) => {
                //debugger;
                return (
                    <div>
                        {item.priority === "High" && (
                            <div
                                style={{
                                    borderRadius: "50%",
                                    height: "1.5625em",
                                    width: "1.5625em",
                                    backgroundColor: "red",
                                }}
                            ></div>
                        )}
                        {item.priority === "Medium" && (
                            <div
                                style={{
                                    borderRadius: "50%",
                                    height: "1.5625em",
                                    width: "1.5625em",
                                    backgroundColor: "orange",
                                }}
                            ></div>)}
                        {item.priority === "Low" && (
                            <div
                                style={{
                                    borderRadius: "50%",
                                    height: "1.5625em",
                                    width: "1.5625em",
                                    backgroundColor: "teal",
                                }}
                            ></div>)}
                    </div>
                )
            }
        },
        {
            title: "Order No",
            dataIndex: "newOrderNo",
            width: "12%",
            render: (name, item, i) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                return (
                    <>
                        <span
                            style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
                        //   onClick={() => {
                        //     handleSetParticularOrderData(item);
                        //     props.handlePauseButtonModal(true);
                        //   }}
                        >{item.newOrderNo}</span>
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
                );
            },

        },
        {
            title: "Created",
            dataIndex: "creationDate",
            width: "18%",
            sorter: (a, b) => {
                var nameA = a.creationDate; // ignore upper and lowercase
                var nameB = b.creationDate; // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
                            fontWeight: item.orderStatus === "Completed" ? "bold" : null,
                        },
                    },
                    children: `${item.userName} on ${moment(item.creationDate).format("DD-MM-YY")}`,
                };
            },
        },
        {
            title: "Location",
            width: "12%",
            render: (text, item) => {
                return (
                    <>{item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}</>
                )
            }
        },
        {
            title: "Phones#",
            dataIndex: "count",
            width: "8%",

        },
        {
            title: "Awb",
            dataIndex: "awbNo",
            width: "8%",
        },
        {
            title: "Contact",
            dataIndex: "contactPersonName",
            width: "10%",
        },
        {
            title: "Expected Price",
            dataIndex: "expectedPrice",
            width: "9%",
        },
        {
            title: "Final Price",
            dataIndex: "suggestedPrice",
            width: "9%",
        },
        {
            title: "Revised Price",
            dataIndex: "offerPrice",
            editable: true,
            width: "12%",
        },
        // {
        //     title: '',
        //     width: "7%",
        //     dataIndex: 'operation',
        //     render: (_, record) => {
        //         const editable = isEditing(record);
        //         return editable ? (
        //             <span>
        //                 <Typography.Link
        //                     //   onClick={() =>
        //                     //     save(record.orderId)

        //                     //   }
        //                     style={{
        //                         marginRight: 8,
        //                     }}
        //                 >
        //                     Save
        //                 </Typography.Link>
        //                 <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //                     <a>Cancel</a>
        //                 </Popconfirm>
        //             </span>
        //         ) : record.qcStartInd === 3 ?
        //             (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
        //                 <FontAwesomeIcon icon={solid('pen-to-square')} />
        //             </Typography.Link>)
        //             : null
        //     },
        // },
        // {
        //     title: "",
        //     width: "3%",
        //     render: (name, item, i) => {
        //         //debugger
        //         return (
        //             <Tooltip title="Notes">
        //                 <FontAwesomeIcon icon={solid('sticky-note')}
        //                     style={{ cursor: "pointer", fontSize: "13px" }}
        //                 //   onClick={() => {
        //                 //     handleSetParticularOrderData(item);
        //                 //     props.handleNotesModalInOrder(true);
        //                 //   }}
        //                 />

        //             </Tooltip>
        //         );
        //     },
        // },
        // {
        //     title: "",
        //     width: "3%",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 {/* <FontAwesomeIcon icon="fas fa-stream" /> */}
        //                 <Tooltip title="Status">
        //                     <StepForwardFilled
        //                     // onClick={() => {
        //                     //   props.handleStatusOfOrder(true);
        //                     //   handleSetParticularOrderData(item);
        //                     // }}
        //                     />
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // },
        // {
        //     title: "",
        //     width: "3%",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 <Tooltip title="Payment">
        //                     <EuroCircleFilled
        //                     // onClick={() => {
        //                     //   props.handlePaidModal(true);
        //                     //   handleSetParticularOrderData(item);
        //                     // }}
        //                     // style={{ color: "blue" }}
        //                     />
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // },
        {
            title: "",
            width: "16%",
            render: (name, item, i) => {
                //debugger
                return (
                    <>
                        {item.transferInd === 0 ? (
                            <Tooltip title="Add Inventory Location">
                                <Button
                                    style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white" }}
                                    onClick={() => {
                                        handleSetParticularOrderData(item);
                                        props.handleInventoryLocationInOrder(true);
                                    }}
                                >
                                    Order Pickup
                                </Button>
                            </Tooltip>

                        ) : null
                        }
                    </>
                );
            },
        },
        // {
        //     width: "5%",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 <Tooltip title="Rating">
        //                     <StarTwoTone />
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // },
        // {
        //     width: "5%",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 <Tooltip title="Feedback">
        //                     <FontAwesomeIcon icon={solid('sticky-note')} />
        //                 </Tooltip>
        //             </>
        //         )
        //     }
        // },
    ];
    return (
        <>
            <StyledTable
                columns={columns}
                pagination={false}
                dataSource={props.distributorOrder}
            />
            <AddLocationInOrder
                particularRowData={particularRowData}
                addInventoryInOrder={props.addInventoryInOrder}
                handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
            />
        </>
    )
}
const mapStateToProps = ({ distributor }) => ({
    distributorOrder: distributor.distributorOrder,
    addInventoryInOrder: distributor.addInventoryInOrder,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderTable);
