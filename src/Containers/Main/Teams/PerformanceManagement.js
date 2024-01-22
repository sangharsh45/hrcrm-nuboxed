import React, {  useEffect, useState,lazy } from "react";
import { MultiAvatar2, } from '../../../Components/UI/Elements'
import {  Tooltip, Badge } from 'antd'
import { connect } from 'react-redux'
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { bindActionCreators } from 'redux'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Select } from "antd";
import PlaceIcon from '@mui/icons-material/Place';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styled from 'styled-components'
import { BundleLoader } from "../../../Components/Placeholder";
import { getreportingManager,handleperformanceDrawerModal } from "./TeamsAction";
const HandleperformanceModal = lazy(() => import("./HandleperformanceModal"));


const { Option } = Select;
function PerformanceManagement (props) {
  const [storedData,setStoredData]=useState({});
  const [rowdata, setrowdata] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
const handleStoredData=(locs)=>{
  setStoredData(locs);
}
useEffect(() => {
  props.getreportingManager(props.reptMngrId);
 
}, []);
function handleChange(data) {
  props.Candidatesorttype(props.userId,data);
  
}

const [currentCandidateId, setCurrentCandidateId] = useState("");
function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    
    console.log(candidateId);
  } 
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");


function handleSetCurrentEmployeeId(employeeId,) {
  setCurrentEmployeeId(employeeId,);
 
}
  if (props.fetchingEmployee) {
    return <BundleLoader/>
  
    
;
  }
  const {
    fetchingEmployee,
    type,
    user,
    filteredData,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;

    return (
      
            <>
            
            <div class=" h-h86 overflow-auto overflow-x-auto">
             
              <CardWrapper>    
                  
              {props.reportingManger.map((item) => {
                console.log("noOfDocPending",item.noOfDocPending)
      
                 return (
                    <CardElement>
                      <CardImage>
                   <Tooltip 
                   title={item.country}
                   >
                 
                   </Tooltip>
                           <div class="flex flex-row max-sm:justify-start items-center" >     
                   <div >
                          <MultiAvatar2

                           primaryTitle={item.fullName}
                          
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                      
                      <div class="font-semibold ml-2 ">
                      {item.fullName}
                        {/* <Header>
                        <EmployeeDetailsView
   employeeId={item.employeeId}
   fullName=
          />       
                        </Header>  */}
                        </div>
                        </div> 
        
                         
                        </CardImage>
                        
                        <div class=" flex flex-row justify-evenly  w-full items-end">
                       
                     
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.roleType  === null ? "Not Available" :item.roleType}</div>
          
                   
                      
                        <div >
                       
                      
          </div>
          
                      </div> 
                   
                       <div class=" font-normal text-xs text-cardBody font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class=" font-normal text-xs  mt-2 text-cardBody font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.emailId}</div>
          <div class=" font-normal text-xs mt-2 text-cardBody font-poppins ">Reports To:  {item.reportingManagerName}</div>
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
               
                props.handleperformanceDrawerModal(true);
                handleSetCurrentCustomer(item);
               handleRowData(item);
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
         
                     
                     

                    </CardElement>
                 )  
            })}
              </CardWrapper>
              </div>
              <HandleperformanceModal
                 rowdata={rowdata}
         addDrawerPerformanceModal={props.addDrawerPerformanceModal}
         handleperformanceDrawerModal={props.handleperformanceDrawerModal}
         handleSetCurrentCustomer={handleSetCurrentCustomer}
      />

            </>
      
    
    )
              
}

const mapStateToProps = ({ auth,teams }) => ({
    reportingManger:teams.reportingManger,
    reptMngrId:auth.userDetails.userId,
    addDrawerPerformanceModal:teams.addDrawerPerformanceModal
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getreportingManager,
        handleperformanceDrawerModal   
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceManagement)

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.35rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 9.5rem;
    color: rgb(68,68,68);
    margin: 1rem;
    padding: 0.2rem;
    width: 19vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 22rem;
    
  }
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    flex-direction:column
  }
`
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const Desc = styled.p`
  height: 0px;
`
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
`

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;