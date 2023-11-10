import React from "react";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Input, Tooltip } from "antd";
import {
  TableOutlined,
} from "@ant-design/icons";
import { FlexContainer } from "../../../Components/UI/Layout";
const { Search } = Input;

const Option = StyledSelect.Option;

class OrderActionLeft extends React.Component {
  render() {
    const { viewType, setOrderViewType, user } = this.props;

    return (
<FlexContainer alignItems="center">
<Tooltip title="List View">
          <TableOutlined
            onClick={() => setOrderViewType("list")}
            style={{
              marginRight: "0.5rem",
              color: viewType === "list" && "#1890ff",
              fontSize: "1em",
              cursor: "pointer",
            }}

          />
        </Tooltip>

     
      <Tooltip title="ALL">
        <span
          style={{
            marginRight: "0.5rem",
            color: viewType === "all" && "#1890ff",
            fontSize: "1em",
            cursor: "pointer",
          }}
          onClick={() => setOrderViewType("all")}
        >All</span>
      </Tooltip>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({
  auth
}) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // inputDataSearch,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderActionLeft);
