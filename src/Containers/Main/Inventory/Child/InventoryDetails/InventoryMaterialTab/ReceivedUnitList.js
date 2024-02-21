import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
// import { getMaterialReceivedDetailData } from "../../../InventoryAction"


const ReceivedUnitList = (props) => {
    // useEffect(() => {
    //     props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    // }, [])

    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.price" defaultMessage="Price" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.unit" defaultMessage="Unit" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.received" defaultMessage="Receive" /></div>

                        <div className=""></div>
                    </div>

                    {/* {props.receivedDetailData.map((item) => {

                        return (
                            <div>
                                <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:w-full  ">
                                            <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                {item.suppliesFullName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.price}
                                        </div>

                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unit}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unitReceived}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unitDamaged}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {`${item.unitReceived - item.unitDamaged}`}
                                        </div>
                                    </div>
                                    
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.remark}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.grnNumber}
                                        </div>
                                    </div>
                                   
                                </div>

                            </div>
                        );
                    })} */}
                </div>
            </div>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getMaterialReceivedDetailData,

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ReceivedUnitList)
);
