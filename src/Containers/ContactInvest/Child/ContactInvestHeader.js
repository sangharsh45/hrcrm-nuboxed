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
      currentData,
      handleButtonClick,
      visibility,
      handleSecondFilterChange,
      currentSecondData,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ContactInvestActionLeft
            //   currentData={this.props.currentData}
            //   handleChange={this.props.handleChange}
            //   text={this.props.text}
            //   handleClear={this.props.handleClear}
            //   setCurrentData={this.props.setCurrentData}
            handleFilterChange={this.props.handleFilterChange}
            filter={this.props.filter}
              viewType={viewType}
              setContactsViewType={setContactsViewType}
            //   currentPartnerData={this.props.currentPartnerData}
            //   handlePartnerClear={this.props.handlePartnerClear}
            //   setCurrentPartnerData={this.props.setCurrentPartnerData}
            //   // selectedChoice={this.props.selectedChoice}
            //   // handleChoiceChange={this.props.handleChoiceChange}
            //   selectedCountry={this.props.selectedCountry}
            //   handleCountryChange={this.props.handleCountryChange}
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
