import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PlantDetailView from "./PlantDetailView";

class PlantDetailCard extends Component {
  render() {
    const { plant } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PlantDetailView plant={plant} toggleViewType={toggleViewType} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PlantDetailCard;
