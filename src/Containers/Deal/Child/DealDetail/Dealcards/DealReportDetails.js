import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
class DealReportDetails extends Component {
  render() {
    const {
        dealDetailsbyID: { customer }
    } = this.props;

    return (
      <>
        <DealItemRow label="Customer"
         value={customer} 
        />
      </>
    );
  }
}
export default DealReportDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-no-wrap"
      // style={{ margin: "5px" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px" ,overflow:"hidden",textOverflow:"ellipsis"}}>{value}</SubTitle>
    </div>
  );
};
