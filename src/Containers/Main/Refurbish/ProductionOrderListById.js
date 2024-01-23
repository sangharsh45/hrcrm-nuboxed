import React, { useState, lazy, Suspense, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
import { Button } from "antd";
import moment from "moment";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
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
                        <div className=" md:w-[9.8rem] "><FormattedMessage
                            id="app.completedunit"
                            defaultMessage="Completed Units"
                        /></div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="status"
                        /></div>

                    </div>
                    {props.orderByUser.map((item) => {
                        const currentdate = moment().format("DD/MM/YYYY");
                        const date = moment(item.creationDate).format("DD/MM/YYYY");
                        return (
                            <div>
                                <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "

                                >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[22.2rem] max-sm:w-full  ">
                                            <span class="underline text-[#1890ff] cursor-pointer"
                                                
                                                onClick={() => {
                                                    handleRowData(item);
                                                    props.handleOrderPhoneModal(true)
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

                                        <div className=" flex font-medium   md:w-[26.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.dueDate === null ? "" : moment(item.dueDate).format("DD-MM-YYYY")}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <h4 class=" text-sm text-cardBody font-poppins">
                                                {item.qcCompletePhoneCount}/{item.totalPhone}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.qcInspectionInd === 0 ? <Button
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
                                                <Button onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : <label class="text-green-600">Inspection Completed</label>}

                                        </div>
                                    </div>


                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
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










