
// import React, { Component, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
// import OrderPhoneModal from "./OrderPhoneModal";
// import { Button } from "antd";
// import moment from "moment";

// function ProductionOrderListById(props) {
//     useEffect(() => {
//         props.getOrderByUser(props.locationId, props.userId)
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
//                                 props.handleOrderPhoneModal(true)
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
//             width: "30%",
//             render: (text, item) => {
//                 return (
//                     <>{item.dueDate === null ? "" : moment(item.dueDate).format("DD-MM-YYYY")}</>
//                 )
//             }
//         },
//         {
//             title: "Completed Phones",
//             width: "20%",
//             render: (text, item) => {
//                 return (
//                     <>{item.qcCompletePhoneCount}/{item.totalPhone}</>
//                 )
//             }
//         },
//         {
//             title: "",
//             width: "20%",
//             render: (text, item) => {
//                 return (
//                     <>
//                         {item.qcInspectionInd === 0 ? <Button
//                             type="primary"
//                             onClick={() => {
//                                 props.qcInspectionButton({
//                                     productionDispatchId: item.productionDispatchId,
//                                     orderPhoneId: item.orderPhoneId,
//                                     qcInspectionInd: 1
//                                 }, item.orderPhoneId, props.locationId, props.userId)
//                             }}
//                         >Start Inspection</Button> : item.qcInspectionInd === 1 ?
//                             <Button onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : "Inspection Completed"}
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
//                     dataSource={props.orderByUser}
//                     scroll={{ y: 200 }}
//                     pagination={false}
//                     loading={props.fetchingOrderByUser}
//                 />
//             )}
//             <OrderPhoneModal
//                 showPhoneList={props.showPhoneList}
//                 handleOrderPhoneModal={props.handleOrderPhoneModal}
//                 rowData={rowData}
//             />
//         </>
//     );
// }

// const mapStateToProps = ({ refurbish, auth }) => ({
//     locationId: auth.userDetails.locationId,
//     userId: auth.userDetails.userId,
//     orderByUser: refurbish.orderByUser,
//     showPhoneList: refurbish.showPhoneList,
//     fetchingOrderByUser: refurbish.fetchingOrderByUser
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getOrderByUser,
//             handleOrderPhoneModal,
//             qcInspectionButton
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderListById);




import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
import OrderPhoneModal from "./OrderPhoneModal";
import { Button } from "antd";
import moment from "moment";
import { OnlyWrapCard } from "../../../Components/UI/Layout";

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
<OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
<div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
    <div className=" md:w-[4.1rem]">Order</div>
    <div className=" md:w-[5.1rem]">Due Date</div>
    <div className=" md:w-[9.8rem] ">Completed Phones</div>
    <div className="md:w-[6.6rem]"></div>
    <div className="md:w-[5.8rem]">Note</div>
    {/* <div className="md:w-[4.3rem]"></div> */}
  </div>
{props.orderByUser.map((item) => { 
    const currentdate = moment().format("DD/MM/YYYY");
    const date = moment(item.creationDate).format("DD/MM/YYYY");
               return (
                   <div>
                       <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "
                           
                           >
                              <div class="flex">
                           <div className=" flex font-medium  md:w-[15.2rem] max-sm:w-full  ">
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
                           </div>

                           <div className=" flex font-medium   md:w-[19.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                           <div className=" flex font-medium  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between ">                           
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
                    >Start Inspection</Button> : item.qcInspectionInd === 1 ?
                        <Button onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : "Inspection Completed"}

                               </div>
                           </div>
                         
                         
                       </div>
                   </div>
)})}
</OnlyWrapCard>
<OrderPhoneModal
                showPhoneList={props.showPhoneList}
                handleOrderPhoneModal={props.handleOrderPhoneModal}
                rowData={rowData}
            />
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










