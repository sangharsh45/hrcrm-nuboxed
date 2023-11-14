import React, { Component, Suspense, lazy } from "react";
import ShipperHeader from "./ShipperHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  handleShipperModal,
  setShipperViewType,
  getShipperByUserId,
  getAllShipperList,
} from "./ShipperAction";
import AddShipperModal from "./AddShipperModal";
import AllShipperList from "./AllShipperList";
import ShipperDeleteTable from "./ShipperDeleteTable";
import ShipperDashboard from "./ShipperDashboard";
const ShipperCardList =lazy(()=>import("./ShipperCardList"));


class Shipper extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    //this.props.getShipperByUserId(this.props.userId);
    if (this.props.viewType === "table") {
      this.props.getShipperByUserId(this.props.userId);
    } else if (this.props.viewType === "all") {
      this.props.getAllShipperList();
    }
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
      shipper,
      addShipperModal,
      handleShipperModal,
      setShipperViewType,
      viewType,
      shipperDashboardType,
    } = this.props;
    return (
      <>
        <ShipperHeader
          viewType={viewType}
          setShipperViewType={setShipperViewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddShipperModal
          handleShipperModal={handleShipperModal}
          addShipperModal={addShipperModal}
        />
        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ? (
            <ShipperCardList />
          ) : this.props.viewType === "all" ? (
            <AllShipperList />
          ) : this.props.viewType === "grid" ? (
            <ShipperDeleteTable />
          ) : this.props.viewType === "dashboard" ? (
            <ShipperDashboard />
          ) : null}
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  viewType: shipper.viewType,
  addShipperModal: shipper.addShipperModal,
  userId: auth.userDetails.userId,
  //shipperDashboardType: shipper.shipperDashboardType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setShipperViewType,
      getShipperByUserId,
      handleShipperModal,
      getAllShipperList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);
