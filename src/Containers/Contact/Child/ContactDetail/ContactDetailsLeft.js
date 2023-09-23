import React, { Component } from "react";
import ContactOverViewCard from "./ContactCards/ContactOverViewCard";
import ContactDetailCard from "./ContactCards/ContactDetailCard";

class ContactDetailsLeft extends Component {
  render() {
    const { contact } = this.props;
    return (
      <>
        <div  class=" flex flex-col">
          <ContactOverViewCard contact={contact} />
          <ContactDetailCard contact={contact} />
        </div>
      </>
    );
  }
}
export default ContactDetailsLeft;
