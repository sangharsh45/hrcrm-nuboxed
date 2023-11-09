import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProductActionLeft from "./ProductActionLeft";
// import ProductActionRight from "./ProductActionRight";

class ProductHeader extends Component {
  render() {
    const { viewType, setProductViewType, handleConfigureModal } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ProductActionLeft
              viewType={viewType}
              setProductViewType={setProductViewType}
            />
          }
          rightComponent={"Right"
        //   <ProductActionRight />
        }
        />
      </div>
    );
  }
}

export default ProductHeader;
