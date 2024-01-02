import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper } from "../../Components/UI/Layout";
import { getOrganizationDetails,setOrganizationViewType ,handleOrganizationModal} from "../Auth/AuthAction";
import AddOrganizationModal from "./Child/OrganizationHeader/AddOrganizationModal";
import OrganizationHeader from "./OrganizationHeader";

const OrganizationDetailLeft = lazy(() =>
  import("./Child/OrganizationDetailLeft")
);
const OrganizationDetailRight = lazy(() =>
  import("./Child/OrganizationDetailRight")
);

class Organization extends Component {
  componentDidMount() {
    const { getOrganizationDetails ,} = this.props;
    getOrganizationDetails();
  }
  render() {
    const { fetchingOrganizationDetails,addOrganizationModal,organizationDetails,handleOrganizationModal } = this.props;
    console.log(this.props.organizationDetails.imageId)
    return (
    
      <>
        <OrganizationHeader 
        //  currentUser={this.state.currentUser}
         viewType={this.props.viewType}
         handleOrganizationModal={handleOrganizationModal}
        setOrganizationViewType={this.props.setOrganizationViewType}
        />
          <AddOrganizationModal
          addOrganizationModal={addOrganizationModal}
          handleOrganizationModal={handleOrganizationModal}
        />
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
  addOrganizationModal:auth.addOrganizationModal,
  fetchingOrganizationDetails: auth.fetchingOrganizationDetails,
  fetchingOrganizationDetailsError: auth.fetchingOrganizationDetailsError,
  organizationDetails:auth.organizationDetails
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrganizationDetails,
      handleOrganizationModal,
      setOrganizationViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
