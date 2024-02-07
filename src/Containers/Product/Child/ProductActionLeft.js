import React, { useEffect } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined, AlipayOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ProductActionLeft = (props) => {
  useEffect(() => {
  }, [props.userId]);
  const {
    viewType,
    setProductViewType,
    user,
  } = props;
  return (
    <FlexContainer alignItems="center">
      <Tooltip title="Product List">

        <span
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "red",
          }}
          onClick={() => props.setProductViewType("table")}
        >
          <i class="fas fa-qrcode" className="!text-2xl cursor-pointer"></i>
        </span>
      </Tooltip>

      <Tooltip
        title="Category"
      >
        <AlipayOutlined
          onClick={() => setProductViewType("all")}
          style={{
            marginRight: "0.5rem",
            color: viewType === "all" && "#1890ff",
          }} />
      </Tooltip>

      <Tooltip title="Suspended Product">
        <DeleteOutlined
        className="!text-2xl cursor-pointer"
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "red",
          }}
          onClick={() => props.setProductViewType("dashboard")}
        />
      </Tooltip>
    </FlexContainer>
  );

}
const mapStateToProps = ({ product, auth }) => ({
  user: auth.userDetails,
  recordData: product.recordData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionLeft);
