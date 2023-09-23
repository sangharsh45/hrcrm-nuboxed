import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import { handleContactModal, setContactsViewType, getPArtnerContactPagination,emptyContact,getContactListByUserId, getContactPartnerListByUserId,getContactPagination } from "./ContactAction";
const AddContactModal = lazy(() => import("./Child/AddContactModal"));
const ContactHeader = lazy(() => import("./Child/ContactHeader"));
const ContactTable = lazy(() => import("./Child/ContactTable/ContactTable"));
const PartnerTable =lazy(()=>import("./Child/PartnerTable/PartnerTable"));
const ContactCardList =lazy(()=>import("./Child/ContactTable/ContactCardList"));

class Contact extends Component {
  state = { currentData: undefined,text:undefined ,currentUser:"",currentPartnerUser:""};
  handleClear = () => {
    this.setState({ currentData: undefined });
    this.props.emptyContact()
    this.props.getContactListByUserId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  state = { currentPartnerData: "" };
  handlePartnerClear = () => {
    this.setState({ currentPartnerData: "" });
    this.props.getContactPartnerListByUserId(this.state.currentPartnerUser?this.state.currentPartnerUser:this.props.userId,0);
  };
  setCurrentPartnerData = (value) => {
    this.setState({ currentPartnerData: value });
  };

  handlePartnerDropChange=(value)=>{
    this.setState({ currentPartnerUser: value });
      this.props.getPArtnerContactPagination(value,0 );
    console.log("valid",value)
  };

  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
      this.props.getContactPagination(value,0 );
    console.log("valid",value)
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };

  render() {
    const {
      addContactModal,
      handleContactModal,
      setContactsViewType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <ContactHeader
          handleContactModal={handleContactModal}
          handlePartnerDropChange={this.handlePartnerDropChange}
          handleDropChange={this.handleDropChange}
          currentUser={this.state.currentUser}
          currentPartnerUser={this.state.currentPartnerUser}
          setContactsViewType={setContactsViewType}
          viewType={viewType}
          text={this.state.text}
          handleChange={this.handleChange}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handlePartnerClear={this.handlePartnerClear}
          currentPartnerData={this.state.currentPartnerData}
          setCurrentPartnerData={this.setCurrentPartnerData}
        />

        <AddContactModal
          addContactModal={addContactModal}
          handleContactModal={handleContactModal}
        />
        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ?  
          //  <ContactTable
          //  currentUser={this.state.currentUser} 
          //   />
          <ContactCardList currentUser={this.state.currentUser} />
         :
          //   this.props.viewType === "dashboard" ? (
             
          //      <PartnerTable
          //  currentPartnerUser={this.state.currentPartnerUser}
          //  /> 
          //   ) :
           null}

        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ contact, account, auth }) => ({
  userId: auth.userDetails.userId,
  addContactModal: contact.addContactModal,
  viewType: contact.viewType,
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
      emptyContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
