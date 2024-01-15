import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrganizationOverviewCard from "./OrganizationCards/OrganizationOverviewCard";
import OrganizationAboutCard from "./OrganizationCards/OrganizationAboutCard";
import OrganizationStatsCard from "./OrganizationCards/OrganizationStatsCard";
import OrganizationDetailMap from "./OrganizationCards/OrganizationDetailMap";
import OrganizationAddress from "./OrganizationCards/OrganizationAddress";

class OrganizationDetailLeft extends Component {
  render() {
    const { organizationDetails } = this.props;
    console.log(organizationDetails);
    return (
      <div class=" flex flex-col block">
        <OrganizationOverviewCard
         organizationList={this.props.organizationList} 
         organization={organizationDetails} />
        {/* <OrganizationTopicOfIntrest organizationDetails={organizationDetails} /> */}
        <OrganizationAboutCard
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
        <OrganizationStatsCard 
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
        <OrganizationAddress
           organizationList={this.props.organizationList} 
         organization={organizationDetails} />
        {/* <OrgannizationTermsCard organizationDetails={organizationDetails} /> */}
        <OrganizationDetailMap 
           organizationList={this.props.organizationList} 
        organization={organizationDetails} />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  organizationDetails: auth.organizationDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailLeft);
