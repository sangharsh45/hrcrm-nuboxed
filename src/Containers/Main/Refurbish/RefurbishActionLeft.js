import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { AppstoreOutlined } from "@ant-design/icons";

const TabPane = StyledTabs.TabPane;

class RefurbishActionLeft extends Component {
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
    const { activeKey } = this.state;

    const { setProductionViewType, viewType, user } = this.props
    return (
      <>
        <FlexContainer alignItems="center">

          {/* {user.designation === "Executive" && */}


          <Tooltip title="Order">
            <span
              style={{
                marginRight: "0.5rem",
                color: viewType === "list" && "red",
              }}
              // iconType="book"
              // tooltipTitle="All"
              onClick={() => setProductionViewType("list")}
            ><AppstoreOutlined/></span>
          </Tooltip>
          {user.designation === "Manager" &&
            <Tooltip title="All">
              <AppstoreOutlined
                style={{
                  marginRight: "0.3rem",
                  color: viewType === "all" && "#1890ff",
                }}
                // iconType="appstore-o"
                // tooltipTitle="Supplies Library"
                onClick={() => setProductionViewType("all")}
              />
            </Tooltip>}

        </FlexContainer>
       
      </>
    );
  }
}
const mapStateToProps = ({ auth, production }) => ({
  shiftsData: production.shiftsData,
  shiftId: production.shiftsData.shiftId,
  userId: auth.userDetails.userId,
  user: auth.userDetails
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
