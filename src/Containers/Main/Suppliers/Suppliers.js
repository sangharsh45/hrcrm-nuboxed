import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliersViewType } from "./SuppliersAction";
import SuppliersHeader from "./Child/SuppliersHeader";
import AllSupplierTable from "./Child/AllSupplierTable";
import { BundleLoader } from "../../Components/Placeholder";
import { getSuppliersList, getAllSuppliersList } from "./SuppliersAction";
const SuppliersDashboard = lazy(() =>
  import("./Child/SuppliersDashboard/SuppliersDashboard")
);

const SuppliersTable = lazy(() => import("./Child/SuppliersTable"));

class Suppliers extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    if (this.props.viewType === "grid") {
      this.props.getSuppliersList(this.props.userId);
    } else if (this.props.viewType === "table") {
      this.props.getAllSuppliersList();
    }
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const { setSuppliersViewType, viewType, handleSuppliesModal } = this.props;
    return (
      <React.Fragment>
        <SuppliersHeader
          setSuppliersViewType={setSuppliersViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          // handleSuppliesModal={handleSuppliesModal}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "grid" ? (
            <SuppliersTable />
          ) : this.props.viewType === "all" ? (
            <AllSupplierTable />
          ) : this.props.viewType === "dashboard" ? (
            <SuppliersDashboard />
          ) : null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ suppliers, auth }) => ({
  viewType: suppliers.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSuppliersViewType,
      getSuppliersList,
      getAllSuppliersList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
