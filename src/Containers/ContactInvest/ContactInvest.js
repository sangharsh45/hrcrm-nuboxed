import React, { useState,useEffect,Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import {handleContactInvestModal,setContactInvetViewType,getContactInvestByUserId} from "./ContactInvestAction";

const ContactInvestHeader = lazy(() => import("./Child/ContactInvestHeader"));
const AddContactInvestModal = lazy(() => import("./Child/AddContactInvestModal"));
const ContactInvestCardList = lazy(() => import("./Child/ContactInvestTable/ContactInvestCardList"));

function ContactInvest (props) {
    const [currentData, setCurrentData] = useState(undefined);
    const [text, setText] = useState(undefined);
    const [currentUser, setCurrentUser] = useState("");
    const [currentPartnerUser, setCurrentPartnerUser] = useState("");
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(props.contactiNVESTbyId);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
  
    if (country === '') {
      setFilteredData(props.contactiNVESTbyId);
    } else {
      const filteredJobs = props.contactiNVESTbyId.filter((job) => job.department ===country );
      setFilteredData(filteredJobs);
    }
};
const handleRoleChange = (event) => {
  const role = event.target.value;
  setSelectedRole(role);
  const filteredJobs = props.contactiNVESTbyId.filter((job) => {
    const roleMatch = role === '' || job.designation === role;
    return roleMatch;
  });

  setFilteredData(filteredJobs);
};
useEffect(()=>{
props.getContactInvestByUserId(props.userId,0)
},[])

const filterData = filteredData.filter(item =>
  Object.values(item).some(value =>
    typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase())
  )
);
  const handleClear = () => {
    setCurrentData(undefined);
    props.emptyContact();
    props.getContactInvestByUserId(currentUser ? currentUser : props.userId, 0);
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
 
    const filteredJobs = props.contactiNVESTbyId.sort((a, b) => {
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
  }, [props.contactiNVESTbyId, filterText]);

const{handleContactInvestModal,addContactInvestModal,
    setContactInvetViewType,viewType
}=props;
        return (
            <React.Fragment>
                <ContactInvestHeader
                viewType={viewType}
                setContactInvetViewType={setContactInvetViewType}
                addContactInvestModal={addContactInvestModal}
                handleContactInvestModal={handleContactInvestModal}
                handlePartnerDropChange={handlePartnerDropChange}
                handleDropChange={handleDropChange}
                currentUser={currentUser}
                currentPartnerUser={currentPartnerUser}
                text={text}
                handleChange={handleChange}
                handleClear={handleClear}
                currentData={currentData}
                setCurrentData={setCurrentData}
              />
             <AddContactInvestModal
        addContactInvestModal={addContactInvestModal}
        handleContactInvestModal={handleContactInvestModal}
      />
       <Suspense fallback={<BundleLoader />}>
        {viewType === "card" ? <ContactInvestCardList currentUser={currentUser}  filterData={filterData}/> : null}
      </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ contactinvest }) => ({
    addContactInvestModal:contactinvest.addContactInvestModal,
    viewType:contactinvest.viewType,
    contactiNVESTbyId: contactinvest.contactiNVESTbyId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleContactInvestModal,
    setContactInvetViewType,
    getContactInvestByUserId
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvest);