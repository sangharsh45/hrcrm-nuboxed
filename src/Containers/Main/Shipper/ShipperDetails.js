import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getShipperByShipperId } from "./ShipperAction";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../Components/Placeholder";
import ShipperDetailsHeader from "./ShipperDetailsHeader";
import ShipperDetailsRight from "./ShipperDetails/ShipperDetailsTab/ShipperDetailsRight";
import ShipperDetailsLeft from "./ShipperDetails/ShipperDetailsLeft";

class ShipperDetails extends Component {
  componentDidMount() {
   this.props.getShipperByShipperId(this.props.match.params.shipperId);
  }
  render() {
    const { shipper, fetchingShipperDetailsByShipperId } = this.props;
    return (
      <>
        <>
          <ShipperDetailsHeader />
          {fetchingShipperDetailsByShipperId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "22%" }}>
                    <ShipperDetailsLeft shipper={shipper} />
                  </div>
                  <div style={{ width: "78%" }}>
                    <ShipperDetailsRight shipper={shipper} />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ shipper }) => ({
  fetchingShipperDetailsByShipperId: shipper.fetchingShipperDetailsByShipperId,
  shipper: shipper.shipperDetailsByShipperId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getShipperByShipperId,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShipperDetails)
);
