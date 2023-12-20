import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper } from "../../Components/UI/Layout";
import { getOrganizationDetails } from "../Auth/AuthAction";

const OrganizationDetailLeft = lazy(() =>
  import("./Child/OrganizationDetailLeft")
);
const OrganizationDetailRight = lazy(() =>
  import("./Child/OrganizationDetailRight")
);

class Organization extends Component {
  componentDidMount() {
    const { getOrganizationDetails } = this.props;
    getOrganizationDetails();
  }
  render() {
    const { fetchingOrganizationDetails,organizationDetails } = this.props;
    console.log(this.props.organizationDetails.imageId)
    return (
    
      <>
        {/* <AccountDetailHeader /> */}
        {fetchingOrganizationDetails ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <div class=" flex ">
              <Suspense fallback={"Loading..."}>
              <div class="flex flex-no-wrap w-full">
                  <div class=" w-[25%]" >
                    <OrganizationDetailLeft />
                  </div>
                  <div class=" w-[75%]" >
                    <OrganizationDetailRight />
                  </div>
                </div>
              </Suspense>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  fetchingOrganizationDetails: auth.fetchingOrganizationDetails,
  fetchingOrganizationDetailsError: auth.fetchingOrganizationDetailsError,
  organizationDetails:auth.organizationDetails
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrganizationDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
