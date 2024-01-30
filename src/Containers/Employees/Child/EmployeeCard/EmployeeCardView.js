import React, {  useEffect, useState, } from "react";
import { MultiAvatar2, } from '../../../../Components/UI/Elements'
import {  Tooltip, Badge } from 'antd'
import { connect } from 'react-redux'
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { bindActionCreators } from 'redux'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Select } from "antd";
import BadgeIcon from '@mui/icons-material/Badge';
import PlaceIcon from '@mui/icons-material/Place';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styled from 'styled-components'
import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getEmployeelist,
    setEditEmployee,
    handleEmployeeDrawerForAdmin,
    handleEmployeePulseDrawerModal,
    getEmployeeTreeMap,
    handleEmployeeDocumentDrawerModal,
    getEmployeeDocument,
    handleUpdateEmployeeModal,
    handleOnboardingEmployeeModal,
    handleNotifyDrawer
  } from "../../EmployeeAction";
import EmployeeDetailsView from "../EmployeeGroup/EmployeeDetails/EmployeeDetailsView";
import EmployeeDrawerForAdmin from "../EmployeeTable/EmployeeDrawer/EmployeeDrawerForAdmin";
import EmployeePulseDrawerModal from "../EmployeeTable/EmployeePulseDrawerModal";
import EmployeeDocumentDrawerModal from "./EmployeeDocumentDrawerModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import OpenNotifyDrawer from "./OpenNotifyDrawer";
import StepperEmployeeModal from "./StepperEmployeeModal";


const { Option } = Select;
function EmployeeCardView (props) {
  const [page, setPage] = useState(0);
  const [storedData,setStoredData]=useState({});
const handleStoredData=(locs)=>{
  setStoredData(locs);
}
useEffect(() => {
  props.getEmployeelist("cretiondate");
 
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
              {props.filteredData.map((item) => {
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
                            // imageId={item.imageId ? item.imageId : ''}
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                      {/* <CardDescription> */}
                      <div class="font-semibold ">
                        <Header>
                        <EmployeeDetailsView
   employeeId={item.employeeId}
   fullName={item.fullName}
          />       
                        </Header> 
                        </div>
                        </div> 
        
                         
                        </CardImage>
                        
                        <div class=" flex flex-row justify-evenly  w-full items-end">
                       
                        {/* <div class=" text-sm text-cardBody font-medium font-poppins">Department   </div> */}
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.roleType  === null ? "Not Available" :item.roleType}</div>
          
                   
                      
                        <div >
                        {/* <div class=" text-sm text-cardBody font-medium font-poppins">Role   </div> */}
                      
          </div>
          
                      </div> 
                   
                       <div class=" font-normal text-xs text-cardBody font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class=" font-normal text-xs  mt-2 text-cardBody font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.emailId}</div>
          <div class=" font-normal text-xs mt-2 text-cardBody font-poppins ">Reports To:    <span>
          {item.reportingManagerName 
                        ? `${item.reportingManagerName}`
                        : "Not Assigned"}
                      </span>
         </div>
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
              onClick={() => {
                // props.getCandidateById(item.candidateId);
                 props.getEmployeeDocument(item.employeeId);
                 props.getEmployeeTreeMap(item.employeeId);
                props.handleEmployeePulseDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
              <MonitorHeartIcon  style={{ fontSize: "1rem", color: "#df9697" }}/>
     </span>
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
            {/* {user.userAccessPlusInd === true ?( */}
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
               
                props.handleEmployeeDocumentDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
                   <Badge
                   style={{  fontSize:"0.75em",height:"18px" ,width:"5px"}}
                count={item.noOfDocPending}
                overflowCount={999}
              > 
              <InsertDriveFileIcon  style={{ fontSize: "1rem", }}/>
              </Badge>
     </span>
            {/* ):null} */}
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
           onClick={() => {
            handleSetCurrentEmployeeId(item);
            props.handleNotifyDrawer(true);
           }}
           />
           </Tooltip>
            </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
           {user.userUpdateInd === true || user.role === "ADMIN"  ? (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                    props.setEditEmployee(item);
                    handleStoredData(item);
                    props.handleUpdateEmployeeModal(true);
                    handleSetCurrentEmployeeId(item);
                  
                }}
              />
            </Tooltip>
            ):null}
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
            <Tooltip title="Onboarding">
              <BadgeIcon
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                    // props.setEditEmployee(item);
                    // handleStoredData(item);
                    props.handleOnboardingEmployeeModal(true);
                    handleSetCurrentEmployeeId(item);
                  
                }}
              />
            </Tooltip>
           </div>
           </div>
         
                     
                      {/* <div class=" flex flex-row justify-around w-full items-end">
              
                     <span>
                        <Tooltip  title={`${item.countryDialCode} ${item.mobileNo}`}>
                        <VolumeUpIcon  style={{fontSize:"0.8rem",color:"#24d8a7"}}  />
                        </Tooltip> 
                        </span>
                        <span>
                        <Tooltip  title={item.emailId}>
                   <DraftsIcon 
                   style={{fontSize:"0.8rem",color:"#24d8a7"}}
                  // icon={regular("envelope")}  
                  />
          </Tooltip> 
          </span>
        
            <span
              style={{
                cursor: "pointer",
                
              }}
            >
                {item.suspendInd !== true && ( 
                    
                    <CellTowerIcon
                         // size={"small"}
                         // type="ghost"
                         // style={{            
                         //   borderColor: "transparent",
                         //   alignSelf: "flex-end",
                         // }}
                         style={{ 
                             color: item.role === "ADMIN" ?"blue":  "green",
                             fontSize: "123%"
                             }}
                         onClick={() => {
                             handleEmployeeDrawerForAdmin(true);
                             handleSetCurrentEmployeeId(item.employeeId)
                           }}
                        
                     
                       />
                       )}  
            </span>
       
         
       
                        </div>  */}

                    </CardElement>
                 )  
            })}
              </CardWrapper>
              </div>
              <UpdateEmployeeModal
                storedData={storedData}
               singleEmployee={props.singleEmployee}
       employeeName={currentEmployeeId}
        updateEmployeeModal={props.updateEmployeeModal}
        handleUpdateEmployeeModal={props.handleUpdateEmployeeModal}
        handleSetCurrentEmployeeId={props.handleSetCurrentEmployeeId}
      />
               <StepperEmployeeModal
               currentEmployeeId={currentEmployeeId}
              //   storedData={storedData}
              //  singleEmployee={props.singleEmployee}
              //  employeeName={currentEmployeeId}
       onboardingEmployeeModal={props.onboardingEmployeeModal}
        handleOnboardingEmployeeModal={props.handleOnboardingEmployeeModal}
        // handleSetCurrentEmployeeId={props.handleSetCurrentEmployeeId}
      />
              <EmployeeDrawerForAdmin
      employeeId={currentEmployeeId}
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
            <EmployeePulseDrawerModal
         singleEmployee={props.singleEmployee}
         employeeTreeMap={props.employeeTreeMap}
        //  currentData={rowData}
        employeeName={currentEmployeeId}
        documentsByEmployeeId={props.documentsByEmployeeId}
        addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
        handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
        // candidateByUserId={this.props.candidateByUserId}
      />
               <EmployeeDocumentDrawerModal
         singleEmployee={props.singleEmployee}
        employeeName={currentEmployeeId}
        addDrawerEmployeeDocumentModal={props.addDrawerEmployeeDocumentModal}
        handleEmployeeDocumentDrawerModal={props.handleEmployeeDocumentDrawerModal}
      />
      <OpenNotifyDrawer
      currentEmployeeId={currentEmployeeId}
       openNotifydrwr={props.openNotifydrwr} handleNotifyDrawer={props.handleNotifyDrawer}/>

            </>
      
    
    )
              
}

const mapStateToProps = ({ auth,role, employee,designations,departments }) => ({
    userId: auth.userDetails.userId,
    updateEmployeeModal:employee.updateEmployeeModal,
    onboardingEmployeeModal:employee.onboardingEmployeeModal,
    employees: employee.employees,
    user: auth.userDetails,
    roles: role.roles,
    organizationId: auth.userDetails.organizationId,
    fetchingEmployee: employee.fetchingEmployee,
    designations: designations.designations,
    departments:departments.departments,
    employeeTreeMap:employee.employeeTreeMap,
    documentsByEmployeeId: employee.documentsByEmployeeId,
    addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
    addDrawerEmployeeDocumentModal:employee.addDrawerEmployeeDocumentModal,
    fetchingEmployeeError: employee.fetchingEmployeeError,
    employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
    openNotifydrwr:employee.openNotifydrwr,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeelist,
        setEditEmployee,
        handleEmployeeDrawerForAdmin,
        handleEmployeePulseDrawerModal,
        handleEmployeeDocumentDrawerModal,
        handleUpdateEmployeeModal,
        handleOnboardingEmployeeModal,
        getEmployeeTreeMap,
        getEmployeeDocument,
        handleNotifyDrawer
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCardView)

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