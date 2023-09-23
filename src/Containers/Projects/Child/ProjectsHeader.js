import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProjectsActionRight from "./ProjectsActionRight";
class ProjectsHeader extends Component {
  render() {
    const { handleProjectsModal, viewType, setCourseViewType } = this.props;
    return (
      <>
       <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
          <ActionHeader
            rightComponent={
              <ProjectsActionRight
                viewType={viewType}
                handleProjectsModal={handleProjectsModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default ProjectsHeader;
