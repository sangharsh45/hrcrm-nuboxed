import React, { useEffect, useState, useMemo } from "react";
import { StyledPopconfirm, StyledTable } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Highlighter from "react-highlight-words";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCountries } from "../../../Auth/AuthAction";
import { Link } from "../../../../Components/Common";
import {
  getJunkedLeads,
  deleteLeadsData,
  setEditLeads,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  reInstateJunkLeads
} from "../../../Leads/LeadsAction";
import ReactCountryFlag from 'react-country-flag';
import { MailOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Input } from "antd";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import LeadsDetailView from "./LeadsDetailView";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";

const ButtonGroup = Button.Group;

const LeadsJunkList = (props) => {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    props.getJunkedLeads(props.userId);
    props.getSectors();
    props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingJunkedLeads,junkedLeadsData  } = props;

  // if (fetchingJunkedLeads) {
  //   return <BundleLoader />;
  // }
  const handleLoadMore = () => {
      setPage(page + 1);
      props.getJunkedLeads(props.userId);
};
  return (
    <>
 <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
 <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[9.1rem]">Name</div>
        <div className=" md:w-[5.1rem]"></div>
        <div className=" md:w-[4.2rem] ">Phone #</div>
        <div className="md:w-[5.8rem]">Country</div>
        <div className="md:w-[8.5rem]">Company</div>
        <div className="md:w-[3.8rem]">Sector</div> 
        <div className="md:w-[5.2rem]">Assigned to</div>
        <div className="md:w-[1.5rem]">Owner</div>
        <div className="md:w-[3.3rem]">Reinstate</div>
        <div className="w-12">Action</div>

      </div>
      <InfiniteScroll
        dataLength={junkedLeadsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingJunkedLeads?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      {junkedLeadsData.map((item) => { 
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
                      <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
                              <div class="flex"> 
                          <div className=" flex font-medium flex-col w-[13rem]   max-sm:w-full">
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
                                     
                                      <h4 class="text-[0.82rem] text-cardBody font-semibold  font-poppins cursor-pointer">
                                      {item.name}
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
</div>  
</div>
<div class="flex"> 
                          <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                     <h4 class=" text-[0.82rem] text-cardBody font-poppins">  
                     {item.countryDialCode && item.phoneNumber ? (
`${item.countryDialCode} ${item.phoneNumber}`
) : (
"Not Available"
)} 
                    
                     </h4>
                 </div>
                 <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
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
                 <div className=" flex font-medium flex-col justify-center  md:w-40 max-sm:flex-row w-full max-sm:justify-between ">
                     <h4 class=" text-[0.82rem] text-cardBody font-semibold  font-poppins">   
                     <Link to={`leads/${item.leadsId}`} title={item.companyName || "Not Available"}>
{item.companyName || "Not Available"}
</Link>

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
            <a href={`https://www.${item.url}`} target="_blank">
              <OpenInBrowserIcon
                style={{ cursor: "pointer", color: "green" ,fontSize: "0.8rem",}}
              />
            </a>
          </span>
        </Tooltip>
      ) : null}
                  </div>
                 
                          <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between ">
                              <h4 class=" text-[0.82rem] text-cardBody font-poppins">   
                              {item.sector}
                              </h4>
                          </div>
                          </div>
                          <div class="flex mb-1"> 
                          <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

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
                          <div className=" flex font-medium flex-col justify-center md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                 
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
             <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                              <div class=" text-[0.75rem] text-cardBody font-poppins">

                              </div>
                              <div>
<Button type="primary"
onClick={()=>{props.reInstateJunkLeads(item.leadsId)}}
>
Resinstate
</Button>
</div>
                          </div>
                         
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
      <DeleteIcon
        type="delete"
        style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem",}}
      />
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
                    )
                })}
                </InfiniteScroll>
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
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  junkedLeadsData: leads.junkedLeadsData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingJunkedLeads:leads.fetchingJunkedLeads
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJunkedLeads,
      getSectors,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      getCountries,
      updateTypeForLead,
      reInstateJunkLeads
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsJunkList);
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
        <i className={`${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}