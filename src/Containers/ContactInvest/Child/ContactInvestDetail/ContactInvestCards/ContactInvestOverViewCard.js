
import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ContactInvestOverView from "./ContactInvestOverView";

class ContactInvestOverViewCard extends Component {
  render() {
    const { contactInVestDetail } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <ContactInvestOverView contactInVestDetail={contactInVestDetail} /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactInvestOverViewCard;
