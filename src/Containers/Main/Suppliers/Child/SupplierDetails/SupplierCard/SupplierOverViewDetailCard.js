import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import SupplierOverDetailView from "./SupplierOverDetailView";

class SupplierOverViewDetailCard extends Component {
  render() {
    const { supplier } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <SupplierOverDetailView
              supplier={supplier}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SupplierOverViewDetailCard;
