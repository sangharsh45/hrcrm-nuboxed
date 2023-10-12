import React, { Component } from "react";
import ContactInvestOverViewCard from "./ContactInvestCards/ContactInvestOverViewCard";
import ContactInvestDetailCard from "./ContactInvestCards/ContactInvestDetailCard";

class ContactInvestDetailsLeft extends Component {
  render() {
    const { contactInVestDetail } = this.props;
    return (
      <>
        <div  class=" flex flex-col">  
 <ContactInvestOverViewCard contactInVestDetail={contactInVestDetail} /> 
           <ContactInvestDetailCard contactInVestDetail={contactInVestDetail}  />
        </div>
      </>
    );
  }
}
export default ContactInvestDetailsLeft;
