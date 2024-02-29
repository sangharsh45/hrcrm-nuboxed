import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
class DealReportDetails extends Component {
  render() {
    const {
        dealDetailsbyID: { investor }
    } = this.props;

    return (
      <>
        <DealItemRow label="Investor"
         value={investor} 
        />
      </>
    );
  }
}
export default DealReportDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[92%] justify-between flex-no-wrap m-2 h-2">
    <div class=" text-[#444] font-semibold" >{label}</div>
    <div className="overflow-hidden truncate ml-8">{value}</div>
  </div>
  );
};
