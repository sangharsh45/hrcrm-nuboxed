import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setInvoiceViewType,handleInvoiceModal} from "../Invoice/InvoiceAction"
import AddInvoiceModal from "./InvoiceHeader/AddInvoiceModal";
import InvoiceHeader from "./InvoiceHeader/InvoiceHeader";
import InvoiceTable from "./InvoiceHeader/InvoiceTable";


class Invoice extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
 
  render() {
    const {
      setInvoiceViewType,
      addInvoiceModal,
      handleInvoiceModal,
    viewType,
    } = this.props;
    return (
      <React.Fragment>
         <InvoiceHeader        
         setInvoiceViewType={setInvoiceViewType}
          viewType={viewType}
          handleInvoiceModal={handleInvoiceModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
       
        <AddInvoiceModal
        addInvoiceModal={addInvoiceModal}
        handleInvoiceModal={handleInvoiceModal}
        />
      <InvoiceTable/>
    
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ invoice }) => ({
  viewType: invoice.viewType,
   addInvoiceModal:invoice.addInvoiceModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInvoiceViewType,
      handleInvoiceModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
