import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
  handleOpportunityModal,
  getOpportunityListByUserId,
  setOpportunityViewType,
} from "./OpportunityAction";
import OpportunityBoard from "./Child/OpportunityBoard"
import OpportunityWonCard from "./Child/OpportunityTable/OpportunityWonCard";
import OpportunityMobileWonCard from "./Child/OpportunityTable/OpportunityMobileWonCard";
import OpportunityLostMobileCard from "./Child/OpportunityTable/OpportunityLostMobileCard";
import OpportunityAllMobileCardList from "./Child/OpportunityTable/OpportunityAllMobileCardList";
const OpportunityCardView = lazy(() => import("./OpportunityCardView"));
const OpportunityMap = lazy(() => import("./OpportunityMap"));
const OpportunityHeader = lazy(() => import("./Child/OpportunityHeader"));
const AddOpportunityModal = lazy(() => import("./Child/AddOpportunityModal"));
const OpportunityCardList = lazy(() => import("./Child/OpportunityTable/OpportunityCardList"));
const OpportunityCloseCard=lazy(()=>import("./Child/OpportunityTable/OpportunityCloseCard"));
const OpportunityLostCard=lazy(()=>import("./Child/OpportunityTable/OpportunityLostCard"));
const OpportunityDeletedCard=lazy(()=>import("./Child/OpportunityTable/OpportunityDeletedCard"));
const OpportunityAllCardList = lazy(() => import("./Child/OpportunityTable/OpportunityAllCardList"));

class Opportunity extends Component {
  state = { currentData: "",isMobile: false };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getOpportunityListByUserId(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
    // Check if isMobile is stored in localStorage
    const storedIsMobile = localStorage.getItem('isMobile');
    this.setState({ isMobile: storedIsMobile ? JSON.parse(storedIsMobile) : window.innerWidth <= 768 });
  
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({ isMobile });
  
    // Store isMobile in localStorage
    localStorage.setItem('isMobile', JSON.stringify(isMobile));
  };
  render() {
    const {isMobile } = this.state;
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
          {      this.props.viewType === "stage" ?
             <OpportunityBoard/>:
          this.props.viewType === "table" ?
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
             (isMobile ?  <OpportunityLostMobileCard/> :   <OpportunityLostCard/> )
                    // <OpportunitylostTable/>
                    :
                    this.props.viewType === "Map" ?
                    <OpportunityMap/> :
             this.props.viewType === "card" ?
             <OpportunityCardView/> :
             this.props.viewType === "won" ?
             (isMobile ? <OpportunityMobileWonCard /> :  <OpportunityWonCard/> )
             // <OpportunitylostTable/>
            : this.props.viewType==="all" ? 
            (isMobile ?  <OpportunityAllMobileCardList/> :   <OpportunityAllCardList/> )
             : null}
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
