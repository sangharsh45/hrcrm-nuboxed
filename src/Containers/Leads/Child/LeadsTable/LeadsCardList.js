import React, { useEffect, useState} from "react";
import { StyledPopconfirm} from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from "@mui/icons-material/Delete";
import { getCountries } from "../../../Auth/AuthAction";
import { Link } from "../../../../Components/Common";
import {
  getLeads,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
} from "../../../Leads/LeadsAction";
import ReactCountryFlag from 'react-country-flag';
import AddchartIcon from '@mui/icons-material/Addchart';   
import { Button, Tooltip } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import OpenCETmodal from "./OpenCETmodal";
import AddLeadsNotesDrawerModal from "../AddLeadsNotesDrawerModal";

const ButtonGroup = Button.Group;

const LeadsCardList = (props) => {

  useEffect(() => {
    props.getLeads(props.userId);
    props.getSectors();
    props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { deleteLeadsData, handleUpdateLeadsModal,handleLeadsNotesDrawerModal, updateLeadsModal,fetchingLeads,leadsAllData  } = props;

  if (fetchingLeads) {
    return <BundleLoader />;
  }

  return (
    <>
   <OnlyWrapCard>
      {leadsAllData.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
       
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex justify-between mt-1 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                    <div class="flex"> 
                                <div className=" flex font-medium flex-col w-[13rem] mb-4  max-sm:w-full">
                                <div className="flex max-sm:w-full"> 
<div>
<SubTitle>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
</div>
                                   <div class="w-[4%]">

                                   </div>

                                        <div class="max-sm:w-full" >
                                        <Tooltip>
                                          <div class="max-sm:w-full justify-between flex md:flex-col">
                                            <h4 class=" text-[0.875rem] text-cardBody  font-poppins max-sm:hidden">
                                            Name
                                            </h4>
                                            <h4 class="text-[0.82rem] text-cardBody font-semibold  font-poppins cursor-pointer">
                                            {item.name}
                                            {/* <span>
              {item.name === null ? (
                "None"
              ) : (
           `${item.name}`
              )}
            </span>                   */}
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
         {/* <Link
           toUrl={`leads/${item.leadsId}`}
          title={`${item.name}`}
        >{item.name}</Link>&nbsp;&nbsp;
         */}
       
                                            </h4>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div class="flex flex-row items-center md:w-[11%] max-sm:flex-row w-full max-sm:justify-between">

<div>
<ButtonGroup>
<RoleButton
 type="Warm"
 iconType="	fas fa-burn"
 // tooltip="Warm"
 tooltip={<FormattedMessage
   id="app.warm"
   defaultMessage="Warm"
 />}
 role={item.type}
 onClick={() =>{
 const typ="Warm"
   props.updateTypeForLead(item.leadsId,typ)
 }}
/>
</ButtonGroup>
</div>    


     <div>
     <ButtonGroup>
<RoleButton
 type="Hot"
 iconType="fas fa-mug-hot"
 // tooltip="Hot"
 tooltip={<FormattedMessage
   id="app.hot"
   defaultMessage="Hot"
 />}
 role={item.type}
 onClick={() =>{
  const typ="Hot"
   props.updateTypeForLead(item.leadsId,typ)
 }}
/>
</ButtonGroup>
</div>
     <div>
<ButtonGroup>
<RoleButton
 type="Cold"
 iconType="far fa-snowflake"
 // tooltip="Cold"
 tooltip={<FormattedMessage
   id="app.cold"
   defaultMessage="Cold"
 />}
 role={item.type}
 onClick={() => {
  const typ="Cold"
   props.updateTypeForLead(item.leadsId,typ)
 }}
/>
</ButtonGroup>
</div>
<div>
<Tooltip
        title={
          <FormattedMessage id="app.activity" defaultMessage="Activity" />
        }
      >
<AddchartIcon

style={{fontSize: "1rem",cursor: 'pointer',}}
onClick={()=>{
  props.handleCETmodal(true)
  handleRowData(item)
  }}
/>
</Tooltip>
</div>
     </div>  
</div>
<div class="flex"> 
                                <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                           <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Phone # </h4>
                           <h4 class=" text-[0.82rem] text-cardBody font-poppins">  
                           {item.countryDialCode && item.phoneNumber ? (
    `${item.countryDialCode} ${item.phoneNumber}`
  ) : (
    "Not Available"
  )} 
                           {/* {`${item.countryDialCode} ${item.phoneNumber}`} */}
                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</h4>
                                  <h4 class=" text-[0.82rem] text-cardBody font-poppins">
                                  <ReactCountryFlag
                        countryCode={item.countryAlpha2Code}
                        svg
                        style={{
                          width: '1em',
                          height: '1em',
                        }}
                        title={item.country}
                      />
                      &nbsp;
                      {item.address && item.address.length && item.address[0].country}
                                  </h4>
                              </div>
                     
                       </div>
                       <div class="flex"> 
                       <div className=" flex font-medium flex-col  md:w-40 max-sm:flex-row w-full max-sm:justify-between ">
                           <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Company </h4>
                           <h4 class=" text-[0.82rem] text-cardBody font-semibold  font-poppins">   

  {item.companyName || "Not Available"}


                           </h4>
                       </div>
                       <div class="rounded-full bg-white  h-5 cursor-pointer w-8">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <OpenInBrowserIcon
                      style={{ cursor: "pointer", color: "green" ,fontSize: "0.8rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>
                       
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Sector </h4>
                                    <h4 class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                                </div>
                                <div class="flex mb-1"> 
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned to</h4>

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                       
                       <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</h4>

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
                   </div>
                   <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Qualified</h4>

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                {/* qual */}
                                    </div>
                                    <div>
<StatusCustomerToggle
            type={props.convertInd ? "primary" : "danger"}
            leadsId={item.leadsId}
            convertInd={item.convertInd}
          />
</div>
                                </div>
                                <div class="flex flex-col justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleLeadsNotesDrawerModal(true);
                  handleRowData(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>

            </div>
                                {/* <div class="flex max-sm:flex-row w-full justify-between md:flex-col"> */}
                                <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                                <div>
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                   props.setEditLeads(item);
                handleUpdateLeadsModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>
        
            </div>
                        <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteLeadsData(item.leadsId)}
          >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem",}}
            />
            {/* )} */}
          </StyledPopconfirm>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
          </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize:"0.8rem"  }}
                onClick={() => {
                  handleSetCurrentLeadsId(item);
                  props.handleLeadsEmailDrawerModal(true);
                }}
              />
            </Tooltip> </div>
           
                      </div>  
                      <div class="w-[2%]"></div> 
                      </div>  
                      </div>
                            </div>
                        // </div>


                    )
                })}
      </OnlyWrapCard>
      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
      <OpenCETmodal 
       rowdata={rowdata}
      openCETmodal={props.openCETmodal}
      handleCETmodal={props.handleCETmodal}
      />
         <AddLeadsNotesDrawerModal 
       rowdata={rowdata}
       addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
      handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
      />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingLeads:leads.fetchingLeads,
  openCETmodal:leads.openCETmodal,
  addDrawerLeadsNotesModal:leads.addDrawerLeadsNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeads,
      getSectors,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      getCountries,
      updateTypeForLead,
      handleCETmodal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsCardList);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i>
      </Button>
    </Tooltip>
  );
}