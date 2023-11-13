import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

const CallForm = lazy(() =>
  import("../../../Call/Child/CallForm")
);
const EventForm = lazy(() =>
  import("../../../Event/Child/EventForm")
);
const TaskForm = lazy(() =>
  import("../../../Task/Child/TaskForm")
);

const TabPane = StyledTabs.TabPane;

const AddCustomerActivityModal = (props) => {
  const { callActivityModal, handleCallActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule Call"
        />}
        width={drawerWidth}
        visible={callActivityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleCallActivityModal(false)}
        style={{marginTop:"5rem"}}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <LeadsActivityTab/>

        </Suspense>
      </StyledDrawer>
    </>
  );
  function LeadsActivityTab (props) {
    const { addCallTaskModal, handleLeadCallModal } = props;
      const { ...formProps } = props;
      console.log(props.rowdata)
      return (
        <>
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey="1"
              style={{ overflow: "visible", width: "53vw", padding: "15px" }}
              animated={false}
            >
              <TabPane
                tab={
                  <span>
                   <i class="fas fa-phone-square"></i>&nbsp;
                    Calls
                  </span>
                }
                key="1"
              >
                <Suspense fallback={"loading ..."}>
                  <CallForm {...formProps} />
                </Suspense>
              </TabPane>
          
              <TabPane
                tab={
                  <span>
                    <i class="fas fa-tasks"></i>&nbsp;
                    Events
                  </span>
                }
                key="2"
              >
                <Suspense fallback={"loading ..."}>
                  <EventForm {...formProps}/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i class="far fa-calendar-check"></i>&nbsp;
                    Tasks
                  </span>
                }
                key="3"
              >
                <Suspense fallback={"loading ..."}>
                  <TaskForm {...formProps}/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          {/* <AddCallTaskModal
          rowdata={props.rowdata}
            addCallTaskModal={addCallTaskModal}
            handleLeadCallModal={handleLeadCallModal}
          /> */}
        </>
      );
  }
};

export default AddCustomerActivityModal;
