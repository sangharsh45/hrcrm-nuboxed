import React, { Suspense } from "react";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip } from "antd";
import {
  handleConfigureModal,
  handleCategoryImageModal,
  handleUploadProductModal
} from "../ProductAction";
// import ConfigureModal from "./ConfigureModal";
// import CategoryImageModal from "./CategoryImageModal";
// import UploadProduct from "./UploadProduct";
import {FileExcelOutlined} from  "@ant-design/icons";
class ProductActionRight extends React.Component {
  render() {
    const {
      handleConfigureModal,
      organizationId,
      addConfigureModal,
      handleCategoryImageModal,
      addCategoryImageModal,
      user,
      handleUploadProductModal,
      uploadProductList
    } = this.props;
    console.log(organizationId);
    return (
      <>
        
            <FlexContainer alignItems="center">
              <Tooltip title="CategoryImage">
                <span onClick={() => handleCategoryImageModal(true)}>
                  <i class="fas fa-chevron-circle-down"></i>
                </span>
              </Tooltip>
              &nbsp; &nbsp;
              <Button
                type="primary"
                ghost
                onClick={() => this.props.history.push("/import/product")}
              >
                Import
              </Button>
              &nbsp;

              <Tooltip title="Export Product">
                <Button
                  className="export"
                  default
                  href={`${base_url}/export/product?orgId=${organizationId}`}
                ><FileExcelOutlined />
                </Button>
              </Tooltip>
              &nbsp;

              &nbsp;
              <Tooltip placement="left" title="Create">
                <Button
                  type="primary"
                  onClick={() => handleConfigureModal(true)}
                >Add
     
                </Button>
              </Tooltip>
              <Tooltip placement="left" title="Create">
                <Button
                  type="primary"
                  ghost
                  onClick={() => handleUploadProductModal(true)}
                >
                  Upload
                </Button>
              </Tooltip>
            </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ product, auth, }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductActionRight)
);
