
// import React, { Component, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { getRepairOrderByUser, handleRepairPhone, repairInspectionButton } from "./RefurbishAction"
// import OrderPhoneRepairModal from "./OrderPhoneRepairModal";
// import { Button } from "antd";
// import moment from "moment";
// function ProductionRepairOrder(props) {
//     useEffect(() => {
//         props.getRepairOrderByUser(props.locationId, props.userId)
//     }, [])
//     const [rowData, setRowData] = useState({})
//     const handleRowData = (item) => {
//         setRowData(item)
//     }
//     console.log(props.orderByUser)

//     const [hide, sethide] = useState(true)
//     const handlePauseResume = () => {
//         sethide(!hide)
//     }

//     const columns = [
//         {
//             title: "",
//             width: "1%"
//         },
//         {
//             title: "Order",
//             dataIndex: "paymentAmount",
//             width: "30%",
//             render: (text, item) => {
//                 const currentdate = moment().format("DD/MM/YYYY");
//                 const date = moment(item.creationDate).format("DD/MM/YYYY");
//                 return (
//                     <>
//                         <span
//                             style={{ textDecoration: "underline", color: "#1890ff", cursor: "pointer" }}
//                             onClick={() => {
//                                 handleRowData(item);
//                                 props.handleRepairPhone(true)
//                             }}>
//                             {item.newOrderNo}
//                         </span>
//                         &nbsp;&nbsp;
//                         {date === currentdate ? (
//                             <span
//                                 style={{
//                                     color: "tomato",
//                                     fontWeight: "bold",
//                                 }}
//                             >
//                                 New
//                             </span>
//                         ) : null}
//                     </>
//                 )
//             }
//         },

//         {
//             title: "Due Date",
//             dataIndex: "repairDueDate",
//             width: "30%",
//             render: (text, item) => {
//                 return (
//                     <>{item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}</>
//                 )
//             }
//         },
//         {
//             title: "Completed Phones",
//             width: "20%",
//             render: (text, item) => {
//                 return (
//                     <>{item.repairCompletePhoneCount}/{item.totalPhone}</>
//                 )
//             }
//         },
//         {
//             title: "",
//             width: "20%",
//             render: (text, item) => {
//                 return (
//                     <>
//                         {item.repairInspectionInd === 0 ?
//                             <Button
//                                 type="primary"
//                                 onClick={() => {
//                                     props.repairInspectionButton({
//                                         repairInspectionInd: 1,
//                                         orderPhoneId: item.orderPhoneId,
//                                         productionRepairDispatchId: item.productionRepairDispatchId
//                                     },
//                                         item.orderPhoneId,
//                                         props.locationId,
//                                         props.userId)
//                                 }}
//                             >Repair Start</Button> :
//                             item.repairInspectionInd === 1 ?
//                                 <Button onClick={handlePauseResume}>{hide ? "Pause" : "Resume"}</Button> : "Repair Completed"}

//                     </>
//                 )
//             }
//         },
//         {
//             title: "Note",
//             dataIndex: "reason",
//             width: "30%",
//         },

//     ];

//     return (
//         <>
//             {true && (
//                 <StyledTable
//                     rowKey=""
//                     columns={columns}
//                     dataSource={props.repairOrder}
//                     scroll={{ y: 200 }}
//                     pagination={false}
//                     loading={props.fetchingRepairorderById}
//                 />
//             )}
//             <OrderPhoneRepairModal
//                 showRepairPhoneList={props.showRepairPhoneList}
//                 handleRepairPhone={props.handleRepairPhone}
//                 rowData={rowData}
//             />
//         </>
//     );
// }

// const mapStateToProps = ({ refurbish, auth }) => ({
//     locationId: auth.userDetails.locationId,
//     userId: auth.userDetails.userId,
//     repairOrder: refurbish.repairOrder,
//     fetchingRepairorderById: refurbish.fetchingRepairorderById,
//     showRepairPhoneList: refurbish.showRepairPhoneList,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getRepairOrderByUser,
//             handleRepairPhone,
//             repairInspectionButton
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);




import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairOrderByUser, handleRepairPhone, repairInspectionButton, getOrderIdForCatalogueItem } from "./RefurbishAction"
import { Button } from "antd";
import moment from "moment";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

const OrderPhoneRepairModal = lazy(() => import('./OrderPhoneRepairModal'));

function ProductionRepairOrder(props) {
    useEffect(() => {
        if (props.inspectionRequiredInd) {
            props.getOrderIdForCatalogueItem(props.userId)
        } else {
            props.getRepairOrderByUser(props.locationId, props.userId)
        }
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
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[4.1rem]"><FormattedMessage
                        id="app.order"
                        defaultMessage="order"
                      /></div>
                        <div className=" md:w-[5.1rem]"><FormattedMessage
                        id="app.duedate"
                        defaultMessage="duedate"
                      /></div>
                        <div className=" md:w-[9.8rem] "> <FormattedMessage
                        id="app.units"
                        defaultMessage="Units"
                      /></div>
                        <div className="md:w-[6.6rem]"></div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                        id="app.status"
                        defaultMessage="Status"
                      /></div>
            </div>
                    {props.inspectionRequiredInd ? props.choosenOrderCatalogue.map((item) => {
                        const currentdate = moment().format("DD/MM/YYYY");
                        const date = moment(item.creationDate).format("DD/MM/YYYY");
                        return (
                            <div>
                                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "

                                >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[15.6rem] max-sm:w-full  ">
                                            <span
                                                class="underline text-[#1890ff] cursor-pointer"
                                                onClick={() => {
                                                    handleRowData(item);
                                                    props.handleRepairPhone(true)
                                                }}>
                                                {item.newOrderNo}
                                            </span>
                                            &nbsp;&nbsp;
                                            {date === currentdate ? (
                                                <span
                                                class="text-[tomato] font-bold"
                                                >
                                                    New
                                                </span>
                                            ) : null}
                                        </div>

                                        <div className=" flex font-medium   md:w-[17.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm text-cardBody font-poppins">
                                                {item.totalProduct}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* <div className=" flex font-medium  md: max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                            props.locationId,
                                                            props.userId)
                                                    }}
                                                >Repair Start</Button> :
                                                item.repairInspectionInd === 1 ?
                                                    <Button onClick={handlePauseResume}>{hide ? "Pause" : "Resume"}</Button> : "Repair Completed"}

                                        </div>
                                    </div> */}

                                    <div className=" flex font-medium  md:w-[.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <h4 class=" text-sm text-cardBody font-poppins">
                                            {item.reason}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        :
                        props.repairOrder.map((item) => {
                            const currentdate = moment().format("DD/MM/YYYY");
                            const date = moment(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "

                                    >
                                        <div class="flex">
                                            <div className=" flex font-medium  md:w-[15.8rem] max-sm:w-full  ">
                                                <span class="underline text-[#1890ff] cursor-pointer"
                                                    onClick={() => {
                                                        handleRowData(item);
                                                        props.handleRepairPhone(true)
                                                    }}>
                                                    {item.newOrderNo}
                                                </span>
                                                &nbsp;&nbsp;
                                                {date === currentdate ? (
                                                    <span class="text-[tomato] font-bold">
                                                        New
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className=" flex font-medium   md:w-[17.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                                </h4>

                                            </div>
                                            <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <h4 class=" text-sm text-cardBody font-poppins">
                                                    {item.repairCompletePhoneCount}/{item.totalPhone}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className=" flex font-medium  md: max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                                props.locationId,
                                                                props.userId)
                                                        }}
                                                    >Repair Start</Button> :
                                                    item.repairInspectionInd === 1 ?
                                                        <Button onClick={handlePauseResume}>{hide ? "Pause" : "Resume"}</Button> :<label class="text-green-600">Completed</label>}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium  md:w-[.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm text-cardBody font-poppins">
                                                {item.reason}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </OnlyWrapCard>
                <OrderPhoneRepairModal
                    showRepairPhoneList={props.showRepairPhoneList}
                    handleRepairPhone={props.handleRepairPhone}
                    rowData={rowData}
                    inspectionRequiredInd={props.inspectionRequiredInd}
                />
            </div>
        </>
    )



}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    choosenOrderCatalogue: refurbish.choosenOrderCatalogue,
    repairOrder: refurbish.repairOrder,
    fetchingRepairorderById: refurbish.fetchingRepairorderById,
    showRepairPhoneList: refurbish.showRepairPhoneList,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairOrderByUser,
            handleRepairPhone,
            repairInspectionButton,
            getOrderIdForCatalogueItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);



