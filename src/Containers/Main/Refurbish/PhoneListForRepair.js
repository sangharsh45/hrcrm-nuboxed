// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { getRepairPhoneByUser, updaterepairStatus, handleRepairPhoneNotesOrderModal } from "./RefurbishAction";
// import { Button, Tooltip } from "antd";
// import { FileDoneOutlined, IeOutlined } from "@ant-design/icons";
// import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
// import { SubTitle } from "../../../Components/UI/Elements";
// import ButtonGroup from "antd/lib/button/button-group";
// import moment from "moment";
// import AddingRepairSpareList from "./AddingRepairSpareList";
// import RepairTaskTable from "./RepairTaskTable";
// import RepairPhoneNotesOrderModal from "./RepairPhoneNotesOrderModal";
// import { NoteAddOutlined } from "@mui/icons-material";

// function PhoneListForRepair(props) {
//     useEffect(() => {
//         props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId)
//     }, []);

//     const [RowData, setRowData] = useState({});
//     function handleSetRowData(item) {
//         setRowData(item);
//     }
//     const [expand, setExpand] = useState(false);
//     const [spares, setspares] = useState(false);
//     const [phoneId, setphoneId] = useState("");

//     function handleExpand(phoneId) {
//         setExpand(!expand);
//         setspares(false)
//         setphoneId(phoneId);
//     }
//     function hanldeSpare(phoneId) {
//         setspares(!spares);
//         setExpand(false)
//         setphoneId(phoneId);
//     }

//     function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
//         const start = type;
//         console.log(start);
//         //////debugger;
//         if (status === type) {
//             size = "30px";
//         } else {
//             size = "16px";
//         }
//         return (
//             <Tooltip title={tooltip}>
//                 <Button
//                     ghost={status !== type}
//                     style={{
//                         padding: "6px",
//                         borderColor: "transparent",
//                         color: indStatus === type ? "orange" : "grey",
//                         // color: status === type && id === phoneId ? "orange" : "grey",
//                     }}
//                     onClick={onClick}
//                 >
//                     <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
//                 </Button>
//             </Tooltip>
//         );
//     }

//     const [active, setActive] = useState("To Start")
//     const [hide, setHide] = useState(false);

//     function handlePuaseButton() {
//         setHide(hide)
//     }
//     function handleQCRepairStatus(type, item) {
//         setActive(type)
//         console.log(type)
//         console.log(item)
//         const data = {
//             repairStatus: type,
//             orderPhoneId: props.rowData.orderId,
//             phoneId: item.phoneId,
//             repairTechnicianId: props.userId,
//             qcInspectionInd: type === "Complete" ? 2 : 1
//         }
//         props.updaterepairStatus(data, item.phoneId, props.rowData.orderPhoneId, props.locationId, props.userId)
//     }
//     const columns = [
//         {
//             title: "",
//             dataIndex: "",
//             width: "2%",
//         },
//         {
//             title: "Company",
//             dataIndex: "company",
//             width: "15%",

//         },
//         {
//             title: "Model",
//             dataIndex: "model",
//             width: "12%",
//         },
//         {
//             title: "IMEI",
//             dataIndex: "imei",
//             width: "10%",
//         },
//         {
//             title: "QR Code",
//             width: "8%",
//             render: (name, item, i) => {
//                 return (
//                     <SubTitle>
//                         {item.qrCodeId ? (
//                             <QRCodeModal
//                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
//                                 imgHeight={"2.8em"}
//                                 imgWidth={"2.8em"}
//                                 imgRadius={20}
//                             />
//                         ) : (
//                             <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
//                                 No QR
//                             </span>
//                         )}
//                     </SubTitle>
//                 );
//             },
//         },
//         {
//             title: "Repair",
//             width: "15%",
//             render: (text, item) => {
//                 return (
//                     <>

//                         {props.rowData.repairInspectionInd === 1 && <ButtonGroup>
//                             {/* <StatusIcon
//                                 color="blue"
//                                 type="To Start"
//                                 iconType="fa-hourglass-start"
//                                 tooltip="To Start"
//                                 status={active}
//                                 indStatus={item.repairStatus}
//                                 id={item.phoneId}
//                                 phoneId={RowData.phoneId}
//                                 onClick={() => {
//                                     handleQCRepairStatus("To Start", item);
//                                     handleSetRowData(item)
//                                 }}
//                             /> */}
//                             <StatusIcon
//                                 type="In Progress"
//                                 iconType="fa-hourglass-half"
//                                 tooltip="In Progress"
//                                 id={item.phoneId}
//                                 indStatus={item.repairStatus}
//                                 phoneId={RowData.phoneId}
//                                 status={active}
//                                 onClick={() => {
//                                     handleQCRepairStatus("In Progress", item);
//                                     handleSetRowData(item)
//                                 }}
//                             />
//                             <StatusIcon
//                                 type="Complete"
//                                 iconType="fa-hourglass"
//                                 tooltip="Complete"
//                                 status={active}
//                                 id={item.phoneId}
//                                 indStatus={item.repairStatus}
//                                 phoneId={RowData.phoneId}
//                                 onClick={() => {
//                                     handleQCRepairStatus("Complete", item);
//                                     handleSetRowData(item)
//                                 }}
//                             />
//                         </ButtonGroup>}
//                     </>
//                 )
//             }
//         },
//         {
//             title: "Start Time",
//             width: "10%",
//             render: (text, item) => {
//                 const time = moment(item.repairStartTime).add(5, 'hours');
//                 const starttimme = time.add(30, 'minutes')
//                 return (
//                     <>{item.repairStartTime === null ? "" : moment(starttimme).format('LT')}</>
//                 )
//             }
//         },
//         {
//             title: "End Time",
//             width: "10%",
//             render: (text, item) => {
//                 const time = moment(item.repairEndTime).add(5, 'hours');
//                 const endtimme = time.add(30, 'minutes')
//                 return (
//                     <>{item.repairEndTime === null ? "" : moment(endtimme).format('LT')}</>
//                 )
//             }
//         },
//         {
//             title: "Estimated Time",
//             width: "10%",
//             render: (text, item) => {
//                 return (
//                     <>{item.estimateRepairTimeHours || "0"}H:{item.estimateRepairTimeMinutes || "0"}M:{item.estimateRepairTimeSeconds || "0"}S</>
//                 )
//             }
//         },
//         {
//             title: "Hour",
//             width: "7%",
//             dataIndex: "totalhours"
//         },
//         {
//             title: "",
//             width: "3%",
//             render: (name, item, i) => {
//                 //debugger
//                 return (
//                     <Tooltip title="Spare">
//                         <span style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}

//                             onClick={() => {
//                                 handleSetRowData(item);
//                                 hanldeSpare();
//                             }}>
//                             <i class="fab fa-linode"></i>
//                         </span>


//                     </Tooltip>
//                 );
//             },
//         },
//         {
//             title: "",
//             width: "3%",
//             render: (name, item, i) => {
//                 //debugger
//                 return (
//                     <Tooltip title="Task">
//                         <FileDoneOutlined
//                             style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
//                             type="file-done"
//                             onClick={() => {
//                                 handleSetRowData(item);
//                                 handleExpand(item.phoneId);
//                             }}
//                         />

//                     </Tooltip>
//                 );
//             },
//         },
//         {
//             title: "",
//             width: "3%",
//             render: (name, item, i) => {
//                 //debugger
//                 return (
//                     <Tooltip title="Notes">
//                         <NoteAddOutlined
//                             style={{ cursor: "pointer", fontSize: "13px" }}
//                             onClick={() => {
//                                 handleSetRowData(item);
//                                 props.handleRepairPhoneNotesOrderModal(true);
//                             }}
//                         />

//                     </Tooltip>
//                 );
//             },
//         },
//     ];


//     return (
//         <>
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.repairPhone}
//                 pagination={false}
//                 scroll={{ y: 200 }}
//             />
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                     type="primary"
//                     onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}</Button>
//             </div>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             {spares && (
//                 <AddingRepairSpareList
//                     phoneId={phoneId}
//                     RowData={RowData}
//                 />
//             )}
//             {expand && (
//                 <RepairTaskTable
//                     phoneId={phoneId}
//                     RowData={RowData} />
//             )}
//             <RepairPhoneNotesOrderModal
//                 RowData={RowData}
//                 phoNotesRepairOrderModal={props.phoNotesRepairOrderModal}
//                 handleRepairPhoneNotesOrderModal={props.handleRepairPhoneNotesOrderModal}
//             />
//         </>
//     );
// }

// const mapStateToProps = ({ refurbish, auth }) => ({
//     repairPhone: refurbish.repairPhone,
//     userId: auth.userDetails.userId,
//     locationId: auth.userDetails.locationId,
//     phoNotesRepairOrderModal: refurbish.phoNotesRepairOrderModal,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getRepairPhoneByUser,
//             updaterepairStatus,
//             handleRepairPhoneNotesOrderModal
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(PhoneListForRepair);




import React, { useState, useEffect, useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getRepairPhoneByUser, updaterepairStatus, getCatalogueByUser, handleRepairPhoneNotesOrderModal } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
import { FileDoneOutlined, IeOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import moment from "moment";
import { NoteAddOutlined } from "@mui/icons-material";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const RepairPhoneNotesOrderModal = lazy(() => import('./RepairPhoneNotesOrderModal'));
const RepairTaskTable = lazy(() => import('./RepairTaskTable'));
const AddingRepairSpareList = lazy(() => import('./AddingRepairSpareList'));

function PhoneListForRepair(props) {
    useEffect(() => {
        props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId)
    }, []);

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
    const [expand, setExpand] = useState(false);
    const [spares, setspares] = useState(false);
    const [phoneId, setphoneId] = useState("");

    function handleExpand(phoneId) {
        setExpand(!expand);
        setspares(false)
        setphoneId(phoneId);
    }
    function hanldeSpare(phoneId) {
        setspares(!spares);
        setExpand(false)
        setphoneId(phoneId);
    }

    function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    ghost={status !== type}
                    style={{
                        padding: "6px",
                        borderColor: "transparent",
                        color: indStatus === type ? "orange" : "grey",
                        // color: status === type && id === phoneId ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")
    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    function handleQCRepairStatus(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            orderPhoneId: props.rowData.orderId,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updaterepairStatus(data, item.phoneId, props.rowData.orderPhoneId, props.locationId, props.userId)
    }

    return (
        <>
            <div className=' flex justify-end sticky flex-col z-auto overflow-x-auto h-[30rem]'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[3.1rem]"><FormattedMessage
                        id="app.company"
                        defaultMessage="company"
                      /></div>
                        <div className=" md:w-[2.2rem]"><FormattedMessage
                        id="app.model"
                        defaultMessage="model"
                      /></div>
                       <div className=" md:w-[5.8rem] "><FormattedMessage
                        id="app.iMEI"
                        defaultMessage="iMEI"
                      /></div>
                        <div className="md:w-[3.6rem]"><FormattedMessage
                        id="app.qrcode"
                        defaultMessage="qrcode"
                      /></div>
                        <div className="md:w-[4.8rem]"><FormattedMessage
                        id="app.repair"
                        defaultMessage="repair"
                      /></div>
                        <div className="md:w-[4.8rem]"><FormattedMessage
                        id="app.starttime"
                        defaultMessage="starttime"
                      /></div>
                       <div className="md:w-[4.3rem]"><FormattedMessage
                        id="app.endtime"
                        defaultMessage="endtime"
                      /></div>
                        <div className="md:w-[7.2rem]"><FormattedMessage
                        id="app.estimatedtime"
                        defaultMessage="estimatedtime"
                      /></div>
                        <div className="md:w-[6.5rem]"><FormattedMessage
                        id="app.hours"
                        defaultMessage="hours"
                      /></div>
                        <div className="md:w-[6.9rem]"></div>
                    </div>
                    {props.repairPhone.map((item) => {
                        const currentdate = moment().format("DD/MM/YYYY");
                        const date = moment(item.creationDate).format("DD/MM/YYYY");
                        const starttimme = moment(item.qcStartTime).add(5, 'hours').add(30, 'minutes');
                        //  const endtimme = moment(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                        const time = moment(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                        const endtimme = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Using ISO 8601 format
                        return (
                            <div>
                                <div className="flex rounded-xl  justify-between mt-4 bg-white h-12 items-center p-3 "

                                >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[5.6rem] max-sm:w-full  ">
                                            {item.company}
                                        </div>

                                        <div className=" flex font-medium   md:w-[2.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.model}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <h4 class=" text-sm text-cardBody font-poppins">
                                                {item.imei}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[2.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            <SubTitle>
                                                {item.qrCodeId ? (
                                                    <QRCodeModal
                                                        qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                        imgHeight={"2.8em"}
                                                        imgWidth={"2.8em"}
                                                        imgRadius={20}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                                        No QR
                                                    </span>
                                                )}
                                            </SubTitle>

                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[6.6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {props.rowData.repairInspectionInd === 1 && <ButtonGroup>

                                                <StatusIcon
                                                    type="In Progress"
                                                    iconType="fa-hourglass-half"
                                                    tooltip="In Progress"
                                                    id={item.phoneId}
                                                    indStatus={item.repairStatus}
                                                    phoneId={RowData.phoneId}
                                                    status={active}
                                                    onClick={() => {
                                                        handleQCRepairStatus("In Progress", item);
                                                        handleSetRowData(item)
                                                    }}
                                                />
                                                <StatusIcon
                                                    type="Complete"
                                                    iconType="fa-hourglass"
                                                    tooltip="Complete"
                                                    status={active}
                                                    id={item.phoneId}
                                                    indStatus={item.repairStatus}
                                                    phoneId={RowData.phoneId}
                                                    onClick={() => {
                                                        handleQCRepairStatus("Complete", item);
                                                        handleSetRowData(item)
                                                    }}
                                                />
                                            </ButtonGroup>}

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[5.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.qcStartTime === null ? "" : moment(starttimme).format('LT')}

                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[6.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            <>{item.qcStartTime === null ? "" : moment(starttimme).format('LT')}</>

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[8.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.estimateRepairTimeHours || "0"}H:{item.estimateRepairTimeMinutes || "0"}M:{item.estimateRepairTimeSeconds || "0"}S

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.totalhours}

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[1.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            <Tooltip title="Spare">
                                                <span style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}

                                                    onClick={() => {
                                                        handleSetRowData(item);
                                                        hanldeSpare();
                                                    }}>
                                                    <i class="fab fa-linode"></i>
                                                </span>


                                            </Tooltip>

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[1.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            <Tooltip title="Task">
                                                <FileDoneOutlined
                                                    style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
                                                    type="file-done"
                                                    onClick={() => {
                                                        handleSetRowData(item);
                                                        handleExpand(item.phoneId);
                                                    }}
                                                />

                                            </Tooltip>

                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[1.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            <Tooltip title="Notes">
                                                <NoteAddOutlined
                                                    style={{ cursor: "pointer", fontSize: "13px" }}
                                                    onClick={() => {
                                                        handleSetRowData(item);
                                                        props.handleRepairPhoneNotesOrderModal(true);
                                                    }}
                                                />

                                            </Tooltip>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="primary"
                        onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}</Button>
                </div>
                {spares && (
                    <AddingRepairSpareList
                        phoneId={phoneId}
                        RowData={RowData}
                    />
                )}
                {expand && (
                    <RepairTaskTable
                        phoneId={phoneId}
                        RowData={RowData} />
                )}

                <RepairPhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesRepairOrderModal={props.phoNotesRepairOrderModal}
                    handleRepairPhoneNotesOrderModal={props.handleRepairPhoneNotesOrderModal}
                />
            </div>
        </>
    )

}

const mapStateToProps = ({ refurbish, auth }) => ({
    repairPhone: refurbish.repairPhone,
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    phoNotesRepairOrderModal: refurbish.phoNotesRepairOrderModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairPhoneByUser,
            updaterepairStatus,
            getCatalogueByUser,
            handleRepairPhoneNotesOrderModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListForRepair);
