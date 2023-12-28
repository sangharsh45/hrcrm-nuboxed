import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const PitchDetailTab =lazy(()=>import("../PitchDetails/PitchDetailTab"));


class PitchDetailRight extends Component {
  render() {
    // console.log(this.props.lead);
    return (
      <div class=" w-full">
        <PitchDetailTab 
        pitch={this.props.pitch} 
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
)(PitchDetailRight);
