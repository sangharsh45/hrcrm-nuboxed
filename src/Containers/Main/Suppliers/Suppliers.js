import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliersViewType } from "./SuppliersAction";
import SuppliersHeader from "../../Main/Suppliers/SuppliersHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { getSuppliersList, getAllSuppliersList } from "./SuppliersAction";
const SuppliersCardList =lazy(()=>import("./Child/SuppliersCardList"));
class Suppliers extends Component {
  state = { currentData: "" };

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
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
            <SuppliersCardList />
          ) 
          : null}
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
