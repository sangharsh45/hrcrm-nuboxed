import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProductionActionRight from "./ProductionActionRight";
import ProductionActionLeft from "./ProductionActionLeft";
class ProductionHeader extends Component {
  render() {
    const {
        viewType,
      openProductiondrawer,
      handleCreateProduction
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
        <ProductionActionLeft   viewType={viewType}/>
          }
          rightComponent={
            <ProductionActionRight
            openProductiondrawer={openProductiondrawer}
            handleCreateProduction={handleCreateProduction}
            />
          }
        />
      </div>
    );
  }
}

export default ProductionHeader;
