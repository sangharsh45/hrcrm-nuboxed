import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProjectOverView from "./ProjectOverView";



class ProjectOverViewCard extends Component {
  render() {
    console.log("tim",this.props.projectsById)
    const { projectsById } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ProjectOverView projectsById={projectsById} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ProjectOverViewCard;
