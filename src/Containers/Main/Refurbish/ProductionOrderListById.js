import React, { useState, lazy, Suspense, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
import { Button,Badge } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from '../../../Components/Placeholder';
const OrderPhoneModal = lazy(() => import('./OrderPhoneModal'));

function ProductionOrderListById(props) {
    useEffect(() => {
        props.getOrderByUser(props.locationId, props.userId)
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
<div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[34.12rem]"><FormattedMessage
                            id="app.order"
                            defaultMessage="order"
                        /></div>
                        <div className=" md:w-[35.1rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        {/* <div className=" md:w-[9.8rem] "><FormattedMessage
                            id="app.completedunit"
                            defaultMessage="Completed Units"
                        /></div> */}
                        <div className="md:w-[5.8rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="status"
                        /></div>

                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                    {props.orderByUser.map((item) => {
                        const currentdate = moment().format("DD/MM/YYYY");
                        const date = moment(item.creationDate).format("DD/MM/YYYY");
                        return (
                            <div >
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 "

                                >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[33.8rem] max-sm:w-full  ">
                                        <Badge size="small" count={`${item.qcCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                            <span class="underline text-[#1890ff] cursor-pointer w-[7rem] flex"
                                                
                                                onClick={() => {
                                                    handleRowData(item);
                                                    props.handleOrderPhoneModal(true)
                                                }}>
                                                {item.newOrderNo}
                                            </span>
                                            </Badge>
                                            &nbsp;&nbsp;
                                            {date === currentdate ? (
                                                <span
                                                class="text-[tomato] font-bold ml-4"
                                                >
                                                    New
                                                </span>
                                            ) : null}
                                        </div>

                                        <div className=" flex font-medium   md:w-[22.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.dueDate === null ? "" : moment(item.dueDate).format("DD-MM-YYYY")}
                                            </div>

                                        </div>
                                        {/* <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-sm text-cardBody font-poppins">
                                                {item.qcCompletePhoneCount}/{item.totalPhone}
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className=" flex font-medium  md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.qcInspectionInd === 0 ? <Button
                                            className="w-32"
                                                type="primary"
                                                onClick={() => {
                                                    props.qcInspectionButton({
                                                        productionDispatchId: item.productionDispatchId,
                                                        orderPhoneId: item.orderPhoneId,
                                                        qcInspectionInd: 1
                                                    }, item.orderPhoneId, props.locationId, props.userId)
                                                }}
                                            >
                                                Start Inspection
                                                
                                                </Button> : item.qcInspectionInd === 1 ?
                                                <Button  className="w-32" onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : <div class="text-green-600">Inspection Completed</div>}

                                        </div>
                                    </div>


                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <Suspense fallback={<BundleLoader/>}>
                <OrderPhoneModal
                    showPhoneList={props.showPhoneList}
                    handleOrderPhoneModal={props.handleOrderPhoneModal}
                    rowData={rowData}
                />
                </Suspense>
                
            </div>
        </>
    )
}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
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










