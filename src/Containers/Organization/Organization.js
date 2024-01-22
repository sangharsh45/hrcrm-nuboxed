import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper } from "../../Components/UI/Layout";
import { getOrganizationDetails,setOrganizationViewType ,handleOrganizationModal} from "../Auth/AuthAction";
const AddOrganizationModal = lazy(() =>
  import("./Child/OrganizationHeader/AddOrganizationModal")
);
const OrganizationHeader = lazy(() =>
  import("./OrganizationHeader")
);

const OrganizationDetailLeft = lazy(() =>
  import("./Child/OrganizationDetailLeft")
);
const OrganizationDetailRight = lazy(() =>
  import("./Child/OrganizationDetailRight")
);

class Organization extends Component {
  constructor(props) {
    super(props)

    this.state = {
        key: "",
        organizationList: {}
    }
}
  componentDidMount() {
    const { getOrganizationDetails ,} = this.props;
    getOrganizationDetails();
  }
  handleOnClick = (data) => {
    console.log(data);
    debugger;
    this.setState({
      organizationList: data,
    });

};
  render() {
    console.log(this.state.organizationList)
    const { fetchingOrganizationDetails,addOrganizationModal,organizationDetails,handleOrganizationModal } = this.props;
    console.log(this.props.organizationDetails.imageId)
    return (
    
      <>
        <OrganizationHeader 
        handleOnClick={this.handleOnClick}
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
              {this.state.organizationList.organizationId && (
                  <div class=" w-[25%]" >
                    <OrganizationDetailLeft
                    organizationList={this.state.organizationList} 
                    />
                  </div>
                     )}
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
