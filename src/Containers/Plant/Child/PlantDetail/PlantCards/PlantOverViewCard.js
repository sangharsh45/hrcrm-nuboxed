import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PlantOverView from "./PlantOverView";

class PlantOverViewCard extends Component {
  render() {
    const { plant } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <PlantOverView plant={plant} /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PlantOverViewCard;
