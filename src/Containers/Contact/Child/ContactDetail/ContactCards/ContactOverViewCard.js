import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const ContactOverView=lazy(()=> import("./ContactOverView"));


class ContactOverviewCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <ContactOverView contact={contact} /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactOverviewCard;
