import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const TaskActionRight = lazy(() => import("./TaskActionRight"));
const TaskActionLeft = lazy(() => import("./TaskActionLeft"));
class TaskHeader extends Component {
  render() {
    const { viewType, setTaskViewType } = this.props;
    return (
      <div style={{position: "sticky",
      top: "3.35rem",
      zIndex: "998"}}>
        <ActionHeader
          leftComponent={<TaskActionLeft 
            viewType={viewType}
            setTaskViewType={setTaskViewType}
          />}
          rightComponent={<TaskActionRight 
            viewType={viewType}
          />}
        />
      </div>
    );
  }
}

export default TaskHeader;
