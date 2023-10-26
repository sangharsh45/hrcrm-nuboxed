import React from "react";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
// import { inputDataSearch } from "../SuppliersAction";
import { connect } from "react-redux";
import { Button, Input, Tooltip } from "antd";

const { Search } = Input;

const Option = StyledSelect.Option;

class OrderActionLeft extends React.Component {
  render() {
    const { viewType, setOrderViewType, user } = this.props;

    return (


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
