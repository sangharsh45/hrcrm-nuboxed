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

const AddShipperModal =lazy(()=>import("./AddShipperModal"));
const AllShipperList =lazy(()=>import("./AllShipperList"));
const ShipperDeleteTable =lazy(()=>import("./ShipperDeleteTable"));
const ShipperDashboard =lazy(()=>import("./ShipperDashboard"));
const ShipperCardList =lazy(()=>import("./ShipperCardList"));


class Shipper extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
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
   addShipperModal,
      handleShipperModal,
      setShipperViewType,
      viewType,
    } = this.props;
    return (
      <>
        <ShipperHeader
          viewType={viewType}
          setShipperViewType={setShipperViewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handleShipperModal={handleShipperModal}
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
