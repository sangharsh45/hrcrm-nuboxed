import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import InfiniteScroll from "react-infinite-scroll-component"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PlaceIcon from '@mui/icons-material/Place';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Tooltip, Select,} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import DraftsIcon from '@mui/icons-material/Drafts';
import { MultiAvatar, MultiAvatar2,  } from "../../../Components/UI/Elements";
import {
    getIncludedOpportunityList,
    emptyIncludedOpportunity,
    getOpportunityIncludedCount
} from "../AuthAction";
const Option =Select;

function OppIncludedCardList(props) {
  const { item } = props;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
    //   props.getRecruiterList(props.recruiterId);     
    }else{
      props.getIncludedOpportunityList(props.userId,page);
      props.getOpportunityIncludedCount(props.userId)
      setPage(page + 1);
    }  
  }, []);
  useEffect(() => {
    return () => props.emptyIncludedOpportunity();
  }, []);

  const handleLoadMore = () => {
          setPage(page + 1);
          props.getIncludedOpportunityList(props.userId,page);   
};
  
  


  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [currentItem, setCurrentItem] = useState("");





  function handleSetCurrentOpportunityId(item) {
    setCurrentOpportunityId(item);
    // console.log("opp",item);
  }


  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

 
  const handleConfirm = (opportunityId) => {
    // Call the function to change the status to "Lost" here
    props.lostStatusRecruit(opportunityId, {
      lostInd: true
    });
  };
 

  const handleWon = (opportunityId) => {
    // Call the function to change the status to "Lost" here
    props.StatusRecruit(opportunityId, {
      wonInd:true
    });
  };




  const {
    user,
    opportunityIncluded,
    handleUpdateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    updateOpportunityModal,
    deleteOpportunityData,
    history,
    fetchingOpportunity
  } = props;
  
  // if (fetchingOpportunity) {
  //   return <BundleLoader />;
  // }

  return (
    <>
    

<InfiniteScroll
                dataLength={opportunityIncluded.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingOpportunity?<div style={{ textAlign: 'center' }}>Loading...</div> :null}
                height={"87vh"}
            >

<div class=" h-h86 overflow-auto overflow-x-auto">
             
             <div class="flex flex-wrap w-full justify-center max-sm:justify-between max-sm:flex-col max-sm:items-center"> 
                   
               {opportunityIncluded.map((item) => {
                 console.log("noOfDocPending",item.noOfDocPending)
       
                  return (
                   <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[10rem] 
                   text-[#444444] m-3 p-1 w-[20vw] flex flex-col  ">
                       <div class="w-[200] flex h-[200]">
                    <Tooltip 
                    title={item.country}
                    >
                  
                    </Tooltip>
                            <div class="flex flex-row max-sm:justify-start items-center" >     
                    <div >
                           <MultiAvatar2
 
                            primaryTitle={item.opportunityName}
                           
                             imgHeight={"1.8rem"}
                             imgWidth={"1.8rem"}
                             imgRadius={20}
                           />
                          </div>
                       
                       <div class="font-semibold ml-2 ">
                       {item.opportunityName}
                         {/* <Header>
                         <EmployeeDetailsView
    employeeId={item.employeeId}
    fullName=
           />       
                         </Header>  */}
                         </div>
                         </div> 
         
                          
                         </div>
                         
                         <div class=" flex flex-row justify-evenly  w-full items-end">
                        
                      
                       <div class=" font-normal text-xs text-cardBody font-poppins">{item.ownerName === null ? "Not Available" :item.ownerName}</div>
                       <div class=" font-normal text-xs text-cardBody font-poppins">{item.oppStage  === null ? "Not Available" :item.oppStage}</div>
           
                    
                       
                         <div >
                        
                       
           </div>
           
                       </div> 
                    
                        <div class=" font-normal text-xs text-cardBody font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.oppWorkflow}`}</div>
           <div class=" font-normal text-xs  mt-2 text-cardBody font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.contactName}</div>
           <div class=" font-normal text-xs mt-2 text-cardBody font-poppins ">Reports To:  {item.assignedTo}</div>
           <div class=" flex flex-row justify-evenly mt-[0.3rem] w-full items-end">
           <div class=" font-normal text-xs text-cardBody font-poppins ">
        
           <span
               style={{ cursor: "pointer" }}
             
             >
               
               {item.location}
          
      </span>
    
            </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
           <span
               style={{ cursor: "pointer" }}
             //   onClick={() => {
                 
             //      props.getEmployeeDocument(item.employeeId);
             //      props.getEmployeeTreeMap(item.employeeId);
             //     props.handleEmployeePulseDrawerModal(true);
             //     handleSetCurrentEmployeeId(item)
             //   }}
             >
               <MonitorHeartIcon  style={{ fontSize: "1rem", color: "#df9697" }}/>
      </span>
            </div>
            <div class=" font-normal text-xs text-cardBody font-poppins ">
           
           <span
               style={{ cursor: "pointer" }}
               onClick={() => {
                
                //  props.handleperformanceDrawerModal(true);
                //  handleSetCurrentCustomer(item);
                // handleRowData(item);
               }}
             >
                    {/* <Badge
                    style={{  fontSize:"0.75em",height:"18px" ,width:"5px"}}
                 count={item.noOfDocPending}
                 overflowCount={999}
               >  */}
               <InsertDriveFileIcon  style={{ fontSize: "1rem", }}/>
               {/* </Badge> */}
      </span>
            
            </div>
            <div class=" font-normal text-xs text-cardBody font-poppins ">
            <Tooltip 
                    title={`${item.workplace} , ${item.location}`}
                    >
           <span
               style={{ cursor: "pointer" }}
             
             >
               
               <PlaceIcon  style={{ fontSize: "1rem", }}/>
          
      </span>
      </Tooltip>
            </div>
            <div class=" font-normal text-xs text-cardBody font-poppins ">
            <Tooltip title="Notify">
            <CircleNotificationsIcon
            style={{ cursor: "pointer",fontSize: "1rem" }}
         //    onClick={() => {
         //     handleSetCurrentEmployeeId(item);
         //     props.handleNotifyDrawer(true);
         //    }}
            />
            </Tooltip>
             </div>
            <div class=" font-normal text-xs text-cardBody font-poppins ">
            {/* {user.userUpdateInd === true || user.role === "ADMIN"  ? ( */}
             <Tooltip title="Edit">
               <BorderColorIcon
                 style={{ cursor: "pointer",fontSize: "1rem" }}
                 // onClick={() => {
                 //     props.setEditEmployee(item);
                 //     handleStoredData(item);
                 //     props.handleUpdateEmployeeModal(true);
                 //     handleSetCurrentEmployeeId(item);
                   
                 // }}
               />
             </Tooltip>
             {/* ):null} */}
            </div>
            </div>
          
                      
                      
 
                     </div>
                  )  
             })}
               </div>
               </div>

      </InfiniteScroll>
      
  

    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  opportunityIncluded: auth.opportunityIncluded,
  oppIncludedCount:auth.oppIncludedCount,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getIncludedOpportunityList,
        emptyIncludedOpportunity,
        getOpportunityIncludedCount
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OppIncludedCardList);
