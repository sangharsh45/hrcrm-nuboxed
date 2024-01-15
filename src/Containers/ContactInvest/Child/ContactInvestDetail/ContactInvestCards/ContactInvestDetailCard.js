
import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ContactInvestDetailView from "./ContactInvestDetailView";

class ContactInvestDetailCard extends Component {
  render() {
    const { contactInVestDetail  } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactInvestDetailView
              contactInVestDetail={contactInVestDetail} 
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactInvestDetailCard;
