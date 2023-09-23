import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import OpportunityAboutCard from "./OpportunityCards/OpportunityAboutCard";
import { FlexContainer } from "../../../../Components/UI/Layout";
import OpportunityCard from "./OpportunityCards/OpportunityCard";
import OpportunityAboutViewCard from "./OpportunityCards/OpportunityAboutViewCard";
import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard";
const OpportunityDetailTab = lazy(() =>
  import("./OpportunityTab/OpportunityDetailTab")
);

class OpportunityDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      account: {},
      isError: false,
    };
  }
 

  render() {
    const {
      user: {
        metaData: { productStatus },
      },
      opportunity,
    } = this.props;
    const { account } = this.state;
    console.log(opportunity);
    return (
      <FlexContainer flexDirection="" style={{ display: "block" }}>
        <div>
        <OpportunityCard
          opportunity={opportunity}
          account={account}
          updateAccount={this.updateAccount}
          setAccount={this.setAccount}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
        />
        </div>
        
        
          <div style={{ width: "89vw" }}>
         <OpportunityDetailTab
          />
          </div>
       </FlexContainer>
    );
  }
}
const mapStateToProps = ({ opportunity, account, auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailLeft);
