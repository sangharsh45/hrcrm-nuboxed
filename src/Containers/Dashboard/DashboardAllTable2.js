import React, { useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Suspense } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Tooltip,Input,Button,Badge, } from "antd";
import Highlighter from 'react-highlight-words';
import moment from "moment";
import { StyledTable } from "../../Components/UI/Antd";
import SchoolIcon from '@mui/icons-material/School';
import {
  getAllDashboardTable2,
  handleAddJobDetailtModal
} from "../Dashboard/DashboardAction";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {getCandidateRequirement} from "../Opportunity/OpportunityAction"
import { SearchOutlined } from "@ant-design/icons";
const AddJobDetailModal=lazy(() => import("../Dashboard/Child/AddJobDetailModal"));

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}



function DashboardAllTable2(props) {
   useEffect(() => {
     if(props.role==="USER"&&props.user.department==="Recruiter"){
       props.getAllDashboardTable2(props.userId,"Recruiter");     
     }else{
       props.getAllDashboardTable2(props.userId,"Sales");
     }  
     }, []);
  // useEffect(() => {
  //   if((props.role==="ADMIN"||props.role==="USER")&& user.department==="Sales"){
  //     props.getOpportunityListByUserId(props.userId);
  //   }else
  //   if(props.role==="USER"&&user.department==="Recruiter"){
  //     props.getRecruiterList(props.recruiterId);

  //   }
    
  // }, []);
//   useEffect(() => {
//     if(props.role==="USER"&&user.department==="Recruiter"){
//       props.getRecruiterList(props.recruiterId);     
//     }else{
//       props.getOpportunityListByUserId(props.userId);
//     }      
//   }, []);

 

  
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [currentprocessName, setCurrentprocessName] = useState("");
 
 
   function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
 

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
            // ref={node => {
            //   this.searchInput = node;
            // }}
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
              //icon="search"
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
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString(): ""}
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
//   const {
//     fetchingOpportunity,
//     fetchingRecruiterList,
//     fetchingRecruiterListError,
//     user,
//     fetchingOpportunityError,
//     opportunityByUserId,
//     recruiterList,
//     handleUpdateOpportunityModal,
//     updateOpportunityModal,
//     deleteOpportunityData,
//      data,
//   } = props;
  // if (fetchingOpportunity) {
  //   return <BundleLoader />;
  // }
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      //title: "Currency",
      title: <FormattedMessage
        id="app.jobId"
        defaultMessage="Job ID"
      />,
     dataIndex: "jobOrder",
      width: "10%",
      ...getColumnSearchProps('jobOrder'),
      render: (name, item, i) => {
       return {
         props: {
         },
         children: (
           <>
             <Badge count={item.number} style={{ right: "1px" }}>
               <span   
                onClick={() => {
                  props.handleAddJobDetailtModal(true);
                  props.getCandidateRequirement(item.recruitmentId);
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                style={{
                  cursor: "pointer",
                  color: "#042E8A",
                }}          
               >

                 {`${item.jobOrder} `} &nbsp;


               </span>
             </Badge>
           </>
         ),
       };
      
     },
  
    },
    {
      title: <FormattedMessage
        id="app.role"
        defaultMessage="Role"
      />,
  
      dataIndex: "role",
       width: "10%",
    },
    {
     title: <FormattedMessage
       id="app.customer"
       defaultMessage="Customer"
     />,
     dataIndex: "customerName",
     ...getColumnSearchProps('customerName'),
      width: "12%",
   },
 
    {
       title: <FormattedMessage
         id="app.sponsor"
         defaultMessage="Sponsor"
       />,
 
       dataIndex: "sponserName",
       ...getColumnSearchProps('sponserName'),
        width: "7%",
     },
     {
      title: <FormattedMessage
      id="app.ageing"
      defaultMessage="Ageing"
    />,
      // title:"Ageing",
      width: "11%",
       // dataIndex: "sponserName",
       // ...getColumnSearchProps('sponserName'),
       render: (text, item) => {
        // const lastRequirementOn = moment(item.lastRequirementOn ).format("ll");
        const diff = Math.abs(moment().diff(moment(item.creationDate), 'days'));
        const date = diff + 1
        return <>
          {item.creationDate === null ? "No Data" :
            <span class=" cursor-pointer mr-[0.5rem] text-[12px] "
              style={{
                color: date >= 30 && "red",
              
              }}

            >
              {date} days ago
            </span>
          }
        </>
      },
        
     },
    // {
    //          field: "creationDate",
    //          title:"Ageing",
    //          width: "10%",
    //          editable: true,
    //         renderCell: (cellValues,row) => {
    //            console.log("cell",cellValues)
    //             const data=cellValues.row
    //             const diff = Math.abs(moment().diff(moment(data.creationDate), 'days'));
              
    //                    return (
    //                      <>
    //                 {data.creationDate === null ? "No Data" :
    //             <span
    //              style={{
    //                marginRight: "0.5rem",
    //                color: diff >=30 && "red",
    //                fontSize: "12px",
    //                cursor: "pointer",
    //              }}
    //              >
    //                {diff} days 
    //                </span>
    //          }
                   
    //                    </>
    //                  );
    //                },
    //        },
      
   {
     title: <FormattedMessage
       id="app.created"
       defaultMessage="Created"
     />,

     dataIndex: "creationDate",
     sorter: (a, b) => {
       var nameA = a.creationDate; // ignore upper and lowercase
       var nameB = b.creationDate; // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }

       return 0;
     },
      width: "10%",
      render: (text, item) => {
       const creationDate = moment(item.creationDate).format("ll");
       return <>
       {item.creationDate === null ? "No Data" :
         <span>
           {moment(item.creationDate).format("l")}
         </span>
       }
     </>
     },
   },
   {
     width: "4%",

render: (name, item, i) => {   
   console.log(item.offered);
 return {
   props: {
   
   },
   children: (
     <>
     <Tooltip title="Submitted">
     <Badge count={item.offered}  style={{ right: "1px" }}>
   <span class=" cursor-pointer text-[1.3em] text-black "
   >
       <UploadFileIcon
         style={{fontSize:"1.2rem"}}  />
     {/* <FontAwesomeIcon icon={solid('file-arrow-up')} /> */}
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }   
},
},
 {
   width: "4%",

render: (name, item, i) => {   
 console.log(item.rejected);
return {
 props: {
 
 },
 children: (
   <>
   <Tooltip title="Dropped">
   <Badge count={item.rejected}  style={{ right: "1px" }}>
 <span class=" cursor-pointer "
   style={{
     fontSize: "1.3em",
     color:"#e50b0b99"
   }}
 >
    <ArrowCircleDownIcon 
      style={{fontSize:"1.2rem"}}
    // icon={solid('circle-chevron-down')}
     />
  </span>
  </Badge>
  </Tooltip>
   </>
 )
} 
},
},
{
     title: <FormattedMessage
       id="app.progress"
       defaultMessage="Progress"
     />,
     dataIndex: "selectedCandidate",
     width: "15%",
     
     render: (name, item, i) => {        
       return (
         <div class=" flex justify-start mt-[0.42rem]" >
         {item.stageList&&item.stageList.map((data)=>{
           return(
             <>
              <div>
              <Tooltip
                   title={data.stageName}
               >
               <Badge count={data.candidateNo} style={{ right: "1px" }}>  
              
               <svg
               
                   width="20"
                   height="20"
                   xmlns="http://www.w3.org/2000/svg"
                 vertical-align="-webkit-baseline-middle" 
               >
                    <g>
                       <title>ram</title>
                       <rect
                           fill="#fff"
                           id="canvas_background"
                           height="19"    
                       width="23"
                       y="-1"
                       x="-1"
                       />
                       <g
                           display="none"
                           overflow="visible"
                           y="0"
                           x="0"
                           height="100%"
                           width="100%"
                           id="canvasGrid"
                       >
                           <rect
                               fill="url(#02D1A5)"
                               stroke-width="0"
                               y="0"
                               x="0"
                               height="100%"
                               width="100%"
                           />
                       </g>
                   </g>
                   <g>
                   <title>{item.candidateNo}</title>
                       <path
                           id="svg_1"
                           d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                           stroke-width="0.5"
                           stroke="#000"
                           // value={item.candidateNo}
                           fill="#3a855b"
                       />
                   </g>
               </svg>
               </Badge>
               </Tooltip>
           </div>
             </>
           )
         })}
         </div>
       );
       
     },
   },
   {
     width: "4%",
render: (name, item, i) => {   
   console.log(item.closedPosition);
 return {
   props: {
   
   },
   children: (
     <>
      <Tooltip title="Selected">
     <Badge count={item.closedPosition}  style={{ right: "1px" }}>
   <span class=" cursor-pointer "
     style={{
       fontSize: "1.2em",
       color:"#10bd10"
     }}
   >
       <SchoolIcon
       style={{fontSize:"1.2rem"}}
        />
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }
},
},
   {
     width: "4%",

render: (name, item, i) => {   
   console.log(item.onBoardNo);
 return {
   props: {
   
   },
   children: (
     <>
     <Tooltip title="OnBoarded">
     <Badge count={item.onBoardNo}  style={{ right: "1px" }}>
   <span class=" cursor-pointer "
     style={{
       fontSize: "1.2em",
       color:"#61a5bf"
     }}
   >
       <AccountBoxIcon 
         style={{fontSize:"1.2rem"}} />
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }
},
},
    
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.4;

 
  return (
    <>
      <StyledTable
        rowKey="opportunityId"
        columns={columns}
        dataSource={
         props.tableallDashboard2
        // [{Recruitment:"react",jobid:"1",sponsor:"anc",recruiter:"abc",candidate:"20",selectedCandidate:"5",listOfProgress:["21","25","3"]}]
        }
        loading={props.fetchingalldashboardTable2}
        onChange={onChange}
        scroll={{ y: tableHeight }}
        pagination={false}
      />

<Suspense fallback={"Loading"}>
        
        <AddJobDetailModal
        candidateRequirement={props.candidateRequirement}
        item={currentprocessName}
        addjobDetailModal={props.addjobDetailModal}
        handleAddJobDetailtModal={props.handleAddJobDetailtModal}
        
        />
     
    </Suspense>
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
   userId: auth.userDetails.userId,
  user: auth.userDetails,
  tableallDashboard2:dashboard.tableallDashboard2,
   role: auth.userDetails.role,
   addjobDetailModal:dashboard.addjobDetailModal,
   fetchingalldashboardTable2:dashboard.fetchingalldashboardTable2,
   recruiterId:auth.userDetails.userId,
   candidateRequirement:opportunity.candidateRequirement,
// tableDashboard2:dashboard.tableDashboard2
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    // getDashboardTable2,
    getAllDashboardTable2,
    handleAddJobDetailtModal,
    getCandidateRequirement
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAllTable2);





// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { Suspense } from "react";
// import { bindActionCreators } from "redux";
// import AddJobDetailModal from "../Dashboard/Child/AddJobDetailModal"
// import { FormattedMessage } from "react-intl";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { Tooltip, Icon,Input,Button,Badge, Table,  InputNumber, Popconfirm, Form, Typography  } from "antd";
// import Highlighter from 'react-highlight-words';
// import { CurrencySymbol } from "../../Components/Common";

// import { StyledTable, StyledPopconfirm } from "../../Components/UI/Antd";
// import { MultiAvatar, SubTitle } from "../../Components/UI/Elements";
// import { BundleLoader } from "../../Components/Placeholder";

// import {
//   // getDashboardTable2,
//   getAllDashboardTable2,
//   handleAddJobDetailtModal
 
// } from "../Dashboard/DashboardAction";
// import moment from "moment";
// import {getCandidateRequirement} from "../Opportunity/OpportunityAction"
// import APIFailed from "../../Helpers/ErrorBoundary/APIFailed";
// // import { dashboardReducer } from "../DashboardReducer";
// import { FlexContainer } from "../../Components/UI/Layout";
// import { SearchOutlined } from "@ant-design/icons";

// import Box from "@mui/material/Box";
// import { DataGrid, GridColDef,GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";

 



// function DashboardAllTable2(props) {
// // const RenderIcon = (props: GridRenderCellParams <Date>) => {
// //   return (
// //     <p
// //       style={{ cursor: "pointer", color: "blue" }}
// //       onClick={() => alert(props.row.jobOrder)}
// //     >
// //       <Button>Delete</Button>
// //     </p>
// //   );
// // }
//   useEffect(() => {
//     if(props.role==="USER"&&props.user.department==="Recruiter"){
//       props.getAllDashboardTable2(props.userId,"Recruiter");     
//     }else{
//       props.getAllDashboardTable2(props.userId,"Sales");
//     }  
//     }, []);
//   const [codeItem, setCodeItem] = React.useState([]);

//     const [currentprocessName, setCurrentprocessName] = useState("");
 
 
//    function handleSetCurrentProcessName(data) {
//     setCurrentprocessName(data);
//      console.log(data);
//    }


//   const columns= [
//    // { field: "id", headerName: "ID", width: "2%" },
//     {
//       field: "jobOrder",
//       headerName: "Job ID",
//       width: 90,
//       //  renderCell: RenderIcon
//       // //editable: true

//        renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
                   
//                      <Badge count={data.number} style={{ right: "1px" }}>
//               <span   
//                 onClick={() => {
//                   props.handleAddJobDetailtModal(true);
//                   props.getCandidateRequirement(cellValues.row.recruitmentId);
//                   handleSetCurrentProcessName(data)
//                   // this.props.setCurrentOpportunityRecruitMentData(item);
//                 }}
//                 style={{
//                   cursor: "pointer",
//                   color: "#042E8A",
//                 }}          
//                >

//                  {`${data.jobOrder} `} &nbsp;


//                </span>
//              </Badge>
//                   </>
//                 );
//               },
//     },
//     {
//       field: "customerName",
//       headerName: "Customer",
//       width: 100,
//       //editable: true
//     },
  
//     {
//       field: "sponserName",
//       headerName: "Sponsor",
//       width: 90,
//       //editable: true
//     },

//     {
//       //field: "creationDate",
//       headerName: "Ageing",
//       width: 60,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          const diff = Math.abs(moment().diff(moment(data.creationDate), 'days'));
        
//                 return (
//                   <>
//              {data.creationDate === null ? "No Data" :
//           <span
//           style={{
//             marginRight: "0.5rem",
//             color: diff >=30 && "red",
//             fontSize: "12px",
//             cursor: "pointer",
//           }}
  
//           >
//             {diff} days 
//             </span>
//         }
             
//                   </>
//                 );
//               },
//     },

//     {
//       field: "creationDate",
//       headerName: "Created",
//       width: 80,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
//                     {data.creationDate === null ? "No Data" :
//          <span>
//            {moment(data.creationDate).format("l")}
//          </span>
//        }
             
//                   </>
//                 );
//               },
//     },

//     {
//       field: "Submitted",
//       headerName: "",
//      width: 5,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
       
//        <Tooltip title="Submitted">
//      <Badge count={data.offered}  style={{ right: "1px" }}>
//    <span
//      style={{
//        cursor: "pointer",
//        fontSize: "1.3em",
//        color:"black"
//      }}
//    >
//      <FontAwesomeIcon icon={solid('file-arrow-up')} />
//     </span>
//     </Badge>
//     </Tooltip>
//                   </>
//                 );
//               },
//     },

//     {
//       field: "rejected",
//       headerName: " ",
//       width: 5,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
//         <Tooltip title="Dropped">
//    <Badge count={data.rejected}  style={{ right: "1px" }}>
//  <span
//    style={{
//      cursor: "pointer",
//      fontSize: "1.3em",
//      color:"#e50b0b99"
//    }}
//  >
//     <FontAwesomeIcon icon={solid('circle-chevron-down')} />
//   </span>
//   </Badge>
//   </Tooltip>
     
//                   </>
//                 );
//               },


//     },


//     {
//       field: "selectedCandidate",
//       headerName: "Progress",
//       width: 90,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
//    <FlexContainer justifyContent="start" marginTop= "0.42rem">
//          {data.stageList&&data.stageList.map((test)=>{
//            return(
//              <>
//               <div>
//               <Tooltip
//                    title={test.stageName}
//                >
//                <Badge count={test.candidateNo} style={{ right: "1px" }}>  
              
//                <svg
               
//                    width="20"
//                    height="20"
//                    xmlns="http://www.w3.org/2000/svg"
//                  vertical-align="-webkit-baseline-middle" 
//                >
//                     <g>
//                        <title>ram</title>
//                        <rect
//                            fill="#fff"
//                            id="canvas_background"
//                            height="19"    
//                        width="23"
//                        y="-1"
//                        x="-1"
//                        />
//                        <g
//                            display="none"
//                            overflow="visible"
//                            y="0"
//                            x="0"
//                            height="100%"
//                            width="100%"
//                            id="canvasGrid"
//                        >
//                            <rect
//                                fill="url(#02D1A5)"
//                                stroke-width="0"
//                                y="0"
//                                x="0"
//                                height="100%"
//                                width="100%"
//                            />
//                        </g>
//                    </g>
//                    <g>
//                    <title>{data.candidateNo}</title>
//                        <path
//                            id="svg_1"
//                            d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
//                            stroke-width="0.5"
//                            stroke="#000"
//                            // value={item.candidateNo}
//                            fill="#3a855b"
//                        />
//                    </g>
//                </svg>
//                </Badge>
//                </Tooltip>
//            </div>
//              </>
//            )
//          })}
//          </FlexContainer>
     
//                   </>
//                 );
//               },
//     },


//     {
//       field: "Selected",
//       headerName: "",
//      width: 5,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
//      <Tooltip title="Selected">
//      <Badge count={data.closedPosition}  style={{ right: "1px" }}>
//    <span
//      style={{
//        cursor: "pointer",
//        fontSize: "1.2em",
//        color:"#10bd10"
//      }}
//    >
//       <FontAwesomeIcon icon={solid('graduation-cap')} />
//     </span>
//     </Badge>
//     </Tooltip>
     
//                   </>
//                 );
//               },
//     },


//     {
//       field: "OnBoarded",
//       headerName: "",
//       width: 5,
//       //editable: true
//       renderCell: (cellValues,row) => {
//         console.log("cell",cellValues)
//          const data=cellValues.row
//          console.log("Shell",data)
//                 return (
//                   <>
//       <Tooltip title="OnBoarded">
//      <Badge count={data.onBoardNo}  style={{ right: "1px" }}>
//    <span
//      style={{
//        cursor: "pointer",
//        fontSize: "1.2em",
//        color:"#61a5bf"
//      }}
//    >
//       <FontAwesomeIcon icon={solid('id-card-clip')} />
//     </span>
//     </Badge>
//     </Tooltip>
     
//                   </>
//                 );
//               },
//     },

 
//   ];
//   return (
// <>
   
//     <Box sx={{ height: 400, width: "100%" }}>
//       <DataGrid
//       getRowId={(row) => row.recruitmentId}
//         rows={ props.tableallDashboard2}
//         columns={columns}
//         loading={props.fetchingalldashboardTable2}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         disableSelectionOnClick
//         experimentalFeatures={{ newEditingApi: true }}
//         components={{Toolbar:GridToolbar}}
//       />
//     </Box>
//     <Suspense fallback={"Loading"}>
        
//         <AddJobDetailModal
//         candidateRequirement={props.candidateRequirement}
//         data={currentprocessName}
//         addjobDetailModal={props.addjobDetailModal}
//         handleAddJobDetailtModal={props.handleAddJobDetailtModal}
        
//         />
     
//     </Suspense>
//     </>
//   );
  
// }

// const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
//   userId: auth.userDetails.userId,
//  user: auth.userDetails,
//  tableallDashboard2:dashboard.tableallDashboard2,
//   role: auth.userDetails.role,
//   addjobDetailModal:dashboard.addjobDetailModal,
//   fetchingalldashboardTable2:dashboard.fetchingalldashboardTable2,
//   recruiterId:auth.userDetails.userId,
//   candidateRequirement:opportunity.candidateRequirement,
// // tableDashboard2:dashboard.tableDashboard2
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//     // getDashboardTable2,
//     getAllDashboardTable2,
//     handleAddJobDetailtModal,
//     getCandidateRequirement
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(DashboardAllTable2);











