import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';

class InventoryDetailActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      value: 1,
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  render() {

    const { setInventoryDetailViewType, inventoryViewType } = this.props
    return (
      <>
        <FlexContainer alignItems="center">
          <Tooltip title="Repair">
            <span
              style={{
                marginRight: "0.5rem",
                color: inventoryViewType === "repair" && "red",
                cursor: "pointer"
              }}
              // iconType="book"
              // tooltipTitle="All"
              onClick={() => setInventoryDetailViewType("repair")}
            >
              Repair
            </span>
          </Tooltip>
          {/* {user.designation === "Manager" && */}
          <Tooltip title="Material">
            <span
              style={{
                color: inventoryViewType === "material" && "#1890ff",
              }}
              onClick={() => setInventoryDetailViewType("material")}
            >
              Material
            </span>

          </Tooltip>
          {/* } */}
          <Tooltip title="Production">
            <span
              style={{
                color: inventoryViewType === "production" && "#1890ff",
              }}
              onClick={() => setInventoryDetailViewType("production")}
            >
              Production
            </span>
          </Tooltip>

        </FlexContainer>

      </>
    );
  }
}
const mapStateToProps = ({ auth, production }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetailActionLeft);