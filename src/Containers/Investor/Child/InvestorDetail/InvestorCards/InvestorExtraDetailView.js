import React, {  } from "react";
import { FormattedMessage } from "react-intl";

function InvestorExtraDetailView (props) {
    const {
        investorDetails: {
        url,
        phoneNumber,
        vatNo,
        countryDialCode,
        sector,
        source,
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
         <InvestorItemRow //label="Phone Number"
          label={<FormattedMessage id="app.source" defaultMessage="Source" />}
          value={source}
        />
      </>
    );
  
}
export default InvestorExtraDetailView;

const InvestorItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
       <div class=" #1c1b1b font-semibold" >{label}</div>
       <div className="overflow-hidden truncate ml-8">
       {value}
      </div>
    </div>
  );
};
