


import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getCallTimeline } from '../../LeadsAction';

const CallLeadsTable = (props) => {
  useEffect(() => {
      props.getCallTimeline(props.rowdata.leadsId);
  }, []);

  const { callTimeline, ratingValue } = props;
  return (
    <>
        <div className="mt-4">
        <Timeline>
          {callTimeline &&
            callTimeline.map((status, i) => (
              <Timeline.Item key={i}>
                <div>
                <div>{status.category} {status.activityType} {moment.utc(status.startdate).format('YYYY-MM-DD')}</div>
           
                </div>
                <div>
                
                 
                 
                </div>
              </Timeline.Item>
       
            ))}
        </Timeline>
        
      </div>
    </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  userId: auth.userDetails.userId,
  callTimeline: leads.callTimeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);






















// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { SearchOutlined } from "@ant-design/icons";
// import { Tooltip, Button, Input, Avatar } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { OnlyWrapCard } from '../../../../Components/UI/Layout'
// import {
//   getCallListbyLeads,
// } from "../../LeadsAction";
// import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// import Highlighter from "react-highlight-words";
// import { MultiAvatar2, } from "../../../../Components/UI/Elements";

// function CallLeadsTable(props) {
//   const [pageNo, setpageNo] = useState(0);

//   useEffect(() => {
//     const {
//         getCallListbyLeads,
//      // userDetails: { leadsId },
//      item
//     } = props;
//     getCallListbyLeads(props.rowdata.leadsId, pageNo);
//     setpageNo(pageNo + 1);
//    // props.getEmployeelist();
//   }, []);

//   const handleLoadMore = () => {
//     setTimeout(() => {
//       const {
//         getCallListbyLeads,
//         item
//       } = props;
//       getCallListbyLeads(props.rowdata.leadsId, pageNo);
//       setpageNo(pageNo + 1);
//      // props.getEmployeelist();
//     }, 100);
//   };

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   function getColumnSearchProps(dataIndex) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//       }) => (
//         <div style={{ padding: 8 }}>
//           <Input
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 240, marginBottom: 8, display: "block" }}
//           />

//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         <SearchOutlined
//           type="search"
//           style={{ color: filtered ? "#1890ff" : undefined }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record[dataIndex]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//         }
//       },
//       render: (text) =>
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//             searchWords={[searchText]}
//             autoEscape
//             textToHighlight={text.toString()}
//           />
//         ) : (
//           text
//         ),
//     };
//   }

//   function handleSearch(selectedKeys, confirm, dataIndex) {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   }

//   function handleReset(clearFilters) {
//     clearFilters();
//     setSearchText("");
//   }

//   const {
//     fetchingCallListRangeByUserId,
//     fetchingCallListRangeByUserIdError,
//     callListRangeByUserId,
//     deleteCall,
//     userDetails: { employeeId },
//     setEditNote,
//   } = props;
//   const assignToTypeOption = props.employees.map((item) => {
//     return {
//       text: item.assignToName,
//       value: item.assignToName,
//     };
//   });

//   if (fetchingCallListRangeByUserIdError) {
//     return <APIFailed />;
//   }

//   return (
//     <>
//       <InfiniteScroll
//         dataLength={callListRangeByUserId.length}
//         next={handleLoadMore}
//         hasMore={true}
//         endMessage={
//           <p style={{ textAlign: "center" }}>
//             <b>Yay! You have seen it all</b>
//           </p>
//         }
//         height={600}
//       >
//          <OnlyWrapCard>   
//           {props.callList.map((item) => (
//             <div className="flex justify-between mt-4 max-sm:flex-col overflow-x-hidden"
//             style={{
//                 borderBottom: "3px dotted #515050"
//             }}>
//               <div class="flex">
//               <div class="flex  flex-col md:w-28 max-sm:flex-row max-sm:justify-between w-full">
//               <div class="max-sm:hidden" >Type</div>
//             <div> {item.callType}</div>
//             </div>
//             <div class="flex  flex-col md:w-40 max-sm:flex-row max-sm:justify-between w-full">
//               <p class="max-sm:hidden" >Subject</p><p> {item.callPurpose}</p>
//               </div>
//               </div>
//               <div class="flex">
//               <div class="flex  flex-col md:w-48 max-sm:flex-row max-sm:justify-between w-full">
//               <p class="max-sm:hidden" >Date</p><p> {moment(item.startDate).format("llll")}</p>
//               </div>
//               <div class="flex  flex-col md:w-16 max-sm:flex-row max-sm:justify-between w-full">
//               <p class="max-sm:hidden" >Included</p>
//               <div>
//                 {item.included &&
//                   item.included.map((candidate, i) => {
//                     const data1 = candidate.fullName.slice(0, 2).toUpperCase();
//                     console.log("datas", data1);
//                     return (
//                       <Tooltip key={i} title={candidate.fullName}>
//                         <Avatar
//                           style={{
//                             backgroundColor: "#f56a00",
//                             fontFamily: "poppins",
//                           }}
//                         >
//                           {data1}
//                         </Avatar>
//                       </Tooltip>
//                     );
//                   })}
//               </div>
//               </div>
//               </div>
//               {/* <div class="flex  flex-col w-16">
//               <p>Team </p>
//               <MultiAvatar2
//                     primaryTitle={item.candidateName}
//                     //imageId={item.ownerImageId}
//                     imageURL={item.imageURL}
//                     imgWidth={"1.8em"}
//                     imgHeight={"1.8em"}
//                   />
             
//               </div> */}
//               <div class="flex items-center">
//              <div class="flex  flex-col md:w-24 max-sm:flex-row max-sm:justify-between w-full mb-5">
//               <p class="max-sm:hidden" >Assigned To</p>
//               <MultiAvatar2
//                     primaryTitle={item.assignedTo}
//                    // imageId={item.ownerImageId}
//                     imageURL={item.imageURL}
//                     imgWidth={"1.8em"}
//                     imgHeight={"1.8em"}
//                   />
//               {/* <p> {item.assignedTo || "Unassigned"}</p> */}
//               </div>
//               <div class="flex  flex-col md:w-36 max-sm:flex-row max-sm:justify-between w-full mb-7">
//               <p class="max-sm:hidden" >Completed</p><p> {item.completionInd ? "Yes" : "No"}</p></div>
//               {/* <div class="flex  flex-col w-16">
//               <p>Rating</p><p> {item.rating > 0 ? item.rating : "Not Rated"}</p>
//               </div> */}
              
//               <div class="flex  flex-col md:w-16 max-sm:flex-row max-sm:justify-between w-full mt-1 mb-1">
//               <p class="max-sm:hidden" >Owner</p>
//               <MultiAvatar2
//                     primaryTitle={item.woner}
//                     //imageId={item.ownerImageId}
//                     imageURL={item.imageURL}
//                     imgWidth={"1.8em"}
//                     imgHeight={"1.8em"}
//                   />
//               {/* <p> {item.woner || "Unknown"}</p> */}
//               </div>
              
//               <DeleteIcon  type="delete" style={{ cursor: "pointer",color:"red",fontSize:"1rem" }} 
//                 onClick={() => deleteCall(item.callId, employeeId)}
//               />
//               </div>
//             </div>
//           ))}
//         </OnlyWrapCard>
//       </InfiniteScroll>
//     </>
//   );
// }
// const mapStateToProps = ({ auth, call, employee,leads }) => ({
//   userDetails: auth.userDetails,
//   fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
//   fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
//   callListRangeByUserId: call.callListRangeByUserId,
//   employees: employee.employees,
//   callList:leads.callList
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getCallListbyLeads
//     },
//     dispatch
//   );

//   export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);

// function NoDataComponent(props) {
//   const { description, onClick, buttonText } = props;
//   return (
//     <div>
//       <div class=" flex justify-center items-center flex-col">
//         <p>{description || "We couldn't find relevant data"}</p>
//       </div>
//     </div>
//   );
// }
