import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import CatalogueHeader from "./Child/CatalogueHeader";
// import SuspendProductList from "./Child/ProductTable/SuspendProductList";
// import { handleConfigureModal, setProductViewType } from "./ProductAction";
// import ProductListingTable from "./Child/ProductTable/ProductListingTable";
// import ProductListByGroup from "./Child/ProductTable/ProductListByGroup"
// const ProductGroup = lazy(() => import("./Child/ProductGroup/ProductGroup"));
// const ProductTable = lazy(() => import("./Child/ProductTable/ProductTable"));


class Catalogue extends Component {
  render() {
    const {
    //   user,
    //   addConfigureModal,
    //   handleConfigureModal,
    //   viewType,
    //   setProductViewType,
    //   product,
    //   functionName,
    } = this.props;
    return (
      <React.Fragment>
        <CatalogueHeader
        //   setProductViewType={setProductViewType}
        //   viewType={viewType}
        //   handleConfigureModal={handleConfigureModal}
        />


        {/* <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "all" ?
            (<ProductListingTable />) :
            this.props.viewType === "dashboard" ? (
              <SuspendProductList />) :
              this.props.viewType === "table" ? (
                <ProductListByGroup />) :
                null}

        </Suspense> */}
        <h1>Hiii Caty</h1>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ product, auth, user }) => ({
//   viewType: product.viewType,
//   addConfigureModal: product.addConfigureModal,
//   fetchingproducts: product.fetchingproducts,
//   subscriptionType: auth.userDetails.subscriptionType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   handleConfigureModal,
    //   setProductViewType,
      // handleProductModal,
      // handleProductDrawer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
