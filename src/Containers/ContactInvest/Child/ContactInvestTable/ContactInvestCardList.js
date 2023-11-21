import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link } from "../../../../Components/Common";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { StyledTable, } from "../../../../Components/UI/Antd";
import {  Tooltip, Select } from "antd";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
} from "../../../Contact/ContactAction";
import {
  getAllSalesList,
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../Components/Placeholder";
import {getContactInvestByUserId,
  handleContactInvestNotesDrawerModal,
  emptyContactInvest,handleUpdateContactInvestModal} from "../../ContactInvestAction";
import AddContactInvestNotesDrawerModal from "../AddContactInvestNotesDrawerModal";
const UpdateContactInvestModal = lazy(() =>
  import("../UpdateContactInvest/UpdateContactInvestModal")
);
const Option = Select;


function ContactInvestCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPage] = useState(0);
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getContactInvestByUserId(props.userId,pageNo,"creationdate");
    setPage(pageNo + 1);
    props.getAllSalesList();
    props.getRecruiterName();
  }, []);

  useEffect(()=>{
    return()=>props.emptyContactInvest();
  },[] );
  const [contactiData, setContactiData] = useState("");

  function handleCurrentContactIdata(dta) {
    setContactiData(dta);
  }

  const handleLoadMore = () => {
            setPage(pageNo + 1);
        props.getContactInvestByUserId(props.currentUser?props.currentUser:props.userId,pageNo);
  
  }
  const {
    user,
    fetchingContactsInvest,
    newFiltersdata,
    contactByUserId,
    filterData,
    handleUpdateContactModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactInvestModal,
    addDrawerContactInvestNotesModal,
    handleUpdateContactInvestModal,
    handleContactInvestNotesDrawerModal
  } = props;

//  if(fetchingContactsInvest){
//   return <BundleLoader/>
//  }

  return (
    <>
      

          <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
          <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]">Name</div>
        <div className=" md:w-40">Company</div>
        <div className=" md:w-28 ">Designation</div>
        <div className="md:w-36">Department</div>
        <div className="md:w-28"># Deals</div>
        <div className="md:w-28">Deal Value</div>
        <div className="md:w-20">Source</div>
        <div className="md:w-20">Owner</div>
        {/* <div className="w-12">Action</div> */}

      </div>
          <InfiniteScroll
        dataLength={contactByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContactsInvest?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
       
      {filterData.map((item) => { 
        
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${item.address &&
            item.address.length &&
            item.address[0].address1} 
           Street : ${item.address &&
            item.address.length &&
            item.address[0].street}   
          State : ${item.address && item.address.length && item.address[0].state}
          City : ${item.address && item.address.length && item.address[0].city}
         Country : ${(item.address &&
              item.address.length &&
              item.address[0].country) ||
            ""} 
           PostalCode : ${item.address &&
            item.address.length &&
            item.address[0].postalCode} `;
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-11 items-center p-3"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-56 max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full"> 
<div>
                                <SubTitle>
            <MultiAvatar2
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle></div>
          &nbsp;
          <div class="max-sm:w-full md:w-40">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                            {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class="text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`contactinvest/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link>&nbsp;&nbsp;
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
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className="  flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-48">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Company </div> */}
                                    <div class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-40 ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Designation</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-40">
                                  {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Department</div> */}
                                  <div class="text-[0.82rem] text-cardBody font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full  ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                     {item.oppNo}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full  ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Deal Value</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                     {item.totalProposalValue}
                                    </div>
                                </div>
                                <div className="flex font-medium max-sm:justify-between flex-col md:w-32 max-sm:flex-row w-full ">
                                    {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Source</div> */}

                                    <div class="text-[0.82rem] text-cardBody font-poppins">

                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className="flex font-medium  flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                   
              <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end mt-1">
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </SubTitle>
            </div>
          </Tooltip>

                   </div>
                                <div class="flex flex-col md: max-sm:flex-row w-full max-sm:justify-evenly items-center">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
               <PhoneInTalkIcon style={{fontSize:"0.8rem"}}/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
                <PhoneDisabledIcon/>
              </span>
            )}
          </Tooltip>
                        </div>
                        <div class=" max-sm:flex justify-end max-sm:w-full">
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon
              type="mail"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                props.getContactById(item.contactId);
                props.handleCurrentContactIdata(true);
              }}
            />
           </Tooltip>
                        </div>
                     
                        <div >
                        <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleCurrentContactIdata(item);
                props.handleContactDrawerModal(true);
              }}
            >{user.pulseAccessInd === true && (
              <MonitorHeartIcon style={{fontSize:"0.8rem" ,color: "#df9697"}}/>
            )}
            </span>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-[2%] max-sm:flex-row w-full max-sm:justify-evenly items-center">
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
          {/* <div><Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> </div> */}
            <div>
            {user.imInd === true  && user.investorContactUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  handleUpdateContactInvestModal(true);
                  handleCurrentContactIdata(item);
                  
                }}
              />
            </Tooltip>
            )}
            </div>
                      </div>  
                      <div class="w-[2%]"></div>
                      </div>  
                      <div class="flex flex-col justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleContactInvestNotesDrawerModal(true);
                  handleCurrentContactIdata(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>

            </div>
                            </div>
                        </div>


                    )
                })}
       </InfiniteScroll>
      </OnlyWrapCard>
     

      <UpdateContactInvestModal
        contactiData={contactiData}
        updateContactInvestModal={updateContactInvestModal}
        handleUpdateContactInvestModal={handleUpdateContactInvestModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />
      
      <AddContactInvestNotesDrawerModal
        contactiData={contactiData}
        addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
        handleContactInvestNotesDrawerModal={handleContactInvestNotesDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />
      {/* <AddContactEmailDrawerModal
        contactData={currentContactId}
        addDrawerContactEmailModal={props.addDrawerContactEmailModal}
        handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
      />
      <ReactContactSpeechModal
        contactData={currentContactId}
        handleContactReactSpeechModal={handleContactReactSpeechModal}
        addContactSpeechModal={addContactSpeechModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
      <AddContactDrawerModal
        item={currentContactId}
        addDrawerContactModal={props.addDrawerContactModal}
        handleContactDrawerModal={props.handleContactDrawerModal}
      /> */}
    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  designations,
  departments,
  opportunity,
  contactinvest
}) => ({
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  user: auth.userDetails,
  addDrawerContactInvestNotesModal:contactinvest.addDrawerContactInvestNotesModal,
  recruiterName: opportunity.recruiterName,
  fetchingContactsInvest: contactinvest.fetchingContactsInvest,
  fetchingContactsInvestError: contactinvest.fetchingContactsInvestError,
  updateContactInvestModal: contactinvest.updateContactInvestModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  contactiNVESTbyId: contactinvest.contactiNVESTbyId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateContactModal,
      handleDonotCallModal,
      setEditContact,
      getDesignations,
      updateOwnercontactById,
      getRecruiterName,
      getAllSalesList,
      handleContactReactSpeechModal,
      handleContactDrawerModal,
      getContactById,
      handleContactEmailDrawerModal,
      emptyContactInvest,
      getContactInvestByUserId,
      handleUpdateContactInvestModal,
      handleContactInvestNotesDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestCardList);
