import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CourseDetailsTab from "../CourseTab/CourseDetailsTab";


class CourseDetailsRight extends Component {
  render() {
    console.log(this.props.course);
    return (
      <div class=" w-full">
        <CourseDetailsTab 
        course={this.props.course} 
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
)(CourseDetailsRight);
