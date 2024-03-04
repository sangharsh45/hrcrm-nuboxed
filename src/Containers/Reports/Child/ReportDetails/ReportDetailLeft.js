import React, { Component,lazy} from "react";
import ReportDocumentsCard from "./ReportDocumentsCard";
import ReportTimeCard from "./ReportTimeCard";
const ReportDetailCard =lazy(()=> import("./ReportDetailCard"));
class ReportDetailLeft extends Component {
  render() {
    const { customer } = this.props;
    return (
      <>
        <div class=" flex flex-col">
        
          {/* <CustomerExtraDetailCard customer={customer} />          */}
          <ReportDetailCard   handleIconClick={this.props.handleIconClick}
            activeIcon={this.props.activeIcon}
            dropdownData={this.props.dropdownData}
               handleDropChange={this.props.handleDropChange} />
          <ReportTimeCard customer={customer} />
          <ReportDocumentsCard customer={customer} />
        </div>
      </>
    );
  }
}
export default ReportDetailLeft;
