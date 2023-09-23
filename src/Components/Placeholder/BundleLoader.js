import React from "react";
import { CodeSkeleton } from "../UI/Elements";
import { GroupSkeleton } from "../UI/Elements";

export default props => {
  if (props.type === "Chart") {
    return <CodeSkeleton {...props} />;
  } else {
    return <GroupSkeleton {...props} />;
  }
};
