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
  getContactListByUserId,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
  emptyContact
} from "../../ContactAction";
import {
  getAllSalesList,
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ContactDetailView from "./ContactDetailView";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../Components/Placeholder";

const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactCardList(props) {
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
    props.getContactListByUserId(props.userId,page);
    setPage(page + 1);
    props.getAllSalesList();
    props.getRecruiterName();
  }, []);

  useEffect(()=>{
    return()=>props.emptyContact();
  },[] );
  const [currentContactId, setCurrentContactId] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
            setPage(page + 1);
            props.getContactListByUserId(props.currentUser?props.currentUser:props.userId,page);
    }, 100);
  
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
    handleUpdateContactModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
  } = props;

 if(fetchingContacts){
  return <BundleLoader/>
 }

  return (
    <>
      
      <InfiniteScroll
        dataLength={contactByUserId.length}
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
                            <div className="flex justify-between mt-4 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full justify-between  ">
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
                                            <div class="text-[0.875rem] text-cardBody font-poppins">
                                            Name
                                            </div>
                                            <div class="text-[0.75rem] text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
         <Link
          toUrl={`contact/${item.contactId}`}
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

                                <div className=" flex font-medium flex-col  md:w-52 max-sm:flex-row w-full justify-between ">
                                    <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins"> Company </div>
                                    <div class=" text-[0.75rem] text-cardBody font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full justify-between ">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins">Designation</div>
                                    <div class="text-[0.75rem] text-cardBody font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36  max-sm:flex-row w-full justify-between">
                                  <div class="text-[0.875rem] text-cardBody font-poppins">Department</div>
                                  <div class="text-[0.75rem] text-cardBody font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins"># Opportunity</div>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                    <div class="text-[0.875rem] text-cardBody font-poppins">Portal Acess</div>

                                    <div class="text-[0.75rem] text-cardBody font-poppins">

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-20  max-sm:flex-row w-full justify-between">
                       
                       <div class="text-[0.875rem] text-cardBody font-poppins">Owner</div>

                   
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
                                <div class="flex flex-col md:w-[3%] max-sm:flex-row w-full justify-between items-center">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
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
                    <div class="flex flex-col md:w-[2%] max-sm:flex-row w-full justify-between items-center">
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
           
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  props.setEditContact(item);
                  handleUpdateContactModal(true);
                  handleSetCurrentContactId(item);
                  
                }}
              />
            </Tooltip>
      
            </div>
                      </div>    
                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>
      </InfiniteScroll>

      <UpdateContactModal
        contactData={currentContactId}
        // fullName={currentContactId}
        updateContactModal={updateContactModal}
        handleUpdateContactModal={handleUpdateContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
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
  recruiterName: opportunity.recruiterName,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
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
      handleContactEmailDrawerModal,
      emptyContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCardList);
