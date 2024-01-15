import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { SubTitle } from "../../../../../Components/UI/Elements";

class DealRecruiterDetails extends Component {
  render() {
    console.log(this.props.dealDetailsbyID);
    const {
      dealDetailsbyID: { recruiterDetails,assignedTo },
} = this.props;
  
   
    return (
      <>
        <DealItemRow     label={<FormattedMessage
                id="app.assignedto"
                defaultMessage="Assigned To"
              />}
        value={assignedTo} 
        />
         
      </>
    );
  }
}
export default DealRecruiterDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-no-wrap"
      // style={{ margin: "5px" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ textAlign: "end" }}>{value}</SubTitle>
    </div>
  );
};
