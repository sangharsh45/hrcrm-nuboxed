import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import { setBillingViewType } from "../Billing/BillingAction"
import BillingJumpStartBox from "./BillingJumpStart/BillingJumpStartBox";
import BillingListTable from "./BillingTable/BillingListTable";
import BillingTable from "./BillingTable/BillingTable";
import BillingHeader from "./Child/BillingHeader";




class Billing extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    // this.props.getEmployeelist();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
      setBillingViewType,
      addEmployeeModal,
      handleEmployeeModal,
      departmentType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <BillingHeader

          setBillingViewType={setBillingViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
         <BillingJumpStartBox/>
        <Suspense fallback={<BundleLoader />}>
          {/* {

            this.props.viewType === "table" ?
              <BillingTable
              //    handleResponseData={this.handleResponseData}
              //    responseData={this.state.responseData}
              //    currentUser={this.state.currentUser}
              /> : viewType === "list" ? */}
          <BillingListTable
            departmentType={departmentType}
            currentUser={this.state.currentUser}
          />
          {/* : null */}

          {/* } */}

        </Suspense>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ billings }) => ({
  viewType: billings.viewType,
  departmentType: billings.departmentType,
      billingByDesignation: billings.billingByDesignation,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBillingViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Billing);
