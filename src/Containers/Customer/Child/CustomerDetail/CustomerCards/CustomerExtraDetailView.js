import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
class CustomerExtraDetailView extends Component {
  render() {
    console.log(this.props.customer);
    const {
      customer: {
        url,
        phoneNumber,
        vatNo,
        countryDialCode,
        sector,
        businessRegistration,
        address,
      },
    } = this.props;

    return (
      <>
        <CustomerItemRow // label="URL"
          label={<FormattedMessage id="app.url" defaultMessage="URL" />}
          value={url}
        />
        <CustomerItemRow
          label="Phone #"
          value={`${countryDialCode || ""} ${phoneNumber || ""}`}
        />

        <CustomerItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Registration #"
            />
          }
          value={vatNo}
        />

        <CustomerItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Tax Registration #"
            />
          }
          value={businessRegistration}
        />

        <CustomerItemRow //label="Phone Number"
          label={<FormattedMessage id="app.sector" defaultMessage="Sector" />}
          value={sector}
        />
      </>
    );
  }
}
export default CustomerExtraDetailView;

const CustomerItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       
       {/* {elipsize(value, 27)} */}
       {value}
    
   </div>
    </div>
  );
};
