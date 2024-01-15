import React, { useEffect } from "react";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { Button, Input, Badge,Tooltip } from "antd";
import { bindActionCreators } from "redux";
import { TableOutlined } from "@ant-design/icons";
import { getOrderCount,getAllOrderCount } from "../Order/OrderAction";
import { FlexContainer } from "../../../Components/UI/Layout";

const { Search } = Input;
const Option = StyledSelect.Option;

const OrderActionLeft = ({ viewType,getOrderCount,allOrderCount,getAllOrderCount,orderCount, setOrderViewType, userId,user }) => {
 useEffect(() => {
    if (viewType === "list") {
      getOrderCount(userId);
    } else if (viewType === "all") {
      getAllOrderCount();
    }
  }, [viewType, userId]);

  return (
    <FlexContainer alignItems="center">
      <Tooltip title="List View">
      <Badge
        size="small"
        count={(viewType === "list" && orderCount.order) || 0}
        
        overflowCount={999}
      >
        <TableOutlined
          onClick={() => setOrderViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: viewType === "list" && "#1890ff",
            fontSize: "1em",
            cursor: "pointer",
          }}
        />
          </Badge>
      </Tooltip>

      <Tooltip title="ALL">
      <Badge
        size="small"
        count={(viewType === "all" && allOrderCount.order) || 0}
        
        overflowCount={999}
      >
        <span
          style={{
            marginRight: "0.5rem",
            color: viewType === "all" && "#1890ff",
            fontSize: "1em",
            cursor: "pointer",
          }}
          onClick={() => setOrderViewType("all")}
        >
          All
        </span>
        </Badge>
      </Tooltip>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth,order }) => ({
  user: auth.userDetails,
  orderCount:order.orderCount,
  allOrderCount:order.allOrderCount,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrderCount,
  getAllOrderCount
}, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(OrderActionLeft);
