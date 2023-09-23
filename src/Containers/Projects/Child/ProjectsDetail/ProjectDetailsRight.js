import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProjectDetailsTab from "../ProjectDetailsTab/ProjectDetailsTab";


class ProjectDetailsRight extends Component {
  render() {
    console.log(this.props.projectsById);
    return (
      <div class=" w-full">
        <ProjectDetailsTab 
        projectsById={this.props.projectsById} 
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
)(ProjectDetailsRight);
