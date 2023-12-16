import React, { useEffect } from "react";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppstoreOutlined, DeleteOutlined, BookOutlined, AlipayOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { GlobalOutlined, TableOutlined } from "@ant-design/icons";

const Option = StyledSelect.Option;

const ProductActionLeft = (props) => {

  useEffect(() => {
    // props.getRecords(props.userId);
  }, [props.userId]);
  const {
    viewType,
    setProductViewType,
    dateRangeList,
    setSelectedTimeIntervalCatalogue,
    user,
    userId,
    product,
  } = props;
  const creationDate = user.creationDate;
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
          <i class="fas fa-qrcode"></i>
        </span>
      </Tooltip>

      <Tooltip
        title="All Products"
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
