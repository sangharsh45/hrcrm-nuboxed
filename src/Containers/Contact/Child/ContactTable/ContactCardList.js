import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link } from "../../../../Components/Common";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip, Select } from "antd";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  getContactListByUserId,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
  handleContactNotesDrawerModal,
  emptyContact,
  handleContactPulseDrawerModal
} from "../../ContactAction";
import {
  getAllSalesList,
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddContactNotesDrawerModal from "../AddContactNotesDrawerModal";
import AddContactPulseDrawerModal from "./AddContactPulseDrawerModal";

const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
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
    props.getContactListByUserId(props.userId, page,"creationdate");
    setPage(page + 1);
    props.getAllSalesList();
    props.getRecruiterName();
  }, []);

  useEffect(()=>{
    return()=>props.emptyContact();
  },[] );
  const [currentContactId, setCurrentContactId] = useState("");
  const [currentContact, setCurrentContact] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }
  function handleSetCurrentContact(item) {
    setCurrentContact(item);
    console.log(item);
  }

  const handleLoadMore = () => {
            setPage(page + 1);
            props.getContactListByUserId(props.currentUser?props.currentUser:props.userId,page,
              props.filter?props.filter:"creationdate"
              );
  }

  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
    // console.log("Current2", item);
  }

 

  const {
    user,
    fetchingContacts,
    newFiltersdata,
    contactByUserId,
    filterData,
    addDrawerContactPulseModal,
    addDrawerContactNotesModal,
    handleUpdateContactModal,
    handleContactNotesDrawerModal,
    handleContactPulseDrawerModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
  } = props;

//  if(fetchingContacts){
//   return <BundleLoader/>
//  }

  return (
    <>
      
     
          <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]">Name</div>
        <div className=" md:w-40">Company</div>
        <div className=" md:w-28 ">Designation</div>
        <div className="md:w-36">Department</div>
        <div className="md:w-28"># Opportunity</div>
        <div className="md:w-28">Pipeline</div>
        <div className="md:w-20">Portal Acess</div>
        <div className="md:w-16">Owner</div>
        <div className="w-12"></div>

      </div>
          <InfiniteScroll
        dataLength={contactByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContacts?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
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
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     
                                <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full max-sm:justify-between  ">
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
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                            {/* <div class="text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`contact/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs"
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
                                <div class="flex">

                                <div className=" flex font-medium flex-col  md:w-48 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-xs font-poppins max-sm:hidden"> Company </div> */}
                                    <div class=" text-sm text-cardBody font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Designation</div> */}
                                    <div class="text-sm text-cardBody font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36  max-sm:flex-row w-full max-sm:justify-between">
                                  {/* <div class="text-xs text-cardBody font-poppins max-sm:hidden">Department</div> */}
                                  <div class="text-sm text-cardBody font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                              </div>
                              <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
  {/* <div className="text-xs text-cardBody font-poppins max-sm:hidden"># Opportunity</div> */}
  <div className="text-sm text-cardBody font-poppins text-center">
    {item.oppNo}
  </div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class="text-xs text-cardBody font-poppins max-sm:hidden">Portal Acess</div> */}

                                    <div class="text-sm text-cardBody font-poppins">

                                    {item.thirdPartyAccessInd 
    ? `${item.thirdPartyAccessInd}`
    : 'Not Provided'}

                                    </div>
                                </div>
                                <div class="flex md:items-center">
                                <div className="flex font-medium  md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <div class="text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                   
              <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end">
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
                   <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleContactNotesDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>
           </div>
           <div>
           <Tooltip title="Pulse">
       <MonitorHeartIcon
                onClick={() => {
                  handleContactPulseDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                style={{ fontSize: "0.8rem", color: "#df9697" }}
              />
           </Tooltip>

</div>
            </div>
                                <div class="flex flex-col  max-sm:flex-row w-[40%] max-sm:justify-evenly items-center">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer md:mt-4">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
               <PhoneInTalkIcon style={{fontSize:"0.8rem"}}/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
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
                props.handleContactEmailDrawerModal(true);
              }}
            />
           </Tooltip>
                        </div>

                      &nbsp;&nbsp;
                        <div>
                        <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSetCurrentContactId(item);
                props.handleContactPulseDrawerModal(true);
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
              {user.contactUpdateInd === true &&  user.crmInd === true && (
            <div>
           
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem", color: "grey", }}
                onClick={() => {
                  props.setEditContact(item);
                  handleUpdateContactModal(true);
                  handleSetCurrentContactId(item);
                  
                }}
              />
            </Tooltip>
      
            </div>
              )}
                      </div>    
                     <div class="w-[1%]"></div>
                      </div>
                            </div>
                        </div>


                    )
                })}
                      </InfiniteScroll>
      </OnlyWrapCard>


      <UpdateContactModal
        contactData={currentContactId}
        // fullName={currentContactId}
        updateContactModal={updateContactModal}
        handleUpdateContactModal={handleUpdateContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
       <AddContactNotesDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactNotesModal={addDrawerContactNotesModal}
        handleContactNotesDrawerModal={handleContactNotesDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
      />
         <AddContactPulseDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactPulseModal={addDrawerContactPulseModal}
        handleContactPulseDrawerModal={handleContactPulseDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
      />
      <AddContactEmailDrawerModal
        // item={currentContactId}
        contactData={currentContactId}
        addDrawerContactEmailModal={props.addDrawerContactEmailModal}
        handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
      />
      <ReactContactSpeechModal
        // item={currentContactId}
        contactData={currentContactId}
        handleContactReactSpeechModal={handleContactReactSpeechModal}
        addContactSpeechModal={addContactSpeechModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
      />
      {/* <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        contactId={currentContactId}
        handleDonotCallModal={props.handleDonotCallModal}
      /> */}
      <AddContactDrawerModal
        item={currentContactId}
        addDrawerContactModal={props.addDrawerContactModal}
        handleContactDrawerModal={props.handleContactDrawerModal}
      />
    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  designations,
  departments,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  user: auth.userDetails,
  addDrawerContactPulseModal:contact.addDrawerContactPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
  addDrawerContactNotesModal:contact.addDrawerContactNotesModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByUserId,
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
      handleContactNotesDrawerModal,
      handleContactPulseDrawerModal,
      handleContactEmailDrawerModal,
      emptyContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCardList);
