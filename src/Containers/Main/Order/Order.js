import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOrderViewType } from "./OrderAction";
import OrderHeader from "./OrderHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import AllOrderList from "./AllOrderList";

// const AllOrderTab = lazy(() => import("./AllOrderTab/AllOrderTab"));
// const AllListTab = lazy(() => import("./AllOrderTab/AllListTab"));
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      activeKey1: "1",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };

  handleTabChange1 = (key) => this.setState({ activeKey1: key });
  render() {
    const { setOrderViewType, viewType } = this.props;
    const { activeKey, activeKey1 } = this.state;
    return (
      <React.Fragment>
        <OrderHeader
          setOrderViewType={setOrderViewType}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
        />
        {this.props.viewType === "all" &&
          <Suspense fallback={<BundleLoader />}>
            <AllOrderList />
          </Suspense>
        }
        {/* <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "dashboard" ? (
            <AllOrderTab
              handleTabChange={this.handleTabChange}
              activeKey={activeKey}
            />
          ) : this.props.viewType === "grid" ? (
            <AllListTab
              handleTabChange1={this.handleTabChange1}
              activeKey1={activeKey1}
            />
          ) : null}
        </Suspense> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  viewType: order.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setOrderViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Order);
