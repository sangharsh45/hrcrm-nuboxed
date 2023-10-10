// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import moment from "moment";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { SearchOutlined } from "@ant-design/icons";
// import { Tooltip, Button, Empty, Input, Avatar } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
// import "../../../../App.css";
// import { getEmployeelist } from "../../../Employees/EmployeeAction";
// import {
//   deleteCall,
//   getCallListRangeByUserId,
//   handleCallModal,
//   setEditNote,
//   getNotesListByCallId,
// } from "../../CallAction";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// import Highlighter from "react-highlight-words";
// import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";

// function CallTable(props) {
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const {
//       getCallListRangeByUserId,
//       userDetails: { employeeId },
//     } = props;
//     getCallListRangeByUserId(employeeId, page);
//     setPage(page + 1);
//     props.getEmployeelist();
//   }, []);

//   const handleLoadMore = () => {
//     setTimeout(() => {
//       const {
//         getCallListRangeByUserId,
//         userDetails: { employeeId },
//       } = props;
//       getCallListRangeByUserId(employeeId, page);
//       setPage(page + 1);
//       props.getEmployeelist();
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
//             //icon="search"
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
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },
//     {
//       // title: "Type",
//       title: <FormattedMessage id="app.type" defaultMessage="Type" />,
//       dataIndex: "callType",
//       width: "10%",
//       render: (name, item, i) => {
//         console.log(item);
//         return (
//           <span>
//             {item.callType === "Inbound" && (
//               <Tooltip title="Inbound">
//                 <span>
//                   <i className="fas fa-sign-in-alt"></i>
//                 </span>
//               </Tooltip>
//             )}
//             {item.callType === "Outbound" && (
//               <Tooltip title="Outbound">
//                 <span>
//                   <i className="fas fa-sign-out-alt"></i>
//                 </span>
//               </Tooltip>
//             )}
//             {item.callType === "Conference" && (
//               <Tooltip title="Conference">
//                 <span>
//                   <i className="fas fa-network-wired"></i>
//                 </span>
//               </Tooltip>
//             )}
//           </span>
//         );
//       },
//       onFilter: (value, record) => record.callType.indexOf(value) === 0,
//       sorter: (a, b) => a.callType > b.callType,
//     },
//     {
//       title: <FormattedMessage id="app.subject" defaultMessage="Subject" />,
//       dataIndex: "callPurpose",
//       width: "10%",
//       render: (name, item, i) => {
//         return <span>{` ${item.callPurpose}`}</span>;
//       },
//       onFilter: (value, record) => record.callPurpose.indexOf(value) === 0,
//       sorter: (a, b) =>
//         a.callPurpose &&
//         a.callPurpose.toLowerCase() > b.callPurpose &&
//         b.callPurpose.toLowerCase()
//           ? 1
//           : -1,
//     },
//     {
//       // title: "Contact",
//       title: <FormattedMessage id="app.contact" defaultMessage="Contact" />,
//       dataIndex: "contactName",
//       width: "10%",
//       defaultSortOrder: "descend",
//       ...getColumnSearchProps("contactName"),
//       render: (name, item, i) => {
//         return (
//           <>
//             {/* <Tooltip title={item.contactName}> */}
//             <span>
//               {item.contactName === null ? (
//                 ""
//               ) : (
//                 <MultiAvatar2
//                   primaryTitle={item.contactName}
//                   imageId={item.ownerImageId}
//                   imageURL={item.imageURL}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               )}
//             </span>
//             {/* </Tooltip> */}
//           </>
//         );
//       },
//     },
//     {
//       // title: "Start",
//       title: <FormattedMessage id="app.datetime" defaultMessage="Date" />,
//       dataIndex: "startDate",
//       width: "13%",
//       defaultSortOrder: "descend",
//       render: (text, item) => {
//         const startDate = moment(item.startDate).format("LLL");
//         return <span>{startDate}</span>;
//       },
//     },
//     {
//       title: <FormattedMessage id="app.team" defaultMessage="Team" />,
//       dataIndex: "candidateName",
//       width: "10%",
//       ...getColumnSearchProps("candidateName"),
//     },
//     {
//       title: <FormattedMessage id="app.included" defaultMessage="Included" />,
//       dataIndex: "included",
//       width: "10%",
//       render: (name, item, i) => {
//         return {
//           children: (
//             <>
//               <Avatar.Group
//                 maxCount={2}
//                 maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//               >
//                 {item.included &&
//                   item.included.map((candidate, i) => {
//                     const data1 = candidate.fullName.split("")[0].toUpperCase();
//                     console.log("datas", data1);
//                     return (
//                       <Tooltip title={candidate.fullName}>
//                         <Avatar style={{ backgroundColor: "#f56a00",fontFamily:"poppins" }}>
//                           {data1}
//                         </Avatar>
//                       </Tooltip>
//                     );
//                   })}
//               </Avatar.Group>
//             </>
//           ),
//         };
//       },
//     },
//     {
//       title: "",
//       dataIndex: "completionInd",
//       width: "3%",
//       render: (text, item) => {
//         return (
//           <>
//             {item.completionInd === false ? (
//               <CheckCircleOutlineIcon
//                 style={{
//                   color: "#eeeedd",
//                   fontSize: "1.5em",
//                 }}
//               />
//             ) : (
//               <span>
//                 <CheckCircleOutlineIcon
//                   style={{ color: "#67d239", fontSize: "1.5em" }}
//                 />
//               </span>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "rating",
//       width: "5%",
//       render: (name, item, i) => {
//         return (
//           <>
//             {item.rating === 0 ? (
//               <StarBorderIcon style={{ color: "#eeeedd", fontSize: "1.5em" }} />
//             ) : (
//               <span>
//                 {item.rating}
//                 {
//                   <StarBorderIcon
//                     style={{ color: "#FFD700", fontSize: "1.5em" }}
//                   />
//                 }
//               </span>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: (
//         <FormattedMessage id="app.assignedTo" defaultMessage="Assigned To" />
//       ),
//       dataIndex: "assignedTo",
//       width: "10%",
//       filters: assignToTypeOption,
//       onFilter: (value, record) => {
//         return record.assignedTo === value;
//       },
//       render: (name, item, i) => {
//         return (
//           // <Tooltip title={item.assignedTo}>
//           <SubTitle>
//             <span>
//               {item.assignedTo === null ? (
//                 ""
//               ) : (
//                 <MultiAvatar2
//                   primaryTitle={item.assignedTo}
//                   imageId={item.imageId}
//                   imageURL={item.imageURL}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               )}
//             </span>
//           </SubTitle>
//           // </Tooltip>
//         );
//       },
//     },
//     {
//       title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
//       dataIndex: "woner",
//       width: "10%",
//       render: (name, item, i) => {
//         return (
//           <>
//             <span>
//               <MultiAvatar2
//                 primaryTitle={item.woner}
//                 imageId={item.ownerImageId}
//                 imageURL={item.imageURL}
//                 imgWidth={"1.8em"}
//                 imgHeight={"1.8em"}
//               />
//             </span>
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "callId",
//       render: (name, item, i) => {
//         return (
//           <StyledPopconfirm
//             title={
//               <FormattedMessage
//                 id="app.doyouwanttodelete?"
//                 defaultMessage="Do you want to delete?"
//               />
//             }
//             onConfirm={() => deleteCall(item.callId, employeeId)}
//           >
//             <DeleteIcon
//               type="delete"
//               style={{ cursor: "pointer", color: "red", fontSize: "0.8rem" }}
//             />
//           </StyledPopconfirm>
//         );
//       },
//     },
//   ];

//   if (fetchingCallListRangeByUserIdError) {
//     return <APIFailed />;
//   }
//   const tab = document.querySelector(".ant-layout-sider-children");
//   const tableHeight = tab && tab.offsetHeight * 0.75;
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
//         <StyledTable
//           rowKey="callId"
//           columns={columns}
//           dataSource={callListRangeByUserId}
//           loading={
//             fetchingCallListRangeByUserId || fetchingCallListRangeByUserIdError
//           }
//           pagination={false}
//           expandedRowRender={(record) => {
//             return (
//               <>
//                 <p>{record.callDescription || ""}</p>
//               </>
//             );
//           }}
//           locale={{
//             emptyText: (
//               <Empty
//                 description={
//                   <NoDataComponent
//                     description="No calls "
//                     buttonText="Create call"
//                     onClick={() => props.handleCallModal(true)}
//                   />
//                 }
//               />
//             ),
//           }}
//         />
//       </InfiniteScroll>
//     </>
//   );
// }

// const mapStateToProps = ({ auth, call, employee }) => ({
//   userDetails: auth.userDetails,
//   fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
//   fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
//   callListRangeByUserId: call.callListRangeByUserId,
//   employees: employee.employees,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCallListRangeByUserId,
//       deleteCall,
//       handleCallModal,
//       setEditNote,
//       getNotesListByCallId,
//       getEmployeelist,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CallTable);

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



import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchOutlined } from "@ant-design/icons";
import { Tooltip, Button, Input, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { getEmployeelist } from "../../../Employees/EmployeeAction";
import {
  deleteCall,
  getCallListRangeByUserId,
  handleCallModal,
  setEditNote,
  getNotesListByCallId,
} from "../../CallAction";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import Highlighter from "react-highlight-words";
import { MultiAvatar2, } from "../../../../Components/UI/Elements";

function CallTable(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const {
      getCallListRangeByUserId,
      userDetails: { employeeId },
    } = props;
    getCallListRangeByUserId(employeeId, page);
    setPage(page + 1);
    props.getEmployeelist();
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
      const {
        getCallListRangeByUserId,
        userDetails: { employeeId },
      } = props;
      getCallListRangeByUserId(employeeId, page);
      setPage(page + 1);
      props.getEmployeelist();
    }, 100);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const {
    fetchingCallListRangeByUserId,
    fetchingCallListRangeByUserIdError,
    callListRangeByUserId,
    deleteCall,
    userDetails: { employeeId },
    setEditNote,
  } = props;
  const assignToTypeOption = props.employees.map((item) => {
    return {
      text: item.assignToName,
      value: item.assignToName,
    };
  });

  if (fetchingCallListRangeByUserIdError) {
    return <APIFailed />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
         <OnlyWrapCard>   
          {callListRangeByUserId.map((item) => (
            <div className="flex justify-between mt-4 max-sm:flex-col"
            style={{
                borderBottom: "3px dotted #515050"
            }}>
              <div class="flex  flex-col md:w-12 max-sm:flex-row justify-between w-full">
              <div >Type</div>
            <div> {item.callType}</div>
            </div>
            <div class="flex  flex-col md:w-40 max-sm:flex-row justify-between w-full">
              <p>Subject</p><p> {item.callPurpose}</p>
              </div>
              <div class="flex  flex-col md:w-16 max-sm:flex-row justify-between w-full">
              <p>Contact</p>
              <MultiAvatar2
                    primaryTitle={item.contactName}
                    // imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              
              {/* <p> {item.contactName}</p> */}
              </div>
              <div class="flex  flex-col md:w-48 max-sm:flex-row justify-between w-full">
              <p>Date</p><p> {moment(item.startDate).format("llll")}</p>
              </div>
              <div class="flex  flex-col md:w-16 max-sm:flex-row justify-between w-full">
              <p>Included</p>
              <div>
                {item.included &&
                  item.included.map((candidate, i) => {
                    const data1 = candidate.fullName.slice(0, 2).toUpperCase();
                    console.log("datas", data1);
                    return (
                      <Tooltip key={i} title={candidate.fullName}>
                        <Avatar
                          style={{
                            backgroundColor: "#f56a00",
                            fontFamily: "poppins",
                          }}
                        >
                          {data1}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
              </div>
              </div>
              {/* <div class="flex  flex-col w-16">
              <p>Team </p>
              <MultiAvatar2
                    primaryTitle={item.candidateName}
                    //imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
             
              </div> */}
             
              <div class="flex  flex-col md:w-16 max-sm:flex-row justify-between w-full">
              <p>Completed</p><p> {item.completionInd ? "Yes" : "No"}</p></div>
              {/* <div class="flex  flex-col w-16">
              <p>Rating</p><p> {item.rating > 0 ? item.rating : "Not Rated"}</p>
              </div> */}
              <div class="flex  flex-col md:w-24 max-sm:flex-row justify-between w-full">
              <p>Assigned To</p>
              <MultiAvatar2
                    primaryTitle={item.assignedTo}
                   // imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              {/* <p> {item.assignedTo || "Unassigned"}</p> */}
              </div>
              <div class="flex  flex-col md:w-16 max-sm:flex-row justify-between w-full mt-1">
              <p>Owner</p>
              <MultiAvatar2
                    primaryTitle={item.woner}
                    //imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              {/* <p> {item.woner || "Unknown"}</p> */}
              </div>
              <DeleteIcon  type="delete" style={{ cursor: "pointer",color:"red",fontSize:"1rem" }} 
                onClick={() => deleteCall(item.callId, employeeId)}
              />
              
            </div>
          ))}
        </OnlyWrapCard>
      </InfiniteScroll>
    </>
  );
}
const mapStateToProps = ({ auth, call, employee }) => ({
  userDetails: auth.userDetails,
  fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
  fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
  callListRangeByUserId: call.callListRangeByUserId,
  employees: employee.employees,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallListRangeByUserId,
      deleteCall,
      handleCallModal,
      setEditNote,
      getNotesListByCallId,
      getEmployeelist,
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(CallTable);

function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <div class=" flex justify-center items-center flex-col">
        <p>{description || "We couldn't find relevant data"}</p>
      </div>
    </div>
  );
}
