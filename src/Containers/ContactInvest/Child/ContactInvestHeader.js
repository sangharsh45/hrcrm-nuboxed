import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ContactInvestActionLeft = lazy(()=>import("./ContactInvestActionLeft"));
const ContactInvestActionRight = lazy(() =>import("./ContactInvestActionRight"));

class ContactInvestHeader extends Component {
  render() {
    const {
      addContactInvestModal,
      handleContactInvestModal,
      viewType,
      setContactsViewType,
      handleChange,
      currentData,
      handleClear,
      handleClean,
      handleCurrentData,
      currentUser
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ContactInvestActionLeft
         
            handleFilterChange={this.props.handleFilterChange}
            filter={this.props.filter}
              viewType={viewType}
              setContactsViewType={setContactsViewType}
              currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}
     
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}
           
            />
          }
          rightComponent={
            <ContactInvestActionRight 
            addContactInvestModal={addContactInvestModal}
            handleContactInvestModal={handleContactInvestModal}
            // viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            // currentPartnerUser={this.props.currentPartnerUser}
            // handlePartnerDropChange={this.props.handlePartnerDropChange}
            />
          }
        />
      </div>
    );
  }
}

export default ContactInvestHeader;
