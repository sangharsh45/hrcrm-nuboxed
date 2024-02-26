import React, { Component ,lazy} from "react";
const ContactOverViewCard=lazy(()=> import("./ContactCards/ContactOverViewCard"));
const ContactDetailCard=lazy(()=> import("./ContactCards/ContactDetailCard"));


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
