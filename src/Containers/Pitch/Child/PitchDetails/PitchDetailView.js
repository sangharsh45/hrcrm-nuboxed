import React, { Component } from "react";
import { SubTitle } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
class PitchDetailView extends Component {
  render() {
    // console.log(this.props.customer);
    const {
      pitch: { url, phoneNumber, vatNo, businessRegistration, address },
    } = this.props;

    return (
      <>
        <PitchItemRow // label="URL"
          label={<FormattedMessage id="app.url" defaultMessage="URL" />}
          value={url}
        />
        <PitchItemRow //label="Phone Number"
          label={
            <FormattedMessage id="app.phoneNumber" defaultMessage="Phone #" />
          }
          value={phoneNumber}
        />

        <PitchItemRow
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Registration #"
            />
          }
          value={vatNo}
        />

        <PitchItemRow
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Tax Registration #"
            />
          }
          value={businessRegistration}
        />
      </>
    );
  }
}
export default PitchDetailView;

const PitchItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-1"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{}}>{value}</SubTitle>
    </div>
  );
};
