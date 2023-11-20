// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { getOpenQcByUser } from "./RefurbishAction";
// import { Button, Tooltip } from "antd";
// import moment from "moment";


// function OpenQcTable(props) {
//     useEffect(() => {
//         props.getOpenQcByUser(props.locationId, props.userId)
//     }, [props.locationId, props.userId])


//     const columns = [
//         {
//             title: "",
//             width: "1%"
//         },
//         {
//             title: "Order",
//             dataIndex: "newOrderNo",
//             width: "30%",

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
//             title: "Note",
//             dataIndex: "reason",
//             width: "30%",
//         },

//     ];
//     return (
//         <>
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.openQc}
//                 loading={props.fetchingOpenQc}
//                 pagination={false}
//                 scroll={{ y: 200 }}
//             />

//         </>
//     );
// }

// const mapStateToProps = ({ refurbish, auth }) => ({
//     fetchingOpenQc: refurbish.fetchingOpenQc,
//     userId: auth.userDetails.userId,
//     openQc: refurbish.openQc,
//     locationId: auth.userDetails.locationId,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getOpenQcByUser
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(OpenQcTable);


import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOpenQcByUser } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
import moment from "moment";
import { OnlyWrapCard } from "../../../Components/UI/Layout";

function OpenQcTable(props) {
    useEffect(() => {
        props.getOpenQcByUser(props.locationId, props.userId)
    }, [props.locationId, props.userId])


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
{props.openQc.map((item) => { 
    const currentdate = moment().format("DD/MM/YYYY");
    const date = moment(item.creationDate).format("DD/MM/YYYY");
               return (
                   <div>
                       <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "
                           
                           >
                              <div class="flex">
                           <div className=" flex font-medium  md:w-[15.5rem] max-sm:w-full  ">
                          {item.newOrderNo}
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
                         
                           <div className=" flex font-medium  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between ">                           
                               <div class=" text-xs text-cardBody font-poppins text-center">
                              {item.reason}

                               </div>
                           </div>
                         
                         
                       </div>
                   </div>
)})}
</OnlyWrapCard>

</div>
</>
  ) 
}

const mapStateToProps = ({ refurbish, auth }) => ({
    fetchingOpenQc: refurbish.fetchingOpenQc,
    userId: auth.userDetails.userId,
    openQc: refurbish.openQc,
    locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpenQcByUser
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenQcTable);
