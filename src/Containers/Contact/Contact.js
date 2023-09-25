import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
  handleContactModal,
  setContactsViewType,
  getPArtnerContactPagination,
  emptyContact,
  getContactListByUserId,
  getContactPartnerListByUserId,
  getContactPagination,
} from "./ContactAction";

const AddContactModal = lazy(() => import("./Child/AddContactModal"));
const ContactHeader = lazy(() => import("./Child/ContactHeader"));
const ContactTable = lazy(() => import("./Child/ContactTable/ContactTable"));
const PartnerTable = lazy(() => import("./Child/PartnerTable/PartnerTable"));
const ContactCardList = lazy(() => import("./Child/ContactTable/ContactCardList"));

function Contact(props) {
  const [currentData, setCurrentData] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPartnerUser, setCurrentPartnerUser] = useState("");
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filterText, setFilterText] = useState('');
const [filteredData, setFilteredData] = useState(props.contactByUserId);

const handleCountryChange = (event) => {
  const country = event.target.value;
  setSelectedCountry(country);

  if (country === '') {
    setFilteredData(props.contactByUserId);
  } else {
    const filteredJobs = props.contactByUserId.filter((job) => job.department ===country );
    setFilteredData(filteredJobs);
  }
  // const filteredJobs = props.contactByUserId.filter((job) => {
  //   const countryMatch = country === '' || job.department === country;
  //   return countryMatch;
  // });

  // setFilteredData(filteredJobs);
};
const handleRoleChange = (event) => {
  const role = event.target.value;
  setSelectedRole(role);

  const filteredJobs = props.contactByUserId.filter((job) => {
    // console.log(job.address.length && job.address[0].country);
    const roleMatch = role === '' || job.designation === role;
    return roleMatch;
  });

  setFilteredData(filteredJobs);
};
useEffect(()=>{
props.getContactListByUserId(props.userId,0)
},[])

const filterData = filteredData.filter(item =>
  Object.values(item).some(value =>
    typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase())
  )
);
  const handleClear = () => {
    setCurrentData(undefined);
    props.emptyContact();
    props.getContactListByUserId(currentUser ? currentUser : props.userId, 0);
  };

  // const handlePartnerClear = () => {
  //   setCurrentPartnerData("");
  //   props.getContactPartnerListByUserId(
  //     currentPartnerUser ? currentPartnerUser : props.userId,
  //     0
  //   );
  // };

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
        // handlePartnerClear={handlePartnerClear}
        // currentPartnerData={currentPartnerData}
        // setCurrentPartnerData={setCurrentPartnerData}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />

      <AddContactModal
        addContactModal={addContactModal}
        handleContactModal={handleContactModal}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ? <ContactCardList currentUser={currentUser}  filterData={filterData}/> : null}
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
      getContactPartnerListByUserId,
      getContactPagination,
      emptyContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contact);