import React, { Component } from "react";
import { Link } from "../../../../Components/Common";

class ContactDetailView extends Component {
  render() {
    console.log("contactId", this.props.contactId);
    return (
      <>
        <Link
          toUrl={`contact/${this.props.contactId}`}
          title={`${this.props.contactName}`}
        />
      </>
    );
  }
}
export default ContactDetailView;
