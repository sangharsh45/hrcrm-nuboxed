import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SupplierDetailsHeader from "../SupplierDetails/SupplierDetailsHeader"
import SupplierDetailsLeft from "./SupplierDetailsLeft";
import SupplierDetailsRight from "./SupplierDetailTab/SupplierDetailsRight";

class SupplierDetails extends Component {
  componentDidMount() {
   this.props.getSupplierBySupplierId(this.props.match.params.supplierId);
  }
  render() {
    const { supplier, fetchingSupplierDetailsBySupplierId } = this.props;
    return (
      <>
        <>
          <SupplierDetailsHeader />
          {fetchingSupplierDetailsBySupplierId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "22%" }}>
                    <SupplierDetailsLeft supplier={supplier} />
                  </div>
                  <div style={{ width: "78%" }}>
                    <SupplierDetailsRight supplier={supplier} />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
        </>SupplierDetailsRight
      </>
    );
  }
}
const mapStateToProps = ({ suppliers }) => ({
    fetchingSupplierDetailsBySupplierId: suppliers.fetchingSupplierDetailsBySupplierId,
  supplier: suppliers.supplierDetailById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getSupplierBySupplierId,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SupplierDetails)
);
