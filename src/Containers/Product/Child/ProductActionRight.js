import React from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip } from "antd";
import {
  handleUploadProductModal
} from "../ProductAction";
import { FileExcelOutlined } from "@ant-design/icons";
import UploadCatalogue from "./UploadCatalogue";
class ProductActionRight extends React.Component {
  render() {
    const {
      handleConfigureModal,
      organizationId,
    } = this.props;
    return (
      <>

        <FlexContainer alignItems="center">

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
              onClick={() => this.props.handleUploadProductModal(true)}
            >
              Upload
            </Button>
          </Tooltip>
        </FlexContainer>
        <UploadCatalogue
          handleUploadProductModal={this.props.handleUploadProductModal}
          uploadProductList={this.props.uploadProductList}
        />
      </>
    );
  }
}

const mapStateToProps = ({ product, auth, }) => ({
  uploadProductList: product.uploadProductList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUploadProductModal
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductActionRight)
);
