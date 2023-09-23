import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import OpportunityDeletedTable from "./Child/OpportunityTable/OpportunityDeletedTable";
import OpportunitylostTable from "./Child/OpportunityTable/OpportunitylostTable";
import OpportunityCloseTable from "./Child/OpportunityTable/OpportunityCloseTable";
import {
  handleOpportunityModal,
  getOpportunityListByUserId,
  setOpportunityViewType,
} from "./OpportunityAction";

const OpportunityCardView = lazy(() => import("./OpportunityCardView"));
const OpportunityMap = lazy(() => import("./OpportunityMap"));
const OpportunityHeader = lazy(() => import("./Child/OpportunityHeader"));
const AddOpportunityModal = lazy(() => import("./Child/AddOpportunityModal"));
const OpportunityTable = lazy(() => import("./Child/OpportunityTable/OpportunityTable"));
const OpportunityCardList = lazy(() => import("./Child/OpportunityTable/OpportunityCardList"));
const OpportunityCloseCard=lazy(()=>import("./Child/OpportunityTable/OpportunityCloseCard"));
const OpportunityLostCard=lazy(()=>import("./Child/OpportunityTable/OpportunityLostCard"));
const OpportunityDeletedCard=lazy(()=>import("./Child/OpportunityTable/OpportunityDeletedCard"));

class Opportunity extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getOpportunityListByUserId(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    const {
      addOpportunityModal,
      handleOpportunityModal,
    } = this.props;
    return (
      <React.Fragment>
        <OpportunityHeader
          viewType={this.props.viewType}
          setOpportunityViewType={this.props.setOpportunityViewType}
          handleOpportunityModal={handleOpportunityModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddOpportunityModal
          addOpportunityModal={addOpportunityModal}
          handleOpportunityModal={handleOpportunityModal}
        />
        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ?
          // <OpportunityTable /> 
          <OpportunityCardList/>
          :
          this.props.viewType === "dashboard" ?
            //  <OpportunityDeletedTable/> 
            <OpportunityDeletedCard/>
             :
             this.props.viewType === "close" ?
                    // <OpportunityCloseTable/>
                    <OpportunityCloseCard/>
                     :
             this.props.viewType === "lost" ?
                    // <OpportunitylostTable/>
                   <OpportunityLostCard/>
                    :
                    this.props.viewType === "Map" ?
                    <OpportunityMap/> :
             this.props.viewType === "card" ?
             <OpportunityCardView/> :
            null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  addOpportunityModal: opportunity.addOpportunityModal,
  viewType: opportunity.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleOpportunityModal,
      getOpportunityListByUserId,
      setOpportunityViewType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
