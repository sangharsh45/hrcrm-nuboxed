import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class SupplierDetailView extends Component {
  render() {
    const {
        supplier: { phoneNo, emailId, shipByName },
      toggleViewType,
    } = this.props;

    return (
      <>
        <ShipperItemRow 
         label={
          <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
        }
        value={phoneNo} />
        <ShipperItemRow 
     label={
      <FormattedMessage id="app.email" defaultMessage="Email" />
    }
        value={emailId} />
        <ShipperItemRow 
        label={
          <FormattedMessage id="app.shipBy" defaultMessage="Ship By" />
        }
        value={shipByName} />
      </>
    );
  }
}
export default SupplierDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class="flex items-center flex-nowrap m-1 text-sm">
      <div class="text-[#444] font-semibold w-[40%]">
        {label}
      </div>
      <div
      class=" whitespace-nowrap overflow-hidden text-ellipsis w-[61%]">
        {value}
      </div>
    </div>
  );
};
