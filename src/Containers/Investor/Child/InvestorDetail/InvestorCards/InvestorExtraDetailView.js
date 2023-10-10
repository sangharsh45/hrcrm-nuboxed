import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

function InvestorExtraDetailView (props) {
    const {
        investorDetails: {
        url,
        phoneNumber,
        vatNo,
        countryDialCode,
        sector,
        businessRegistration,
        address,
      },
    } = props;

    return (
      <>
        <InvestorItemRow // label="URL"
          label={<FormattedMessage id="app.url" defaultMessage="URL" />}
          value={url}
        />
        <InvestorItemRow
          label="Phone #"
          value={`${countryDialCode || ""} ${phoneNumber || ""}`}
        />

        <InvestorItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Registration #"
            />
          }
          value={vatNo}
        />

        <InvestorItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Tax Registration #"
            />
          }
          value={businessRegistration}
        />

        <InvestorItemRow //label="Phone Number"
          label={<FormattedMessage id="app.sector" defaultMessage="Sector" />}
          value={sector}
        />
      </>
    );
  
}
export default InvestorExtraDetailView;

const InvestorItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-nowrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle>{value}</SubTitle>
    </div>
  );
};
