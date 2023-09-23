import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import InvoiceActionLeft from "./InvoiceActionLeft";
import InvoiceActionRight from "./InvoiceActionRight";
class InvoiceHeader extends Component {
  render() {
    const { handleInvoiceModal, viewType, setInvoiceViewType } = this.props;
    return (
      <>
        <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
          <ActionHeader
             leftComponent={
              <InvoiceActionLeft
                viewType={viewType}
                setInvoiceViewType={setInvoiceViewType}
                currentData={this.props.currentData}
                handleClear={this.props.handleClear}
                setCurrentData={this.props.setCurrentData}
              />
            }
            rightComponent={
              <InvoiceActionRight
                viewType={viewType}
                handleInvoiceModal={handleInvoiceModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default InvoiceHeader;
