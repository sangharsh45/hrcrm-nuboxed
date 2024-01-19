import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ProfileDetailTab = lazy(() => import("./ProfileTabs/ProfileDetailTab"));
class ProfileDetailRight extends Component {
  render() {
    return (
      <div class=" flex flex-col display-block" >
        <ProfileDetailTab userDetails={this.props.userDetails} />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailRight);
