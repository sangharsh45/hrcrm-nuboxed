import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ActionNotification from "../Dashboard/ActionNotification";
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
// import {getTodosCount} from "./DashboardAction";
import DashboardTodo from "./Child/DashboardTodo";
import UpcomingEvents from "./Child/UpcomingEvents";
import { Badge } from "antd";
import Task from "../Settings/Task/Task";
import TaskNew from "./TaskNew";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class TaskDashboardTab extends Component {
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

  componentDidMount() {
    // const { getTodosCount, userId, startDate, endDate } = this.props;
    // getTodosCount(userId, startDate, endDate);
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
        <TabsWrapper1>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                 
               <span class=" ml-1">Tasks</span>
              

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
                <TaskNew />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <EventAvailableIcon style={{fontSize:"1.1rem"}}/>

                  <span class=" ml-1">Events</span>

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
                {/* <ActionNotification /> */}
              </Suspense>
            </TabPane>
     
          
          </StyledTabs>
        </TabsWrapper1>
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth,customer}) => ({
  todosCount:dashboard.todosCount,
  userId: auth.userDetails.userId,
  endDate: dashboard.endDate,
  startDate: dashboard.startDate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    // getTodosCount
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskDashboardTab);
