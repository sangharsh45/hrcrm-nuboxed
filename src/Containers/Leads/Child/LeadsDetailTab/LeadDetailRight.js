import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadDetailTab from "../LeadsTab/LeadDetailTab";


class LeadDetailRight extends Component {
  render() {
    console.log(this.props.lead);
    return (
      <div class=" w-full">
        <LeadDetailTab 
        lead={this.props.lead} 
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadDetailRight);
