import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PartnerBankDetails from "./PartnerBankDetails";
import PartnerBankDetailsEdit from "./PartnerBankDetailsEdit";

class PartnerDetailSViewCard extends Component {
  render() {
    const { partner } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PartnerBankDetails
                partner={partner}
                toggleViewType={toggleViewType}
              />
            ) : (
              <PartnerBankDetailsEdit
                toggleViewType={toggleViewType}
                partner={partner}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PartnerDetailSViewCard;
