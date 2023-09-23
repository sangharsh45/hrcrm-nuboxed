import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import ActionNotification from "../Dashboard/ActionNotification";
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import DashboardTodo from "./Child/DashboardTodo";
import UpcomingEvents from "./Child/UpcomingEvents";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class TodoDashboardTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">ToDo</span>

                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashboardTodo style={{ overflow: "scroll" }} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <TipsAndUpdatesIcon style={{fontSize:"1.1rem"}}/>

                  <span class=" ml-1">Actions</span>

                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ActionNotification />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <UpcomingIcon style={{fontSize:"1.1rem"}}/>

                  <span class=" ml-1">UpComing Events</span>

                  {activeKey === "3" && (
                    <>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <UpcomingEvents />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                 
               
                 <FontAwesomeIcon icon={solid('bullseye')} />
                    <span style={{ marginLeft: "0.25em" }}>Pareto</span>
                  
                  {activeKey === "3" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Example/>
         
              </Suspense>
            </TabPane> */}

            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
 
}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboardTab);
