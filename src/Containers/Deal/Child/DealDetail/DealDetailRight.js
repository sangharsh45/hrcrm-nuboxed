import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DealReportCard from "./Dealcards/DealReportCard.js";
import DealAboutViewCard from "./Dealcards/DealAboutViewCard";
import DealAboutCard from "./Dealcards/DealAboutCard";

class DealDetailRight extends Component {
  render() {
    const {
        dealDetailsbyID,
    } = this.props;
    return (
      <>
      <div style={{display:"flex"}}>
        <div style={{ width: "30%" }}>
            <DealAboutViewCard
          dealDetailsbyID={dealDetailsbyID}
        />
        </div>
        <div style={{ width: "20%" ,}}>
          <DealAboutCard
          dealDetailsbyID={dealDetailsbyID}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        />
        </div>
         <div style={{width: "26%"}}>
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
