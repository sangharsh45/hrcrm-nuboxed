// import React, { useState, useEffect,lazy ,Suspense} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../Components/UI/Antd";
// import { getPhonelistById, handlePhoneNotesOrderModal, updateQCStatus } from "../../AccountAction";
// import * as Yup from "yup";
// import { Button, Tooltip } from "antd";
// import { SubTitle } from "../../../../../Components/UI/Elements";
// import ButtonGroup from "antd/lib/button/button-group";
// import NoteAltIcon from '@mui/icons-material/NoteAlt';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import { BundleLoader } from "../../../../../Components/Placeholder";
// const PhoneNotesOrderModal =lazy(()=>import("./PhoneNotesOrderModal"));
// const AccountPhoneTaskTable =lazy(()=>import("./AccountPhoneTaskTable"));
// const AddingSpareList =lazy(()=>import("./AddingSpareList"));
// const QRCodeModal =lazy(()=>import("../../../../../Components/UI/Elements/QRCodeModal"));

// function DistributorPauseForm(props) {
//     useEffect(() => {
//         props.getPhonelistById(props.particularRowData.orderId)
//     }, [])

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

//     function StatusIcon({ type, size, indStatus, iconType, tooltip, status, id, onClick, phoneId }) {
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
//                     }}
//                     onClick={onClick}
//                 >
//                     <i className={`fas ${iconType}`} style={{ fontSize: "1rem" }}></i>
//                 </Button>
//             </Tooltip>
//         );
//     }
 
//     if(props.fetchingNoofTecnician){
//         return <BundleLoader/>
//         }
//     return (
//         <>
//             <div className=' flex justify-end sticky  z-auto'>
//             <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
//                     <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
//                         <div className="w-8"></div>
//                         <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.OEM"
//                         defaultMessage="OEM"
//                      /></div>
//                                 <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.model"
//                         defaultMessage="Model"
//                      /></div>
//                         <div className="md:w-[8.12rem]"><FormattedMessage
//                         id="app.IMEI"
//                         defaultMessage="IMEI"
//                       /></div>
//                        <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.os"
//                         defaultMessage="OS"
//                      /></div>
//                        <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.gb"
//                         defaultMessage="GB"
//                      /></div>
//                      <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.color"
//                         defaultMessage="Color"
//                      /></div>
//                        <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.condition"
//                         defaultMessage="Condition"
//                      /></div>
//                       <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.expectedprice"
//                         defaultMessage="Expected Price"
//                      /></div>
//                        <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.totalhours"
//                         defaultMessage="Total Hours"
//                      /></div>
//                       <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.totalcost"
//                         defaultMessage="Total Cost"
//                      /></div>
//                      <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.finalprice"
//                         defaultMessage="Final Price"
//                      /></div>
//                          <div className=" md:w-[8.1rem]"><FormattedMessage
//                         id="app.qc"
//                         defaultMessage="QC"
//                      /></div>
//                         <div className=" md:w-[8.1rem]"></div>
//                     </div>
//                     {props.technicianByID.map((item) => {
//                         return (
//                             <div>
//                                 <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
//                                     <div class="flex">
//                                         <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
//                                         <span
//                              onClick={() => handleRowdata(item)}
//                              style={{
//                                  textDecoration: "underline",
//                                  color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
//                                 cursor: "pointer"
//                             }}
//                          >
//                             {item.technicianName}
//                          </span>
//                                         </div>

//                                         <div className=" flex font-medium   md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between  ">
//                                             <div class=" text-xs text-cardBody font-poppins">
                                               
//                                             </div>

//                                         </div>
//                                         <div className=" flex font-medium   md:w-[8.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
//                                             <div class=" text-xs text-cardBody font-poppins">
//                                                 {item.totalPhone}
//                                             </div>

//                                         </div>

//                                         <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
//                    <div>
//                    <Tooltip title={<FormattedMessage
//                                                     id="app.rating"
//                                                     defaultMessage="Rating"
//                                                 />}>
//                                                     <StarBorderIcon
                                                    
//                                                         className="!text-base cursor-pointer" />
//                                                 </Tooltip>

//                         </div>
//                         <div>
//                         <Tooltip title={<FormattedMessage
//                                                     id="app.Notes"
//                                                     defaultMessage="Notes"
//                                                 />}>
//                                                     <NoteAltIcon
//                                                      className="!text-base cursor-pointer"
//                                                          />
//                                                 </Tooltip>

//                         </div>
//             </div>      
//             <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
//                    <div>
//                    <Tooltip title={<FormattedMessage
//                                                     id="app.delete"
//                                                     defaultMessage="Detele"
//                                                 />}>
//                                                     <DeleteIcon
//                                                     className="!text-base cursor-pointer text-[red]"
//                                                     onClick={()=>{props.removeOrderAcc(item.orderId)}}
//                                                         />
//                                                 </Tooltip>

//                         </div>   
//             </div>            
//                                     </div>

//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
                
//             </div>
//             {show && <QCPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
//         </>
//     )
// }


// const mapStateToProps = ({ auth, refurbish }) => ({
//     technicianByID: refurbish.technicianByID,
//     fetchingNoofTecnician: refurbish.fetchingNoofTecnician
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getPhonelistById
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(DistributorPauseForm);






import React, { useState, useEffect,lazy ,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getPhonelistById, handlePhoneNotesOrderModal, updateQCStatus } from "../../AccountAction";
import * as Yup from "yup";
import { Button, Tooltip } from "antd";
import { SubTitle } from "../../../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { BundleLoader } from "../../../../../Components/Placeholder";
const PhoneNotesOrderModal =lazy(()=>import("./PhoneNotesOrderModal"));
const AccountPhoneTaskTable =lazy(()=>import("./AccountPhoneTaskTable"));
const AddingSpareList =lazy(()=>import("./AddingSpareList"));
const QRCodeModal =lazy(()=>import("../../../../../Components/UI/Elements/QRCodeModal"));

const FormSchema = Yup.object().shape({
    pauseNoOfDays: Yup.string().required("Input required!"),
    pauseDate: Yup.string().required("Input required!"),
});

function DistributorPauseForm(props) {
    useEffect(() => {
        props.getPhonelistById(props.particularRowData.orderId)
    }, [])

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

    function StatusIcon({ type, size, indStatus, iconType, tooltip, status, id, onClick, phoneId }) {
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
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "1rem" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")

    // function handleQCStatus(type) {
    //   setActive(type)
    //   console.log(type)
    //   console.log(RowData.phoneId)
    //   const data = {
    //     qcStatus: type,
    //     orderPhoneId: props.particularRowData.orderId,
    //     phoneId: RowData.phoneId
    //   }
    //   props.updateQCStatus(data, RowData.phoneId, props.particularRowData.orderId)
    // }

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "OEM",
            dataIndex: "company",
            width: "11%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "9%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "10%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "10%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "8%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "9%",
        },
        {
            title: "Condition",
            dataIndex: "condition",
            width: "10%",
        },
        {
            title: "Expected Price",
            dataIndex: "expectedPrice",
            width: "13%",
        },
        {
            title: "Total Hours",
            dataIndex: "totalhours",
            width: "10%",
        },
        {
            title: "Total Cost",
            dataIndex: "totalExtraCost",
            width: "12%",
        },
        {
            title: "Final Price",
            dataIndex: "totalPrice",
            width: "10%",
        },
        {
            title: "QC",
            width: "15%",

            render: (text, item) => {
                return (
                    <>
                        <ButtonGroup>
                            <StatusIcon
                                color="blue"
                                type="To Start"
                                iconType="fa-hourglass-start"
                                tooltip="To Start"
                                status={active}
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}

                            />
                            <StatusIcon
                                type="In Progress"
                                iconType="fa-hourglass-half"
                                tooltip="In Progress"
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}
                                status={active}

                            />
                            <StatusIcon
                                type="Complete"
                                iconType="fa-hourglass"
                                tooltip="Complete"
                                status={active}
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}

                            />
                        </ButtonGroup>
                    </>
                )
            }
        },
        {
            title: "QR",
            width: "5%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {item.qrCodeId ? (
                            <QRCodeModal
                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                imgHeight={"2.8em"}
                                imgWidth={"2.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span class="text-xs font-bold">
                                No QR
                            </span>
                        )}
                    </SubTitle>
                );
            },
        },
        {
            title: "",
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Spare">
                        <PrecisionManufacturingIcon
                            style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}

                            onClick={() => {
                                handleSetRowData(item);
                                hanldeSpare();
                            }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Task">
                        <FormatListBulletedIcon
                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
                            type="file-done"
                            onClick={() => {
                                handleSetRowData(item);
                                handleExpand(item.phoneId);
                            }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Notes">
                        <NoteAltIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() => {
                                handleSetRowData(item);
                                props.handlePhoneNotesOrderModal(true);
                            }}
                        />

                    </Tooltip>
                );
            },
        },
    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.phoneListById}
                pagination={false}
                scroll={{ y: 200 }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Suspense fallback={<BundleLoader/>}>
            {expand && (
                <AccountPhoneTaskTable
                    phoneId={phoneId}
                    RowData={RowData} />
            )}
            <PhoneNotesOrderModal
                RowData={RowData}
                phoNotesOrderModal={props.phoNotesOrderModal}
                handlePhoneNotesOrderModal={props.handlePhoneNotesOrderModal}
            />
            {spares && (
                <AddingSpareList
                    phoneId={phoneId}
                    RowData={RowData}
                />
            )}
             </Suspense>
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    phoneListById: distributor.phoneListById,
    phoNotesOrderModal: distributor.phoNotesOrderModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhonelistById,
            handlePhoneNotesOrderModal,
            updateQCStatus
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorPauseForm);
