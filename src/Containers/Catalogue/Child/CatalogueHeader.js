import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import CatalogueActionLeft from "./CatalogueActionLeft";
// import CatalogueActionRight from "./CatalogueActionRight";

class CatalogueHeader extends Component {
  render() {
    const { viewType, setProductViewType, handleConfigureModal } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={"Left"
            // <CatalogueActionLeft
            // //   viewType={viewType}
            // //   setProductViewType={setProductViewType}
            // />
          }
          rightComponent={"Right"
        //   <CatalogueActionRight />
        }
        />
      </div>
    );
  }
}

export default CatalogueHeader;
