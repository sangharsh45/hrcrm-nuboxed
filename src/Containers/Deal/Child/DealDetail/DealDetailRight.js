import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const DealReportCard = lazy(() => import("./Dealcards/DealReportCard"));
const DealAboutViewCard = lazy(() => import("./Dealcards/DealAboutViewCard"));
const DealAboutCard = lazy(() => import("./Dealcards/DealAboutCard"));

class DealDetailRight extends Component {
  render() {
    const {
        dealDetailsbyID,
    } = this.props;
    return (
      <>
      <div style={{display:"flex"}}>
        <div class=" w-[30%]" >
            <DealAboutViewCard
          dealDetailsbyID={dealDetailsbyID}
        />
        </div>
        <div class=" w-[20%]" >
          <DealAboutCard
          dealDetailsbyID={dealDetailsbyID}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        />
        </div>
        <div class=" w-[26%]" >
         <DealReportCard
          dealDetailsbyID={dealDetailsbyID}
        />
        </div>
        </div>
        
        
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  // department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.user && auth.userDetails.partnerLogin,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailRight);
