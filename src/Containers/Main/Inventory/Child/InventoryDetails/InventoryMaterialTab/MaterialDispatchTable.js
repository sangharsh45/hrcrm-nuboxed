import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";


const MaterialDispatchTable = (props) => {


    //   useEffect(() => {
    //     props.getReceivedUserList(props.locationDetailsId)
    //   }, [])


    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[12.5rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
                        <div className=" md:w-[8.12rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
                        <div className=" md:w-[11.5rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
                        <div className="md:w-[4.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
                        <div className="md:w-[10.5rem]"><FormattedMessage id="app.inspectedby" defaultMessage="Inspected By" /></div>
                        <div className="md:w-[10.24rem]"><FormattedMessage id="app.phone" defaultMessage="Phones #" /></div>
                        <div className="md:w-[5.23rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
                        <div className="md:w-[5.2rem]"></div>
                        <div className="w-12"></div>
                    </div>

                    {/* {props.allReceivedUser.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.createAt).format("DD/MM/YYYY");
            return (
              <div>
                <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                  <div class="flex">

                    <div className=" flex font-medium flex-col md:w-[12.1rem] max-sm:w-full  ">
                      <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer underline text-blue-600">
                        <div
                          onClick={() => {
                            handleRowData(item);
                            props.handleReceivedOrderIdModal(true);
                          }}
                        >{item.newOrderNo}</div>&nbsp;&nbsp;
                        {date === currentdate ? (
                          <div class="text-xs font-bold text-[tomato]">
                            New
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">

                      <div class=" text-xs text-cardBody font-poppins">
                        {item.awbNo}
                      </div>

                    </div>

                  </div>

                  <div className=" flex font-medium flex-col md:w-[12.51rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">

                      {item.distributorName}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[5.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                    
                      <MultiAvatar
            primaryTitle={item.contactPersonName}
            imageId={item.imageId}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col md:w-[4.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      
                      <MultiAvatar
            primaryTitle={item.startInspectionUserName}
            imageId={item.imageId}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.phoneReceiveCount}/{item.phoneCount}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[7.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[10.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                   
                  </div>
                  <div className=" flex font-medium flex-col md:w-[8.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.inspectionInd === 0 ?
                        <Button
                        type="primary"
                        className="w-28 text-base"
                          onClick={() => props.updateInspection({
                            inspectionInd: 1,
                            startInspectionUser: props.userId,
                            startInspectionDate: dayjs()
                          }, item.orderPhoneId, props.locationDetailsId)}
                         >
                          Start Inspection
                        </Button>
                        : item.inspectionInd === 2 ?
                          <Button
                          className="cursor-pointer text-base"
                            onClick={() => {
                              handleRowData(item)
                              props.handleDeliveryDateModal(true);
                            }}
                          >
                            Send To Store
                          </Button> :
                          item.inspectionInd === 1 ?
                            <Button
                            className="w-28 text-base"
                            type="primary"
                              onClick={handlePauseResume}>
                              {pause ? "Resume Inspection" : "Pause Inspection"}
                            </Button> : <b>Store locator</b>}
                    </div>
                  </div>
                  <div class="flex md:items-center">

                  </div>
                  <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                        className="!text-base cursor-pointer"
                          onClick={() => {
                            handleRowData(item);
                            props.handleInventoryReceivedNoteOrderModal(true);
                          }}
                        />

                      </Tooltip>
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

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialDispatchTable)
);
