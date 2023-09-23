import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProgramOverView from "./ProgramOverView";




class ProgramOverViewCard extends Component {
  render() {
    const { program } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ProgramOverView program={program} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ProgramOverViewCard;
