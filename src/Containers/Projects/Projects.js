import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setProjectsViewType,
    handleProjectsModal
} from "../Projects/ProjectsAction"
 import AddProjectsModal from "./Child/AddProjectsModal";
import ProjectsHeader from "./Child/ProjectsHeader";
import ProjectsTable from "./Child/ProjectsTable";
 


class Projects extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
        setProjectsViewType,
        addProjectsModal,
        handleProjectsModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <ProjectsHeader        
         setProjectsViewType={setProjectsViewType}
          viewType={viewType}
          handleProjectsModal={handleProjectsModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddProjectsModal
        addProjectsModal={addProjectsModal}
        handleProjectsModal={handleProjectsModal}
        />
      <ProjectsTable/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ projects }) => ({
    viewType: projects.viewType,
    addProjectsModal:projects.addProjectsModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleProjectsModal,
    setProjectsViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
