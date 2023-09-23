import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setCourseViewType,
  handleCourseModal
} from "../../Containers/Course/CourseAction"
import AddCourseModal from "./Child/AddCourseModal";
import CourseHeader from "./Child/CourseHeader";
import CourseTable from "./CourseTable/CourseTable";


class Course extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
        setCourseViewType,
        addCourseModal,
      handleCourseModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <CourseHeader
         
         setCourseViewType={setCourseViewType}
          viewType={viewType}
          handleCourseModal={handleCourseModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddCourseModal
        addCourseModal={addCourseModal}
        handleCourseModal={handleCourseModal}
        />
      <CourseTable/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ course }) => ({
    viewType: course.viewType,
    addCourseModal:course.addCourseModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCourseModal,
        setCourseViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Course);
