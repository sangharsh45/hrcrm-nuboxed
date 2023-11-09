import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PlantAddressView from "./PlantAddressView";

class PlantAddressViewCard extends Component {
  render() {
    const { plant } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PlantAddressView plant={plant} toggleViewType={toggleViewType} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PlantAddressViewCard;
