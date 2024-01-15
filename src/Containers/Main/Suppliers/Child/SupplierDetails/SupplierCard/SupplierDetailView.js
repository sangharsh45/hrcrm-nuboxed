import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

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
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem", fontSize: "13px" }}
    >
      <div
        style={{
          color: "#444",
          fontWeight: 600,
          width: "40%",
        }}
      >
        {label}
      </div>
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "61%",
        }}
      >
        {value}
      </div>
    </FlexContainer>
  );
};
