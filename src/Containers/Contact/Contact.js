import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import ContactTeamCardList from "./Child/ContactTable/ContactTeamCardList";
import {
  handleContactModal,
  setContactsViewType,
  getPArtnerContactPagination,
  emptyContact,
  getContactListByUserId,
  getContactPartnerListByUserId,
  getContactPagination,
  getFilterContactList
} from "./ContactAction";
import ContactMobileCardList from "./Child/ContactTable/ContactMobileCardList";
import ContactMobileTeamCardList from "./Child/ContactTable/ContactMobileTeamCardList";
const AddContactModal = lazy(() => import("./Child/AddContactModal"));
const ContactHeader = lazy(() => import("./Child/ContactHeader"));
const ContactCardList = lazy(() => import("./Child/ContactTable/ContactCardList"));
const ContactAllCardList = lazy(() => import("./Child/ContactTable/ContactAllCardList"));

function Contact(props) {
  const [currentData, setCurrentData] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPartnerUser, setCurrentPartnerUser] = useState("");
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filter, setFilter] = useState("creationdate");
const [filteredData, setFilteredData] = useState(props.contactByUserId);
const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

const handleCountryChange = (event) => {
  const country = event.target.value;
  setSelectedCountry(country);
  if (country === '') {
    setFilteredData(props.contactByUserId);
  } else {
    const filteredJobs = props.contactByUserId.filter((job) => job.departmentId ===country );
    setFilteredData(filteredJobs);
  }
};
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


const filterData = filteredData.filter(item =>
  Object.values(item).some(value =>
    typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase())
  )
);
  const handleClear = () => {
    setCurrentData(undefined);
    props.emptyContact();
    props.getContactListByUserId(currentUser ? currentUser : props.userId, 0,filter?filter:"creationdate");
  };

  const handleFilterChange = (data) => {
    setFilter(data);
    props.getFilterContactList(props.userId, 0, data);
  };

  const handlePartnerDropChange = (value) => {
    setCurrentPartnerUser(value);
    props.getPArtnerContactPagination(value, 0);
    console.log("valid", value);
  };

  const handleDropChange = (value) => {
    setCurrentUser(value);
    props.getContactPagination(value, 0);
    console.log("valid", value);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value);
  };

  useEffect(() => {
 
    const filteredJobs = props.contactByUserId.sort((a, b) => {
      const indA = a.pingInd;
      const indB = b.pingInd;
      if (indA < indB) {
        return 1;
      }
      if (indA > indB) {
        return -1;
      }
  
      // ind must be equal
      return 0;
    });
    setFilteredData(filteredJobs);
  }, [props.contactByUserId, filterText]);

  const {
    addContactModal,
    handleContactModal,
    setContactsViewType,
    viewType,
  } = props;

  return (
    <React.Fragment>
      <ContactHeader
        handleContactModal={handleContactModal}
        handlePartnerDropChange={handlePartnerDropChange}
        handleDropChange={handleDropChange}
        currentUser={currentUser}
        currentPartnerUser={currentPartnerUser}
        setContactsViewType={setContactsViewType}
        viewType={viewType}
        text={text}
        handleChange={handleChange}
        handleClear={handleClear}
        currentData={currentData}
        setCurrentData={setCurrentData}
        handleFilterChange={handleFilterChange}
        filter={filter}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />

      <AddContactModal
        addContactModal={addContactModal}
        handleContactModal={handleContactModal}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ?(
        isMobile ? ( 
           <ContactMobileCardList
           currentUser={currentUser} 
        filter={filter}
         filterData={filterData} />
        ) : (
        <ContactCardList
           
        currentUser={currentUser} 
        filter={filter}
         filterData={filterData}
         />)) :
         props.viewType ==="all" ? <ContactAllCardList/>
         :viewType==="teams" ?(
          isMobile ? ( 
             <ContactMobileTeamCardList
             currentUser={currentUser} 
          filter={filter}
           filterData={filterData} />
          ) : ( <ContactTeamCardList/>))

        : null}
      </Suspense>
    </React.Fragment>
  );
}

const mapStateToProps = ({ contact, account, auth }) => ({
  userId: auth.userDetails.userId,
  addContactModal: contact.addContactModal,
  viewType: contact.viewType,
  contactByUserId: contact.contactByUserId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleContactModal,
      getPArtnerContactPagination,
      setContactsViewType,
      getContactListByUserId,
      getFilterContactList,
      getContactPartnerListByUserId,
      getContactPagination,
      emptyContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contact);