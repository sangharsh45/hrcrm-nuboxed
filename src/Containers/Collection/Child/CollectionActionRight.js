import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
class CollectionActionRight extends React.Component {
  render() {
    const { } = this.props;
    return <></>;
  }
}
const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectionActionRight)
);
